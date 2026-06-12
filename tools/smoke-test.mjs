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
check(data.projects.length === 6, '6 projects');

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

// projects → fruits
const p1 = data.projectById('p1');
p1.selfCheck.forEach((_, i) => storage.setProjectCheck('p1', i, true, p1.selfCheck.length));
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
check(data.personas.length === 10, `10 personas defined (${data.personas.length})`);
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
