// Headless smoke test: data integrity, progress engine, tree renderer.
// Stubs the browser APIs the modules need outside the DOM.
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};

const data = await import('../js/data/index.js');
const storage = await import('../js/storage.js');
const progress = await import('../js/progress.js');
const tree = await import('../js/tree.js');

let failures = 0;
function check(cond, msg) {
  if (!cond) {
    failures++;
    console.error('  ✗', msg);
  } else {
    console.log('  ✓', msg);
  }
}

console.log('\n— Data integrity —');
check(data.foundation.length === 6, 'foundation has 6 modules');
check(data.tracks.length === 5, '5 persona tracks');
check(data.projects.length === 8, '8 projects (2 starter + 3 intermediate + 3 advanced)');
check(data.projects.filter((p) => p.tier === 'starter').length === 2, 'two starter projects');


const ids = new Set();
let lessonsTotal = 0;
for (const mod of [...data.foundation, ...data.tracks.flatMap((t) => t.modules)]) {
  check(!ids.has(mod.id), `module id unique: ${mod.id}`);
  ids.add(mod.id);
  check(mod.lessons.length >= 3, `${mod.id} has ≥3 lessons (${mod.lessons.length})`);
  check(mod.quiz && mod.quiz.questions.length >= 4, `${mod.id} quiz has ≥4 questions`);
  check(Boolean(mod.skill && mod.title && mod.tagline && mod.emoji), `${mod.id} has skill/title/tagline/emoji`);
  for (const l of mod.lessons) {
    lessonsTotal++;
    check(!ids.has(l.id), `lesson id unique: ${l.id}`);
    ids.add(l.id);
    check(l.content.length > 400, `${l.id} content is substantial`);
    check(Array.isArray(l.takeaways) && l.takeaways.length >= 2, `${l.id} has takeaways`);
  }
  for (const q of mod.quiz.questions) {
    check(q.answer >= 0 && q.answer < q.options.length, `${mod.id} quiz answer index valid`);
    check(Boolean(q.explain), `${mod.id} quiz has explanation`);
  }
}
console.log(`  (total lessons: ${lessonsTotal})`);
for (const p of data.projects) {
  check(p.steps.length >= 4 && p.selfCheck.length >= 4, `${p.id} has steps and self-checks`);
  check(['starter', 'intermediate', 'advanced'].includes(p.tier), `${p.id} has a valid tier (${p.tier})`);
  check(p.xp === { starter: 25, intermediate: 50, advanced: 75 }[p.tier], `${p.id} XP matches tier`);
  check(Boolean(p.needs), `${p.id} states what you need`);
  check(p.personas.every((x) => data.tracks.some((t) => t.id === x)), `${p.id} persona tags valid`);
}
for (const persona of data.personas) {
  const path = data.pathFor(persona.id);
  check(path.length === 8, `path for ${persona.id} = 8 modules`);
}

console.log('\n— Progress engine —');
storage.setProfile({ name: 'Test', persona: 'po', level: 'new' });
check(progress.treeStats().stage === 0, 'stage 0 at start');
let next = progress.nextStep();
check(next.type === 'lesson' && next.lesson.id === 'f1-l1', 'first step is f1-l1');

storage.completeLesson('f1-l1');
check(progress.treeStats().stage === 1, 'stage 1 after first lesson');
check(storage.getState().xp === 10, 'XP awarded for lesson');

// complete module f1
for (const l of data.foundation[0].lessons) storage.completeLesson(l.id);
storage.recordQuiz('f1', 100, true);
check(progress.treeStats().stage === 2, 'stage 2 after first module complete');
check(progress.treeStats().branches.length === 1, 'one branch grown');

// complete all foundation
for (const mod of data.foundation) {
  for (const l of mod.lessons) storage.completeLesson(l.id);
  storage.recordQuiz(mod.id, 90, true);
}
check(progress.overallStats().foundationComplete, 'foundation complete');
check(progress.treeStats().stage === 4, 'stage 4 when foundation done');

