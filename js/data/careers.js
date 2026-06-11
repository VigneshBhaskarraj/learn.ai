// Career consult: questionnaire definition + curated catalog of AI-era roles.
// The catalog anchors the Gemini prompt AND powers the offline fallback.

export const careerQuestions = {
  responsibilities: [
    { id: 'automation', label: 'Building automations / integrations (RPA, workflows, scripts)' },
    { id: 'coding', label: 'Writing application code' },
    { id: 'people', label: 'Managing people / resources' },
    { id: 'delivery', label: 'Managing projects / delivery' },
    { id: 'requirements', label: 'Gathering requirements & writing specs' },
    { id: 'process', label: 'Analyzing business processes' },
    { id: 'data', label: 'Analyzing data / reporting' },
    { id: 'testing', label: 'Testing & quality assurance' },
    { id: 'advisory', label: 'Advising clients / stakeholders' },
    { id: 'architecture', label: 'Designing solutions / architecture' },
    { id: 'operations', label: 'Running operations / support' },
  ],
  enjoys: [
    { id: 'building', label: 'Building things that work' },
    { id: 'leading', label: 'Leading and growing people' },
    { id: 'advising', label: 'Advising and influencing decisions' },
    { id: 'analyzing', label: 'Analyzing problems and data' },
    { id: 'quality', label: 'Making things reliable and correct' },
    { id: 'designing', label: 'Designing systems end-to-end' },
    { id: 'teaching', label: 'Explaining and enabling others' },
  ],
  experience: [
    { id: '0-3', label: '0–3 years' },
    { id: '4-8', label: '4–8 years' },
    { id: '9-15', label: '9–15 years' },
    { id: '15+', label: '15+ years' },
  ],
  techComfort: [
    { id: 'none', label: 'Not technical', blurb: 'I work around technology, not in it' },
    { id: 'lowcode', label: 'Low-code / tools', blurb: 'RPA studios, Power Platform, configuration' },
    { id: 'scripting', label: 'Scripting', blurb: 'Comfortable with Python/JS basics, SQL, APIs' },
    { id: 'engineer', label: 'Professional developer', blurb: 'I build and ship software' },
  ],
  direction: [
    { id: 'technical', label: 'Stay hands-on technical', blurb: 'I want to build with AI' },
    { id: 'architecture', label: 'Toward architecture', blurb: 'Design AI solutions end-to-end' },
    { id: 'leadership', label: 'Toward leadership', blurb: 'Lead AI teams and programs' },
    { id: 'advisory', label: 'Toward advisory', blurb: 'Guide clients through AI change' },
    { id: 'open', label: 'Open to anything', blurb: 'Show me where I fit best' },
  ],
};