// complete track
const po = data.trackById('po');
for (const mod of po.modules) {
  for (const l of mod.lessons) storage.completeLesson(l.id);
  storage.recordQuiz(mod.id, 100, true);
}
check(progress.treeStats().stage === 6, 'stage 6 when track done');
check(progress.treeStats().branches.length === 8, '8 branches grown');

// projects → fruits, with status lifecycle and tiered XP
const p1 = data.projectById('p1');
check(progress.projectStatus('p1') === 'todo', 'project starts as todo');
storage.setProjectStep('p1', 0, true);
check(progress.projectStatus('p1') === 'doing', 'ticking a step → in progress');
storage.setProjectNotes('p1', 'left off at step 2');
check(progress.projectState('p1').notes === 'left off at step 2', 'notes persist');
const xpBeforeP1 = storage.getState().xp;
p1.selfCheck.forEach((_, i) => storage.setProjectCheck('p1', i, true, p1.selfCheck.length, p1.xp));
check(storage.getState().xp === xpBeforeP1 + p1.xp, `tiered XP awarded (+${p1.xp})`);
check(progress.projectStatus('p1') === 'done', 'all self-checks → done');
check(progress.treeStats().fruits === 1, 'one fruit after project');
const p2 = data.projectById('p3');
p2.selfCheck.forEach((_, i) => storage.setProjectCheck('p3', i, true, p2.selfCheck.length));
check(progress.treeStats().stage === 7, 'stage 7: flourishing banyan');
next = progress.nextStep();
check(next.type === 'project', 'next step now a remaining project');

console.log('\n— Career consult engine —');
const careers = await import('../js/data/careers.js');
const gemini = await import('../js/gemini.js');

check(careers.roleCatalog.length >= 8, `role catalog has ${careers.roleCatalog.length} roles`);
for (const r of careers.roleCatalog) {
  check(Boolean(r.title && r.tagline && r.demand && r.naturalFrom), `${r.id} catalog entry complete`);
  check(['po', 'dev', 'ba', 'qa', 'lead'].includes(r.track), `${r.id} maps to a valid track`);
  check(r.projects.every((p) => data.projectById(p)), `${r.id} maps to valid projects`);
}

// The RPA-developer-who-manages-people case from the field:
const rpaAnswers = {
  currentRole: 'RPA Developer & team resource manager',
  experience: '9-15',
  responsibilities: ['automation', 'people', 'delivery'],
  responsibilitiesOther: 'UiPath CoE work',
  techComfort: 'lowcode',
  enjoys: ['building', 'leading'],
  domain: 'insurance',
  direction: 'open',
};
const prompt = gemini.buildCareerPrompt(rpaAnswers);
check(prompt.includes('RPA Developer & team resource manager'), 'prompt binds current role');
check(prompt.includes('Building automations / integrations'), 'prompt binds responsibility labels');
check(prompt.includes('UiPath CoE work'), 'prompt binds free-text extras');
check(prompt.includes('insurance'), 'prompt binds domain');
check(prompt.includes('Agentic Automation Engineer'), 'prompt grounds on role catalog');
check(prompt.includes('fitScore'), 'prompt specifies output contract');

const est = careers.localCareerEstimate(rpaAnswers);
check(est.roles.length === 3, 'offline estimate returns 3 roles');
const estTitles = est.roles.map((r) => r.title);
check(estTitles.includes('Agentic Automation Engineer'), `RPA profile surfaces agentic automation (${estTitles.join(' | ')})`);
check(estTitles.includes('AI Delivery Lead / AI Program Manager'), 'RPA+people profile surfaces delivery lead');
check(gemini.validateCareerResult(est), 'offline estimate passes the same validation as Gemini output');
check(est.roles.every((r) => r.fitScore >= 0 && r.fitScore <= 100), 'fit scores in range');

check(!gemini.validateCareerResult({ summary: 'x', roles: [{}], honestNote: 'y' }), 'validator rejects malformed results');

console.log('\n— Dual progress styles —');
const dash = await import('../js/dashboard.js');
for (const style of ['tree', 'dashboard']) {
  const copy = progress.styleCopy(style);
  check(copy.stageNames.length === 8 && copy.stageMessages.length === 8, `${style} copy has 8 stages`);
  check(Boolean(copy.quizPassTitle && copy.projectToast && copy.navLabel), `${style} copy bundle complete`);
}
check(progress.xpLevel(600, 'tree').name === 'Branching Tree', 'tree level names');
check(progress.xpLevel(600, 'dashboard').name === 'Specialist', 'dashboard level names');
{
  const fake = { innerHTML: '' };
  dash.renderDashboardFull(fake);
  check(fake.innerHTML.includes('Skill matrix') && fake.innerHTML.includes('Capstone'), 'dashboard full view renders matrix + capstones');
  check(fake.innerHTML.includes('Certified'), 'dashboard shows certified skills (state is fully complete here)');
  const mini = { innerHTML: '' };
  dash.renderDashboardMini(mini);
  check(mini.innerHTML.includes('<svg'), 'dashboard mini ring renders');
}
{
  const careerSrc = await (await import('node:fs/promises')).readFile(new URL('../js/career.js', import.meta.url), 'utf8');
  check(!/gemini[-_ ]?2|GEMINI_MODEL/i.test(careerSrc.replace(/from '\.\/gemini\.js'/, '')), 'career UI does not name the model');
}

console.log('\n— Personas & readiness report —');
check(data.personas.length === 12, `12 personas defined (${data.personas.length})`);
for (const p of data.personas) {
  check(Boolean(p.lens && p.blurb && p.emoji), `${p.id} persona complete`);
  const track = data.trackForPersona(p.id);
  check(Boolean(track), `${p.id} maps to track ${track?.id}`);
  check(data.pathFor(p.id).length === 8, `${p.id} path = 8 modules`);
  const rec = data.projectsFor(p.id);
  check(rec.recommended.length >= 1, `${p.id} has recommended projects`);
}
{
  const report = await import('../js/report.js');
  const html = report.buildReportHtml();
  check(html.includes('AI Readiness Profile'), 'report renders title');
  check(html.includes('Certified skills') && html.includes('Capstone projects'), 'report has skills + capstones sections');
  check(html.includes('crafted by Vignesh Bhaskarraj'), 'report carries the signature');
}

console.log('\n— Engagement engine: streak shields & daily review —');
{
  // isolated streak simulation with controlled dates
  const dump = storage.exportState();
  storage.resetAll();
  storage.setProfile({ name: 'T', persona: 'dev', level: 'new' });
  const day = (n) => new Date(2026, 5, n, 12); // June n, 2026
  for (let d = 1; d <= 7; d++) storage.touchActivity(day(d));
  check(storage.getState().streak.count === 7, '7-day streak counted');
  check(storage.getState().streak.shields === 1, 'shield earned at 7 days');
  storage.touchActivity(day(9)); // miss June 8 → shield absorbs it
  check(storage.getState().streak.count === 8 && storage.getState().streak.shields === 0, 'shield absorbs a single missed day');
  storage.touchActivity(day(12)); // miss 2 days, no shield → reset
  check(storage.getState().streak.count === 1, 'streak resets after multi-day gap without shield');

  // daily review
  storage.recordQuiz('f1', 90, true);
  ['f1-l1','f1-l2','f1-l3','f1-l4'].forEach((l) => storage.completeLesson(l));
  check(progress.reviewPool().length === 5, 'review pool = passed module questions (5)');
  const sample = progress.sampleReview(3);
  check(sample.length === 3 && new Set(sample.map((s2) => s2.q.q)).size === 3, 'review samples 3 distinct questions');
  const xpBefore = storage.getState().xp;
  check(storage.recordReview(3, 2, day(12)) === true, 'review records');
  check(storage.getState().xp === xpBefore + 10, 'review XP = correct × 5');
  check(storage.recordReview(3, 3, day(12)) === false, 'second review same day rejected');
  check(storage.reviewDoneToday(day(12)), 'reviewDoneToday true');

  // goal gradient
  const ms = progress.nextMilestone('tree');
  check(Boolean(ms && ms.target && ms.detail), `milestone computed: "${ms.target}" — ${ms.detail}`);
  storage.resetAll();
  storage.importState(dump);
}