// Curated AI-era roles. weights: keyword → score used by the offline fallback;
// the same catalog text is given to Gemini as grounding.
export const roleCatalog = [
  {
    id: 'agentic-automation',
    title: 'Agentic Automation Engineer',
    emoji: '🤖',
    tagline: 'Evolve deterministic automation (RPA/workflows) into AI agents that handle the unstructured 80%.',
    demand: 'Very high — every RPA estate is being upgraded with LLM intelligence; existing automation skills are the single best on-ramp.',
    coreSkills: ['LLM APIs & prompting', 'agent loops & tool calling', 'workflow vs agent judgment', 'guardrails & human-in-the-loop design', 'evals for non-deterministic steps'],
    naturalFrom: 'RPA developers, workflow/integration developers, low-code builders, automation CoE members',
    track: 'dev',
    projects: ['p4', 'p5'],
    weights: { automation: 5, coding: 2, operations: 2, techComfort_lowcode: 3, techComfort_scripting: 3, techComfort_engineer: 2, building: 3, direction_technical: 3 },
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer (LLM Applications)',
    emoji: '💻',
    tagline: 'Build production features on top of models: RAG, structured outputs, agents, evals as CI.',
    demand: 'Very high — the defining engineering role of the decade; closer to systems integration than to ML research.',
    coreSkills: ['LLM API engineering', 'RAG architecture', 'prompt engineering as code', 'evals & observability', 'cost/latency optimization'],
    naturalFrom: 'Software developers, integration engineers, full-stack engineers',
    track: 'dev',
    projects: ['p4', 'p5'],
    weights: { coding: 5, automation: 2, architecture: 2, techComfort_engineer: 4, techComfort_scripting: 2, building: 3, direction_technical: 3 },
  },
  {
    id: 'ai-solution-architect',
    title: 'AI Solution Architect',
    emoji: '🏗️',
    tagline: 'Design end-to-end AI solutions: model selection, RAG/agent architecture, integration, governance — and keep them honest with evals.',
    demand: 'High and rising — enterprises need people who can see the whole board: data readiness, build-vs-buy, risk tiers, operating model.',
    coreSkills: ['AI capability mapping', 'architecture patterns (RAG, agents, MCP)', 'vendor & model strategy', 'security incl. prompt injection', 'governance & compliance design'],
    naturalFrom: 'Solution architects, senior automation leads, technical team leads who design as well as deliver',
    track: 'dev',
    projects: ['p3', 'p4'],
    weights: { architecture: 5, automation: 2, coding: 2, advisory: 2, designing: 4, direction_architecture: 5, experience_9: 2, experience_15: 2 },
  },
  {
    id: 'ai-product-owner',
    title: 'AI Product Owner / AI PM',
    emoji: '🧭',
    tagline: 'Own AI features end-to-end: feasibility triangles, eval-based acceptance criteria, trust UX, token economics.',
    demand: 'High — every product team adding AI needs an owner who understands probabilistic features.',
    coreSkills: ['AI use-case feasibility', 'evals as acceptance criteria', 'failure-path design', 'AI UX & trust patterns', 'cost-per-use economics'],
    naturalFrom: 'Product owners, business analysts close to product, RPA CoE leads who prioritize pipelines',
    track: 'po',
    projects: ['p3', 'p5'],
    weights: { requirements: 4, delivery: 2, process: 2, advisory: 2, analyzing: 2, leading: 2, direction_leadership: 2, direction_advisory: 2 },
  },
  {
    id: 'ai-business-analyst',
    title: 'AI Business Analyst / AI Consultant',
    emoji: '📊',
    tagline: 'Mine processes for AI opportunities, redesign workflows with humans in the loop, build business cases that survive scrutiny.',
    demand: 'High — clients ask "where should we use AI?" daily; few analysts can answer with method instead of hype.',
    coreSkills: ['task-level opportunity mining', 'workflow redesign (3-swimlane)', 'honest ROI math', 'vendor diligence', 'data readiness & governance basics'],
    naturalFrom: 'Business analysts, process consultants, RPA process analysts, functional consultants',
    track: 'ba',
    projects: ['p2', 'p6'],
    weights: { process: 5, requirements: 3, advisory: 3, data: 2, analyzing: 4, advising: 3, direction_advisory: 4 },
  },
  {
    id: 'eval-engineer',
    title: 'Eval & AI Quality Engineer',
    emoji: '🔬',
    tagline: 'Own the measurement of AI systems: golden datasets, rubrics, LLM-judges, red-teaming. The discipline every AI team lacks.',
    demand: 'Exploding with almost no incumbents — regulators and production incidents are manufacturing demand monthly.',
    coreSkills: ['golden set & rubric design', 'LLM-as-judge calibration', 'red-teaming & prompt injection testing', 'statistical thinking', 'regression discipline for prompts/models'],
    naturalFrom: 'QA engineers, test leads, detail-oriented automation testers',
    track: 'qa',
    projects: ['p5', 'p4'],
    weights: { testing: 5, quality: 4, analyzing: 2, data: 2, automation: 1, direction_technical: 2 },
  },
  {
    id: 'ai-delivery-lead',
    title: 'AI Delivery Lead / AI Program Manager',
    emoji: '🧑‍✈️',
    tagline: 'Run AI portfolios with discipline: pilot contracts, wave sequencing, honest economics, and teams that adopt instead of resist.',
    demand: 'High — 40% of AI projects fail on execution, not capability; leaders who prevent that are scarce.',
    coreSkills: ['AI pilot & portfolio discipline', 'AI economics (tokens to icebergs)', 'adoption psychology & upskilling', 'governance that enables', 'vendor & model strategy'],
    naturalFrom: 'Delivery managers, RPA CoE managers, team leads who manage people and outcomes',
    track: 'lead',
    projects: ['p2', 'p6'],
    weights: { people: 5, delivery: 4, advisory: 2, leading: 5, direction_leadership: 5, experience_9: 2, experience_15: 3 },
  },
  {
    id: 'ai-governance',
    title: 'AI Governance & Risk Specialist',
    emoji: '⚖️',
    tagline: 'Make AI adoption safe and compliant: acceptable-use policy, risk-tier intake, audit trails, EU AI Act readiness.',
    demand: 'Growing fast — regulation is tightening and client contracts now carry AI clauses; firms need someone who owns this.',
    coreSkills: ['risk-tier frameworks (EU AI Act)', 'policy & intake design', 'human-oversight standards', 'incident response paths', 'audit & documentation'],
    naturalFrom: 'Compliance-minded BAs, QA leads, delivery managers in regulated industries',
    track: 'lead',
    projects: ['p6', 'p2'],
    weights: { advisory: 3, testing: 2, process: 2, delivery: 2, quality: 3, analyzing: 2, direction_advisory: 2 },
  },
  {
    id: 'data-ai-analyst',
    title: 'Data & AI Analyst',
    emoji: '📈',
    tagline: 'Use AI to supercharge analysis — and analyze AI itself: adoption metrics, eval dashboards, productivity baselines.',
    demand: 'Solid — every AI program needs someone who measures honestly; AI-fluent analysts do analysis 2-3× faster.',
    coreSkills: ['AI-assisted analysis', 'prompting for data work', 'measurement design & baselines', 'storytelling with evidence', 'spotting AI-generated nonsense'],
    naturalFrom: 'Data analysts, reporting specialists, operations analysts',
    track: 'ba',
    projects: ['p1', 'p2'],
    weights: { data: 5, process: 2, analyzing: 4, quality: 2, techComfort_scripting: 2 },
  },
];

export function roleById(id) {
  return roleCatalog.find((r) => r.id === id) || null;
}

// Offline fallback: keyword-weighted scoring of the catalog against the answers.
export function localCareerEstimate(answers) {
  const keys = new Set([
    ...(answers.responsibilities || []),
    ...(answers.enjoys || []),
    `techComfort_${answers.techComfort}`,
    `direction_${answers.direction}`,
    `experience_${(answers.experience || '').startsWith('9') ? '9' : (answers.experience || '').startsWith('15') ? '15' : 'low'}`,
  ]);
  const scored = roleCatalog
    .map((r) => {
      let score = 0;
      for (const [k, w] of Object.entries(r.weights)) if (keys.has(k)) score += w;
      return { role: r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const max = Math.max(1, scored[0].score);

  return {
    summary: `Based on your answers (offline estimate — run the AI analysis for a fully personalized version), your experience in ${answers.currentRole || 'your current role'} maps strongly onto ${scored[0].role.title}. The routine layer of your current work is being absorbed by AI — but the judgment, domain knowledge and delivery discipline you have built transfer directly into the roles below.`,
    roles: scored.map(({ role, score }, i) => ({
      title: role.title,
      fitScore: Math.max(45, Math.min(95, Math.round(60 + (score / max) * 35 - i * 6))),
      tagline: role.tagline,
      whyYouFit: [
        `Your background matches the natural entry path: ${role.naturalFrom}.`,
        'Your selected responsibilities overlap with the core of this role.',
        `Market demand: ${role.demand}`,
      ],
      transferableSkills: ['Domain & process knowledge from your current role', 'Stakeholder and delivery experience', 'Working discipline that AI roles require but rarely find'],
      gaps: role.coreSkills.map((s) => s),
      first90Days: [
        'Complete the learn.ai foundation (6 modules) to build the conceptual base.',
        `Finish the ${role.track.toUpperCase()} persona track on this platform — it maps directly to this role.`,
        'Build the suggested hands-on projects and show them to your team.',
        'Volunteer for the AI-adjacent task nearest to your current job — contact beats courses.',
      ],
      readinessSignals: [
        'You can explain RAG, agents and evals to a colleague without notes.',
        'You have built at least one working artifact (project) related to this role.',
        'People at work start routing AI questions to you.',
      ],
      suggestedTrack: role.track,
      suggestedProjects: role.projects,
    })),
    honestNote: 'This offline estimate is rule-based. Run the full AI analysis for a version tailored to your exact words.',
  };
}