console.log('\n— Hybrid roles, intros, deck, speech —');
check(data.personas.length === 12, `12 personas incl. senior/governance (${data.personas.length})`);
check(Boolean(data.personaById('gov') && data.personaById('exec')), 'gov + exec personas exist');
check(data.trackForPersona('gov').id === 'lead' && data.trackForPersona('exec').id === 'lead', 'senior personas map to lead track');
check(data.pathFor('gov').length === 8 && data.pathFor('exec').length === 8, 'senior persona paths = 8 modules');
check(data.personaLabel('lead') === 'Delivery / Engagement Leader', 'personaLabel resolves id');
check(data.personaLabel(null, 'Data Protection Officer') === 'Data Protection Officer', 'personaLabel honours custom text');
{
  // second hat persists through profile
  const dump = storage.exportState();
  storage.setProfile({ name: 'Hybrid', persona: 'lead', persona2: 'gov', persona2Custom: '', level: 'aware' });
  check(storage.getState().profile.persona2 === 'gov', 'second hat (id) persists');
  storage.setProfile({ ...storage.getState().profile, persona2: null, persona2Custom: 'Data Protection Officer' });
  check(storage.getState().profile.persona2Custom === 'Data Protection Officer', 'second hat (custom) persists');
  // intro-seen tracking
  check(storage.introSeen('f1') === false, 'intro not seen initially');
  storage.markIntroSeen('f1');
  check(storage.introSeen('f1') === true, 'markIntroSeen records');
  storage.resetAll();
  storage.importState(dump);
}
{
  // deck builder
  const deck = await import('../js/deck.js');
  const cards = deck.buildModuleDeck(data.foundation[0]);
  check(cards.length === data.foundation[0].lessons.length + 3, 'deck = hook + lessons + skill + cta');
  check(cards[0].type === 'hook' && cards[cards.length - 1].cta, 'deck has hook first and CTA last');
}
{
  // speech module is import-safe and degrades in Node (no window)
  const speech = await import('../js/speech.js');
  check(speech.speechSupported() === false, 'speechSupported false in Node (no crash on import)');
  check(speech.htmlToSpeech('Title', '<p>Hello world.</p><ul><li>one</li><li>two</li></ul>').startsWith('Title'), 'htmlToSpeech strips HTML and leads with title');
}

console.log('\n— Tree renderer —');
for (let stage = 0; stage <= 7; stage++) {
  const fake = { innerHTML: '' };
  tree.renderTree(fake, {
    stage,
    branches: Array.from({ length: Math.min(8, stage * 2) }, (_, i) => ({ skill: 'Skill ' + i })),
    leafScore: stage / 7,
    fruits: stage >= 6 ? 3 : 0,
    name: 'Test',
  });
  check(fake.innerHTML.startsWith('<svg') && fake.innerHTML.includes('</svg>'), `stage ${stage} renders SVG (${fake.innerHTML.length} chars)`);
}

// export/import roundtrip
const dump = storage.exportState();
storage.resetAll();
check(progress.treeStats().stage === 0, 'reset returns to seed');
storage.importState(dump);
check(progress.treeStats().stage === 7, 'import restores the banyan');

console.log(failures === 0 ? '\nALL CHECKS PASSED ✓' : `\n${failures} CHECKS FAILED ✗`);
process.exit(failures === 0 ? 0 : 1);
