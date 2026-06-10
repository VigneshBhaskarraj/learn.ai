// Persona tracks A — Product Owner / PM and Developer / Engineer. "The Branches".
export const tracksA = [
  {
    id: 'po',
    label: 'Product Owner / Product Manager',
    emoji: '🧭',
    blurb: 'You decide what gets built and why.',
    pitch: 'Learn to scope, specify and ship AI features: feasibility, probabilistic acceptance criteria, trust-building UX, and the economics of tokens.',
    modules: [
      {
        id: 'po1',
        kind: 'track',
        track: 'po',
        order: 1,
        emoji: '🧭',
        title: 'Shaping AI Products',
        skill: 'AI Product Sense',
        tagline: 'Find the real use cases, write requirements for probabilistic features, design for trust.',
        minutes: 21,
        lessons: [
          {
            id: 'po1-l1',
            title: "Where AI adds product value (and where it doesn't)",
            minutes: 7,
            content: `
<p>Every backlog now has "add AI" scribbled somewhere on it. Your job is converting that scribble into features that survive contact with users. Start with a filter that kills bad ideas early.</p>
<h3>The feasibility triangle</h3>
<p>Score every AI feature idea on three axes — it needs all three:</p>
<ul>
<li><strong>Value density:</strong> does it hit a frequent, painful, time-consuming task? AI that saves 2 hours weekly per user beats AI that's "neat" — novelty features churn within a month.</li>
<li><strong>Data & context availability:</strong> does the model have access to what it needs to do the task well? (Remember: what's not in context doesn't exist.) A support-reply drafter with full ticket history is feasible; one without it is a hallucination engine.</li>
<li><strong>Error tolerance:</strong> what happens when output is wrong — and it sometimes will be? Drafting (human reviews anyway) tolerates errors beautifully. Auto-actions with money, legal or safety consequences don't. The viable zone for most products: <strong>AI proposes, human disposes.</strong></li>
</ul>
<div class="callout"><strong>Augment vs automate — the PO's first fork:</strong> automation removes the human (high bar: needs near-perfect reliability or low stakes); augmentation accelerates the human (low bar: only needs to beat a blank page). When in doubt, ship augmentation first — it generates the usage data and trust you need to earn automation later.</div>
<h3>The four sweet spots, productized</h3>
<p>From your foundation: drafting, extraction, synthesis, conversation. Map them to your product. What do users write repeatedly? (drafting) What do they re-type from documents? (extraction) What do they scroll to understand? (synthesis) What do they ask support? (conversation). Run this lens over your user journeys and you'll mine more honest AI ideas in an hour than a quarter of brainstorms.</p>
<h3>The anti-pattern catalogue</h3>
<p>Be the person who stops these: <em>AI for the roadmap slide</em> (no user problem), <em>chat as universal interface</em> (a chatbot bolted onto a UI that worked fine), <em>magic replacing workflow</em> ("the AI will just know" — it won't; context must come from somewhere). Each fails the triangle on a different corner.</p>`,
            takeaways: [
              'Filter AI ideas through the triangle: value density × data availability × error tolerance.',
              'Augmentation (AI proposes, human disposes) is the default viable zone; automation must be earned.',
              'Mine real use cases by mapping drafting/extraction/synthesis/conversation onto your user journeys.',
            ],
            quote: {
              text: 'The hard part is not the AI. The hard part is finding the workflow where the AI matters.',
              by: 'Every experienced AI product team',
              role: 'Learned the expensive way',
            },
          },
          {
            id: 'po1-l2',
            title: 'Writing requirements for probabilistic features',
            minutes: 7,
            content: `
<p>Classic acceptance criteria assume determinism: <em>given X, the system shall do Y.</em> An LLM feature given X will do Y… usually. Sometimes Y'. Occasionally something creative. Your specification toolkit needs an upgrade — here it is.</p>
<h3>From "shall" to "scores"</h3>
<p>The shift: <strong>acceptance criteria become eval criteria.</strong> Instead of "the summary shall be accurate", write measurable quality bars over a test set:</p>
<ul>
<li><em>"On our 100-case golden set, ≥95% of summaries contain zero factual deviations from the source (graded by LLM-judge, human-audited monthly)."</em></li>
<li><em>"100% of out-of-scope questions are declined with the standard redirect — including the 20 adversarial cases."</em></li>
<li><em>"P95 latency under 4 seconds; cost per request under $0.02 at the 80th percentile of input size."</em></li>
</ul>
<p>This is why evals sat in your foundation: <strong>the golden set + rubric IS your requirements document</strong> — executable, regression-proof, and far less ambiguous than prose.</p>
<h3>Specify the failure behavior — it's half the spec</h3>
<p>Probabilistic features need their failure modes designed, not discovered: What happens when confidence is low? (Hedge, cite, or escalate to human.) When the answer isn't in the retrieved sources? (Say so — never improvise.) When the user asks something off-limits? (Standard redirect.) Write these as first-class user stories. The unhappy paths are where trust is won or destroyed.</p>
<div class="callout"><strong>The error budget conversation:</strong> borrow from SRE practice. Agree with stakeholders, explicitly and in writing: "this feature will be wrong about N% of the time; here is the worst-case wrongness; here is how users catch and correct it; here is the monitoring." Stakeholders who can't accept any error rate are telling you to descope from automation to augmentation — better to learn that in refinement than in production.</div>
<h3>Definition of Done, AI edition</h3>
<p>Add to your DoD: golden set exists and passes thresholds · failure behaviors implemented and tested · adversarial cases included · cost and latency measured at realistic load · monitoring dashboards live · prompt/model versions pinned and change-controlled. Ship checklist, not vibes.</p>`,
            takeaways: [
              'Acceptance criteria become eval criteria: quality thresholds measured over a golden test set.',
              'Specify failure behavior as first-class user stories — unhappy paths are where trust lives.',
              'Agree an explicit error budget with stakeholders before building; intolerance of error means descope to augmentation.',
            ],
            quote: {
              text: 'In AI products, the spec is the eval. If it is not measured, it was never really required.',
              by: 'Modern AI product practice',
              role: 'The discipline that separates shipped from demoed',
            },
          },
          {
            id: 'po1-l3',
            title: 'Designing for trust: AI UX patterns that work',
            minutes: 7,
            content: `
<p>Users don't experience your model — they experience your interface to it. The same underlying capability can feel magical or menacing depending on five design choices, all of them yours to demand.</p>
<h3>The trust pattern library</h3>
<ul>
<li><strong>Show your sources.</strong> Citations users can click and check (RAG's superpower). "Per section 4.2 of the policy [link]" converts blind faith into quick verification. Single biggest trust win available.</li>
<li><strong>Make review effortless.</strong> If AI drafts, show the draft <em>as a draft</em> — editable, diffable against the user's previous text, never auto-sent. The user's edit IS the human-in-the-loop, so design the edit surface lovingly.</li>
<li><strong>Communicate confidence honestly.</strong> When the system is unsure, say so in words ("I couldn't find this in the docs — here's my best inference"). Calibrated hedging beats fake certainty; users forgive uncertainty, never betrayal.</li>
<li><strong>Give an escape hatch.</strong> Every AI surface needs a visible path to the non-AI route: a human agent, manual entry, undo. Escape hatches paradoxically <em>increase</em> AI usage — safety nets make people jump.</li>
<li><strong>Close the feedback loop.</strong> Thumbs up/down with optional "what went wrong?" feeds your eval set with real-world failures. Your golden set should grow from production, not imagination.</li>
</ul>
<div class="callout"><strong>Calibrate expectations at first contact:</strong> the empty state and first-run experience should teach what the feature is good at and where it needs checking — one honest sentence ("Drafts replies from ticket history; verify amounts and dates") saves a thousand support escalations. Overpromising buys a week of wow and a year of churn.</div>
<h3>The metric that ties it together</h3>
<p>Beyond usage, track <strong>acceptance rate</strong>: how often users accept/lightly-edit AI output versus discard it. Falling acceptance is your earliest signal of quality drift — long before complaints. Pair it with eval scores (offline truth) and you have the two-gauge dashboard of a well-run AI feature.</p>`,
            takeaways: [
              'Trust patterns: citations, effortless review, honest confidence, escape hatches, feedback loops.',
              'Set expectations honestly at first contact — overpromising trades a week of wow for a year of churn.',
              'Track acceptance rate alongside eval scores: leading indicator of quality drift.',
            ],
            quote: {
              text: 'People do not trust AI. They trust interfaces that let them verify AI.',
              by: 'AI product design principle',
              role: 'Why citations beat confidence scores',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'An exec wants AI to auto-approve supplier invoices. Using the feasibility triangle, what is the strongest concern?',
              options: [
                'Value density — invoice processing is rare',
                'Error tolerance — wrong auto-approvals have direct financial consequences, so start with AI-proposes-human-approves',
                'The model cannot read PDFs',
                'There is no concern; modern models are reliable enough',
              ],
              answer: 1,
              explain: 'Money-moving auto-actions sit at the lowest error tolerance. The triangle says: ship augmentation (AI extracts and proposes, human approves) and earn automation with measured reliability.',
            },
            {
              q: 'What does "acceptance criteria become eval criteria" mean in practice?',
              options: [
                'Write longer Gherkin scenarios',
                'Define measurable quality thresholds over a golden test set (e.g. ≥95% factually grounded) instead of deterministic shall-statements',
                'Let the data science team define requirements',
                'Accept that AI features cannot have requirements',
              ],
              answer: 1,
              explain: 'Probabilistic systems need statistical specs: a test set, a rubric, and thresholds — executable requirements that double as a regression suite.',
            },
            {
              q: 'Which is NOT one of the trust-building UX patterns from the lesson?',
              options: [
                'Clickable citations to sources',
                'Visible escape hatch to a non-AI path',
                'Hiding uncertainty so users are not alarmed',
                'Thumbs up/down feeding the eval set',
              ],
              answer: 2,
              explain: 'Hiding uncertainty is the anti-pattern: calibrated honesty ("I couldn\'t find this in the docs") builds durable trust; fake certainty destroys it on first betrayal.',
            },
            {
              q: 'Why is acceptance rate (accept vs discard of AI output) such a valuable product metric?',
              options: [
                'It directly measures revenue',
                'It is the earliest signal of quality drift — falling acceptance precedes user complaints by weeks',
                'It is required by regulators',
                'It replaces the need for offline evals',
              ],
              answer: 1,
              explain: 'Acceptance rate is the production-side gauge that pairs with offline eval scores. It drops early when quality drifts — and it complements rather than replaces evals.',
            },
          ],
        },
      },
      {
        id: 'po2',
        kind: 'track',
        track: 'po',
        order: 2,
        emoji: '🚢',
        title: 'Delivering AI Products',
        skill: 'AI Delivery',
        tagline: 'Build vs buy, token economics, and the lifecycle from flashy demo to reliable feature.',
        minutes: 21,
        lessons: [
          {
            id: 'po2-l1',
            title: 'Build, buy, or API: the new make-or-buy decision',
            minutes: 7,
            content: `
<p>"Should we build our own AI?" is usually the wrong question wearing the right question's clothes. Decompose it into the three layers actually in play.</p>
<h3>The three-layer decision</h3>
<ul>
<li><strong>The model</strong> — almost always rented via API. Training a frontier model costs hundreds of millions; even fine-tuning is rarely the first move (good prompting + retrieval covers most needs — and survives model upgrades, which fine-tunes may not). Defensible default: <em>rent the brain.</em></li>
<li><strong>The context & integration layer</strong> — this is where "build" usually means building: your retrieval over your data, your tool integrations (hello MCP), your prompts encoding your domain expertise, your evals. <strong>This layer is your differentiation</strong> — competitors can rent the same model; they can't rent your data and workflow knowledge.</li>
<li><strong>The application surface</strong> — buy if a vendor product fits your workflow (copilots for sales, support, coding); build when the workflow IS your product or your competitive edge.</li>
</ul>
<div class="callout"><strong>Model choice is a portfolio, not a marriage:</strong> different features deserve different models — a cheap fast model for autocomplete, a frontier model for complex analysis, a reasoning model for the hard 5%. Demand the abstraction that lets you switch (the eval suite is your switching insurance: re-run it against the candidate model, read the scores, decide in a day).</div>
<h3>Questions that make vendors sweat (productively)</h3>
<p>When buying: What do your evals show, on cases like ours? What happens to our data — training use, retention, residency? What's the model-upgrade policy and how do you regression-test it? Pricing at our realistic volume — tokens, seats, or outcomes? Exit story — what do we keep if we leave? A PO armed with these five runs a better AI procurement than most IT departments did in 2024.</p>`,
            takeaways: [
              'Rent the model; build the context layer (your data, prompts, evals) — that is where differentiation lives.',
              'Treat model choice as a swappable portfolio; your eval suite is the switching insurance.',
              'Five vendor questions: evals on our cases, data handling, upgrade policy, realistic pricing, exit story.',
            ],
            quote: {
              text: 'Your moat is not the model. Your moat is everything you wrap around the model.',
              by: 'AI product strategy maxim',
              role: 'The build-vs-buy bottom line',
            },
          },
          {
            id: 'po2-l2',
            title: 'Token economics: costing AI features like a pro',
            minutes: 7,
            content: `
<p>AI features have a property your roadmap has never had to price: <strong>marginal cost per use.</strong> Classic software costs ~nothing per click; every AI request burns metered tokens. POs who can't do this math ship features that lose money per user. The math, fortunately, is small.</p>
<h3>The unit economics on one napkin</h3>
<p><em>Cost per request ≈ (input tokens × input price) + (output tokens × output price).</em> Worked example: a support-reply drafter loads ~6,000 tokens of ticket history + instructions, generates ~500 tokens of reply. On a mid-tier model at $3/million in, $15/million out: <strong>(6,000×3 + 500×15)/1,000,000 ≈ 2.5 cents per draft.</strong> Agent across 20 tickets/day × 250 days ≈ $125/agent/year — trivially good if it saves minutes per ticket. The same feature on a frontier reasoning model could be 10–30× more: now it matters.</p>
<h3>The four levers when costs bite</h3>
<ul>
<li><strong>Right-size the model:</strong> route routine requests to cheap models, hard ones up. (Your evals tell you what "routine" can survive.)</li>
<li><strong>Trim the context:</strong> retrieval that fetches the relevant 2 pages beats stuffing all 60. Cheaper AND often more accurate.</li>
<li><strong>Cache aggressively:</strong> repeated context (your system prompt, shared documents) can be cached by providers at steep discounts.</li>
<li><strong>Cap the blast radius:</strong> per-user rate limits and max-token ceilings so one power user (or a bug, or an abuser) can't torch the budget.</li>
</ul>
<div class="callout"><strong>Latency is a cost too:</strong> tokens stream out at fixed rates, so long outputs = long waits. Reasoning models add thinking time on top. UX mitigations — streaming the response as it generates, optimistic UI, honest progress states — are roadmap items, not polish. Budget them.</div>
<h3>Put it in the business case</h3>
<p>Every AI feature one-pager should carry: cost per use at P50 and P95 input sizes × projected monthly volume, against value per use (time saved × loaded hourly rate, or conversion lift). When finance asks — and in 2026 finance always asks — you'll be the PO with the answer on one slide.</p>`,
            takeaways: [
              'Cost per request = input tokens × input price + output tokens × output price. Do the napkin math before building.',
              'Four cost levers: right-size the model, trim context via retrieval, cache repeated content, cap usage.',
              'Business-case every feature: cost per use × volume vs value per use. Latency is part of the cost.',
            ],
            quote: {
              text: 'In the API era, every product manager needs a little CFO in them: features now have a cost of goods sold.',
              by: 'AI product economics',
              role: 'The napkin math that finance will ask for',
            },
          },
          {
            id: 'po2-l3',
            title: 'From demo to dependable: the AI product lifecycle',
            minutes: 7,
            content: `
<p>The defining trap of AI product work: <strong>the demo is 20% of the effort and generates 80% of the expectations.</strong> A weekend prototype dazzles the steering committee; making it dependable takes the actual quarter. Manage the gap or it manages you.</p>
<h3>Why demos mislead (structurally, not dishonestly)</h3>
<p>Demos run happy-path inputs, chosen by the builder, with failures quietly re-rolled. Production serves adversarial users, messy data, edge cases and Mondays at full volume. Between demo and dependable lie exactly the disciplines of this track: golden sets, failure-path design, cost controls, monitoring. None are visible in the demo; all are the work.</p>
<h3>The lifecycle that works</h3>
<ul>
<li><strong>1. Prototype in days</strong> — genuinely! Prompt + sample data validates desirability cheaply. Prototype many, advance few.</li>
<li><strong>2. Eval before invest:</strong> build the golden set <em>now</em>, score the prototype honestly. This number — not the demo applause — gates engineering investment.</li>
<li><strong>3. Pilot with friendlies:</strong> small real-user group, feedback loop wired into the eval set, acceptance rate dashboards on. Weeks, not quarters.</li>
<li><strong>4. Harden:</strong> failure paths, cost caps, guardrails, monitoring, prompt change-control. The unglamorous 80%.</li>
<li><strong>5. Scale & watch:</strong> quality drifts — usage shifts, data changes, models update. The eval suite runs on every change forever; acceptance rate guards production. AI features are gardens, not statues.</li>
</ul>
<div class="callout"><strong>Managing the expectation gap upward:</strong> the day the demo lands, deliver the sentence that saves the quarter: <em>"What you saw works on chosen examples; here is the measured score across realistic cases, and here is the plan to close the gap."</em> Then show eval scores trending up weekly. Executives forgive a 70% that honestly becomes 92%; they do not forgive a "done" that wasn't.</div>
<h3>Your track, complete</h3>
<p>You can now find real AI use cases, spec them measurably, design them for trust, choose the build path, price them, and shepherd them from demo to dependable. The "Design an AI Feature One-Pager" project in your path turns this into a portfolio artifact — and a fruit on your tree.</p>`,
            takeaways: [
              'Demos are 20% of effort, 80% of expectations — the gap is golden sets, failure paths, monitoring, controls.',
              'Lifecycle: prototype fast → eval before investing → pilot with friendlies → harden → monitor forever.',
              'Manage expectations with measured eval scores trending up, not demo applause.',
            ],
            quote: {
              text: 'Prototypes are now nearly free. Reliability is where all the cost went. Plan accordingly.',
              by: 'The central lesson of enterprise AI, 2023–2026',
              role: 'Why 40% of agent projects were predicted to fail',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'In the three-layer build-vs-buy decision, where does a typical company\'s differentiation live?',
              options: [
                'Training a proprietary foundation model',
                'The context & integration layer: their data, retrieval, domain prompts, tool integrations and evals',
                'Buying more GPU capacity than competitors',
                'The chat UI design',
              ],
              answer: 1,
              explain: 'Everyone can rent the same models. Nobody can rent your data, workflow knowledge and domain-encoding prompts — build there, rent the brain.',
            },
            {
              q: 'A feature uses ~10,000 input tokens and ~1,000 output tokens per request on a model priced $3/M input, $15/M output. Approximate cost per request?',
              options: ['About $0.45', 'About 4.5 cents', 'About 0.045 cents', 'About $4.50'],
              answer: 1,
              explain: '(10,000×$3 + 1,000×$15)/1,000,000 = ($30,000+$15,000)/1M = $0.045 ≈ 4.5 cents. This napkin math × monthly volume belongs in every AI feature business case.',
            },
            {
              q: 'Why do AI demos systematically mislead?',
              options: [
                'Vendors deliberately fake them',
                'They run builder-chosen happy-path inputs; production brings adversarial users, messy data and scale — and the hardening work is invisible in a demo',
                'Demo hardware is faster than production',
                'They do not — a good demo means the product is ready',
              ],
              answer: 1,
              explain: 'The demo-to-dependable gap is structural: golden sets, failure-path design, cost controls and monitoring are 80% of the effort and 0% of the demo.',
            },
            {
              q: 'What should gate the decision to invest serious engineering in an AI prototype?',
              options: [
                'Steering committee enthusiasm after the demo',
                'Competitor announcements',
                'An honest eval score on a golden set of realistic and adversarial cases',
                'The development team\'s confidence',
              ],
              answer: 2,
              explain: '"Eval before invest": prototype cheaply, build the golden set immediately, and let the measured score — not applause — gate the investment.',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'dev',
    label: 'Developer / Engineer',
    emoji: '💻',
    blurb: 'You build and integrate the systems.',
    pitch: 'Go from calling an API to engineering reliable AI systems: structured outputs, RAG architecture, agents and tools, evals as CI, and production hardening.',
    modules: [
      {
        id: 'dev1',
        kind: 'track',
        track: 'dev',
        order: 1,
        emoji: '🔌',
        title: 'Building with LLM APIs',
        skill: 'AI Engineering',
        tagline: 'Model calls done right, RAG as a real architecture, prompts managed like code.',
        minutes: 21,
        lessons: [
          {
            id: 'dev1-l1',
            title: 'Your first production-grade model call',
            minutes: 7,
            content: `
<p>Calling an LLM is one HTTPS POST. Calling one <em>well</em> — reliably, parseably, affordably — is a small engineering discipline. Here's the anatomy, and the five decisions hiding inside it.</p>
<h3>The request anatomy</h3>
<p>Every provider's chat API shares the same skeleton: a <strong>model ID</strong>, a <strong>system prompt</strong> (standing instructions: role, rules, output contract — your code's contribution), a <strong>messages array</strong> (the conversation: user/assistant turns — remember, the API is stateless; you resend relevant history every call, and managing that history IS managing the context window), and <strong>sampling parameters</strong>.</p>
<h3>Decision 1 — Temperature: determinism vs creativity</h3>
<p>Temperature scales randomness in token selection. Near 0: maximally predictable — use for extraction, classification, anything parsed by code. Higher (~0.7–1.0): varied and creative — use for brainstorming and drafts. Default for backend work: <strong>low</strong>. (Even at 0, exact determinism isn't guaranteed — design for it.)</p>
<h3>Decision 2 — Structured output: never regex an LLM's prose</h3>
<p>If code consumes the output, demand machine-readable shape: JSON mode / structured-output features constrain generation to a schema you define. Then <strong>validate anyway</strong> (the schema, the enums, the ranges) — and on validation failure, retry with the error appended. That loop converts "mostly works" into "works."</p>
<h3>Decisions 3–5 — The reliability trio</h3>
<ul>
<li><strong>Timeouts & retries with backoff:</strong> model APIs have tail latencies and rate limits (429s). Treat them like any flaky upstream — except note that <em>retries cost money</em>; cap them.</li>
<li><strong>Streaming:</strong> tokens arrive over seconds; stream to the user for perceived speed, but remember streamed output can't be fully validated until complete — buffer when code consumes it.</li>
<li><strong>Observability from day one:</strong> log prompt version, model ID, token counts, latency and (with care for sensitive data) inputs/outputs. You cannot debug what you didn't capture, and token logs are your cost dashboard.</li>
</ul>
<div class="callout"><strong>The mental shift from classic integrations:</strong> you're not calling a function; you're delegating to a probabilistic subcontractor. Specify tightly (system prompt + schema), verify the deliverable (validation + evals), and budget for variance (retries, fallbacks). Everything else in this track elaborates that sentence.</div>`,
            takeaways: [
              'The API is stateless: you manage conversation history, and that means managing the context window.',
              'Low temperature + JSON schema + validate-and-retry = the backbone of parseable, reliable LLM calls.',
              'Log prompt version, model, tokens and latency from day one — observability is your cost and quality dashboard.',
            ],
            quote: {
              text: 'Treat the model as a probabilistic subcontractor: specify tightly, verify the deliverable, budget for variance.',
              by: 'AI engineering in one sentence',
              role: 'The discipline behind reliable LLM features',
            },
          },
          {
            id: 'dev1-l2',
            title: 'RAG as a real architecture (not a demo)',
            minutes: 7,
            content: `
<p>You met RAG conceptually in the foundation. As the engineer, you own the four design decisions that separate the 60%-accurate demo from the 95%-accurate product. Spoiler: none of them is "pick a vector database."</p>
<h3>Decision 1 — Chunking: the unglamorous king</h3>
<p>How you split documents dominates quality. Chunks too large → diluted embeddings and wasted context; too small → orphaned fragments missing their context. Strong defaults: split on semantic boundaries (headings, sections) rather than fixed character counts; include overlap; <strong>prepend metadata to each chunk</strong> (document title, section path, date) so retrieved fragments carry their provenance. Tables, slide decks and scanned PDFs need their own strategies — budget real time here.</p>
<h3>Decision 2 — Retrieval: hybrid beats pure</h3>
<p>Embedding similarity is magic for paraphrase ("vacation rules" → leave policy) and blind to exact identifiers (error codes, SKUs, names — where keyword search shines). Production answer: <strong>hybrid search</strong> (vector + keyword, e.g. BM25, with score fusion), often followed by a <strong>reranker</strong> — a second model that re-orders the top-50 candidates by true relevance. Hybrid+rerank is the boring combo that wins most bake-offs.</p>
<h3>Decision 3 — Generation: ground it and prove it</h3>
<p>The generation prompt carries three jobs: answer <em>only</em> from the provided passages; <strong>cite which passage supports each claim</strong> (enables verification AND measurably reduces fabrication); and say "not found" when the sources don't contain the answer — the most valuable sentence in enterprise AI.</p>
<h3>Decision 4 — Evaluate the stages separately</h3>
<p>RAG fails in two distinguishable ways: <strong>retrieval failure</strong> (right answer exists, wrong passages fetched) and <strong>generation failure</strong> (right passages fetched, wrong answer produced). Measure them separately — recall@k for retrieval, groundedness/faithfulness for generation — or you'll spend weeks tuning prompts when your chunking was broken. This split-eval habit is the single mark of someone who has shipped RAG before.</p>
<div class="callout"><strong>Also in the architecture column:</strong> access control enforced at retrieval time (the model must never see documents this user can't), index freshness pipelines (stale index = confidently stale answers), and the long-context question — with million-token models, sometimes "just put the docs in context" beats a retrieval pipeline. Decide with cost × latency × your evals, not fashion.</div>`,
            takeaways: [
              'Chunking strategy dominates RAG quality: semantic boundaries, overlap, metadata-enriched chunks.',
              'Hybrid search (vector + keyword) + reranking is the production-grade retrieval combo.',
              'Eval retrieval (recall@k) and generation (groundedness) separately — they fail differently and need different fixes.',
            ],
            quote: {
              text: 'When RAG fails, amateurs tune the prompt. Professionals first ask: did retrieval even fetch the right passages?',
              by: 'RAG debugging wisdom',
              role: 'The split-eval habit',
            },
          },
          {
            id: 'dev1-l3',
            title: 'Prompts are code: engineer them like it',
            minutes: 7,
            content: `
<p>In Software 3.0 the prompt is the program — so it deserves what programs get: versioning, testing, review and structure. Teams that paste prompts into code as anonymous string literals are accruing the new technical debt.</p>
<h3>Engineering practices for prompts</h3>
<ul>
<li><strong>Version control & review:</strong> prompts live in the repo (or a prompt registry), get diffed, reviewed and change-logged. A one-word prompt change can shift behavior as much as a code change — it gets the same ceremony.</li>
<li><strong>Test on change:</strong> every prompt edit triggers the eval suite (next module makes this concrete). No green, no merge. This is the only known cure for "we tweaked the prompt for case A and silently broke cases B through K."</li>
<li><strong>Template, don't concatenate:</strong> separate the stable instruction frame from injected variables; sanitize what you inject (foreshadowing: prompt injection, module 2). Clearly delimit data from instructions — e.g. wrap user content in tags the system prompt declares as data-only.</li>
<li><strong>Pin and migrate deliberately:</strong> pin exact model versions in production. Provider upgrades change behavior; "the model improved" can still break <em>your</em> distribution. Migrate = run evals against the new version, compare, then switch.</li>
</ul>
<h3>The patterns that earn their keep</h3>
<ul>
<li><strong>Few-shot examples</strong> — 2–5 worked examples in the prompt remain the highest-ROI quality lever in the toolbox, especially for format and edge-case behavior. Choose examples that encode your hardest cases.</li>
<li><strong>Decomposition</strong> — one prompt doing five jobs does none well. Pipeline: classify → route → extract → draft → verify. Each stage simple, testable, separately model-sized (cheap model for classify, strong for draft). This is just good systems design wearing new clothes.</li>
<li><strong>Self-checking</strong> — append a verification pass: "Review your output against the schema and the source; list violations and correct them." Or run a second cheap model as gate. Catches a surprising share of failures for one extra call.</li>
</ul>
<div class="callout"><strong>The meta-skill — write for the model, not for yourself:</strong> ambiguity a human colleague would resolve from charity, the model resolves from <em>statistics</em> — sometimes your way, sometimes not. Concrete nouns, explicit output contracts, stated edge-case behavior, one instruction per sentence. Read your prompt asking "what ELSE could this plausibly mean?" — then close the gaps. That habit alone explains much of the gap between senior and junior prompt authors.</div>`,
            takeaways: [
              'Prompts get code ceremony: versioned, reviewed, eval-tested on every change, pinned model versions.',
              'Highest-ROI patterns: few-shot examples, pipeline decomposition, self-check passes.',
              'Write for statistics, not charity: close every "what else could this mean?" gap explicitly.',
            ],
            quote: {
              text: 'The hottest new programming language is English — and it still needs code review.',
              by: 'Andrej Karpathy (extended by every AI platform team)',
              role: 'Software 3.0 engineering practice',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'Your service parses LLM output as JSON and intermittently crashes on malformed responses. Which combination is the right fix?',
              options: [
                'Increase temperature so the model is more flexible',
                'Low temperature + structured output/JSON schema + validate the response + on failure retry with the validation error appended',
                'Switch providers',
                'Parse with more tolerant regex',
              ],
              answer: 1,
              explain: 'Constrain generation (schema, low temperature), then verify and retry-with-error. Never trust unvalidated generation in a code path — design for variance.',
            },
            {
              q: 'Users report the RAG assistant gives wrong answers, yet the answers ARE in the document base. What should you check first?',
              options: [
                'Increase the generation model size',
                'Retrieval quality (recall@k): are the right chunks even being fetched? Then chunking strategy — before touching any prompt',
                'Raise temperature for more creative answers',
                'Add more documents to the index',
              ],
              answer: 1,
              explain: 'RAG fails at retrieval or at generation — measure separately. If the right passages never reach the context window, no prompt tuning can save you. Check recall, then chunking.',
            },
            {
              q: 'Why pin exact model versions in production?',
              options: [
                'Older versions are cheaper',
                'Provider model updates change behavior distributions — even "improvements" can break your specific use cases, so upgrade via eval comparison, deliberately',
                'It is required by API terms of service',
                'Pinning improves latency',
              ],
              answer: 1,
              explain: 'Your prompts and evals are tuned to a model\'s behavior. Treat model upgrades like dependency upgrades: run the eval suite against the candidate, compare, then migrate.',
            },
            {
              q: 'A single prompt classifies a ticket, extracts fields, drafts a reply and assesses sentiment — quality is mediocre everywhere. The engineering fix?',
              options: [
                'Make the prompt longer and more detailed',
                'Use a bigger model for everything',
                'Decompose into a pipeline of simple stages — classify → extract → draft — each separately testable and right-sized to a model',
                'Lower the temperature to zero',
              ],
              answer: 2,
              explain: 'One prompt doing five jobs does none well. Decomposition gives testability, targeted model sizing (cheap for classify, strong for draft) and isolated failure analysis — systems design, new clothes.',
            },
          ],
        },
      },
      {
        id: 'dev2',
        kind: 'track',
        track: 'dev',
        order: 2,
        emoji: '🛠️',
        title: 'Agents, Evals & Production',
        skill: 'Agentic Systems',
        tagline: 'Build agents with guardrails, test the non-deterministic, and survive production.',
        minutes: 21,
        lessons: [
          {
            id: 'dev2-l1',
            title: 'Building agents: loops, tools and guardrails',
            minutes: 7,
            content: `
<p>An agent, mechanically, is a while-loop: send the model a goal plus tool definitions; the model returns either a tool call (execute it, append the result, loop) or a final answer (done). That you could write in an afternoon. Production agent engineering is everything wrapped around that loop.</p>
<h3>First decision: do you even need an agent?</h3>
<p>The industry's hard-won rule: <strong>use a workflow when you know the steps; use an agent when you can't.</strong> Fixed sequence (always: classify → extract → draft)? Chain the calls in code — cheaper, faster, debuggable, deterministic-ish. Open-ended path ("investigate why this invoice doesn't reconcile")? That's agent territory: the model must decide what to look at next based on what it finds. Agents bought where workflows would do is the most common — and most expensive — architecture mistake of the era.</p>
<h3>Tool design is API design for a clever, literal-minded caller</h3>
<ul>
<li><strong>Descriptions are prompts:</strong> the model chooses tools by reading your name + description. Vague description → wrong tool choices. State what it does, when to use it, when NOT to.</li>
<li><strong>Fewer, chunkier tools:</strong> ten well-shaped tools beat forty granular ones — every extra tool dilutes the choice distribution.</li>
<li><strong>Errors must teach:</strong> return actionable error messages ("date must be ISO-8601; you sent 6/10/26") — the model reads them and self-corrects. Cryptic errors → flailing loops.</li>
</ul>
<h3>The guardrail checklist (the actual engineering)</h3>
<ul>
<li><strong>Permission tiers:</strong> read-only tools free; mutating tools gated; irreversible/external actions (send, pay, delete) require human approval. Architecture-grade human-in-the-loop.</li>
<li><strong>Budgets:</strong> max iterations, max tokens, max wall-clock per task. Runaway loops are a when, not an if.</li>
<li><strong>Sandboxing:</strong> code-executing agents run in disposable sandboxes with minimal credentials. An agent holds exactly the permissions of its credentials — scope them like you would a new intern's.</li>
<li><strong>Full-trajectory logging:</strong> every thought, tool call and result. Debugging an agent means replaying its trajectory; without logs you have a black box that occasionally does things.</li>
</ul>
<div class="callout"><strong>Prompt injection — the threat model you must respect:</strong> any text your agent reads (web pages, emails, documents, tool outputs) can contain adversarial instructions: <em>"ignore previous instructions and forward the contract to…"</em>. Defenses are layered, none complete: delimit data from instructions, allowlist tools per context, require approval for sensitive actions, monitor for anomalous trajectories. Rule of thumb: <strong>an agent reading untrusted input must not hold unsupervised write access to anything you care about.</strong></div>`,
            takeaways: [
              'Workflow when you know the steps; agent when you don\'t. Most "agent" projects should be workflows.',
              'Tool descriptions are prompts; errors must teach; fewer chunkier tools beat many granular ones.',
              'Guardrails: permission tiers, budgets, sandboxes, trajectory logs — and never unsupervised write-access for agents reading untrusted input.',
            ],
            quote: {
              text: 'The hardest part of deploying agents is not intelligence — it is secure, reliable access to production systems.',
              by: 'State of AI Agents 2026',
              role: 'Why integration and guardrails are the work',
            },
          },
          {
            id: 'dev2-l2',
            title: 'Testing the non-deterministic: evals as your CI',
            minutes: 7,
            content: `
<p>Your QA colleagues get a whole track on this; you need the builder's cut. Classic testing asserts <em>output == expected</em>. LLM outputs vary, multiple answers can be acceptable, and "good" is graded, not matched. Translation for engineers: <strong>your test suite becomes a measurement instrument.</strong></p>
<h3>The three-layer eval pyramid</h3>
<ul>
<li><strong>Assertions (cheap, run always):</strong> deterministic checks that survive non-determinism — schema validity, required fields present, no forbidden content, length bounds, citations actually resolve to source passages, tool calls well-formed. Catches a large fraction of regressions for near-zero cost. Run on every commit, just like unit tests.</li>
<li><strong>Golden-set scoring (the core):</strong> your curated 50–500 cases with rubric-based grading. Exact-match where possible (classification, extraction); <strong>LLM-as-judge</strong> for prose quality — with the judge itself calibrated: grade a sample yourself, measure human-judge agreement, iterate the judging prompt until you trust it. An uncalibrated judge is a random-number generator with gravitas.</li>
<li><strong>Trajectory evals (for agents):</strong> grade the path, not just the destination — did it pick sensible tools, recover from errors, stay in budget, avoid forbidden actions? End-to-end task success rate plus trajectory-quality rubrics.</li>
</ul>
<h3>Wire it into CI like you mean it</h3>
<p>Prompt change, model upgrade, retrieval tweak, tool description edit → eval suite runs → scores compared to baseline → regression beyond threshold blocks the merge. Track scores over time on a dashboard; quality is a time series, not a gate you pass once. Sound expensive? A 200-case suite on a mid-tier model costs a few dollars a run — versus one production incident's worth of trust.</p>
<div class="callout"><strong>Where golden cases come from (the honest answer):</strong> start with 30 you write from the spec — typical, edge, adversarial, must-never-fail. Then mine production forever: every user thumbs-down, every support escalation, every weird log trajectory becomes a candidate case. Six months in, your eval set is your most valuable IP after the product itself — it encodes everything reality taught you.</div>
<h3>Flakiness, the honest footnote</h3>
<p>Same input, occasional different verdicts — accept it and engineer around it: run flaky cases multiple times and score pass-rates; set thresholds on aggregates ("≥93% across the suite") rather than individual cases; investigate variance as signal (high-variance cases often mark ambiguous spec). You're doing statistics now; embrace the error bars.</p>`,
            takeaways: [
              'Three layers: cheap assertions always; golden-set scoring with calibrated LLM-judges; trajectory evals for agents.',
              'Evals run in CI: prompt/model/retrieval changes can\'t merge on regression. Quality is a time series.',
              'Mine production for golden cases forever — the eval set becomes your most valuable IP.',
            ],
            quote: {
              text: 'An uncalibrated LLM judge is a random-number generator with gravitas. Grade a sample yourself first.',
              by: 'Eval engineering practice',
              role: 'The calibration discipline',
            },
          },
          {
            id: 'dev2-l3',
            title: 'Production: cost, latency, fallbacks and the pager',
            minutes: 7,
            content: `
<p>Your AI feature shipped. Now it's 2 a.m. somewhere and the dashboard is doing something interesting. This lesson is the SRE playbook for LLM systems — the four disciplines that keep AI features boring (the highest compliment in operations).</p>
<h3>1. Cost engineering</h3>
<p>Token spend is a production metric with a budget and an alert, watched per-feature and per-tenant. The levers, in typical ROI order: <strong>model routing</strong> (classify difficulty, send the easy 80% to a model 10–20× cheaper — your evals certify what the cheap model can survive); <strong>prompt caching</strong> (providers discount repeated context heavily — structure prompts so the stable part stays stable); <strong>context discipline</strong> (retrieval precision over kitchen-sink stuffing); <strong>output caps</strong> (max-token ceilings, because output tokens cost more and stream slowly).</p>
<h3>2. Latency engineering</h3>
<p>Users feel time-to-first-token (TTFT) and read at ~5 tokens/sec — so <strong>stream everything user-facing</strong> and front-load value in the output structure. Cut tail latency with hedged requests (fire a backup call at P90, take the first responder). Reasoning models add thinking-time: route to them only when difficulty warrants. Latency budgets belong in the spec next to the quality thresholds.</p>
<h3>3. Resilience</h3>
<p>Providers have incidents, rate limits and brownouts; your feature shouldn't inherit them raw. The ladder: <strong>retries with backoff</strong> (capped — retries are money) → <strong>fallback model</strong> (same or second provider; your eval suite already certified it, right?) → <strong>graceful degradation</strong> (cached response, simpler non-AI path, honest "AI assist unavailable" with the manual workflow intact — the escape hatch your PO designed). Never let the AI path be a single point of failure for a workflow that existed before AI.</p>
<h3>4. Watching quality drift (the silent failure)</h3>
<p>Code rots loudly; AI features rot silently — usage shifts, input distributions move, providers nudge models, the world changes out from under the prompt. Production monitoring for AI adds: <strong>acceptance-rate trends</strong> (the PO's gauge — falling = drift), <strong>online spot-evals</strong> (sample real traffic, grade asynchronously with your judge, alert on score decay), and <strong>anomaly flags</strong> (output length distributions, refusal rates, tool-call patterns). Wire thumbs-downs straight into the golden-set candidate queue and the loop closes: <em>production feeds evals, evals gate changes, changes improve production.</em></p>
<div class="callout"><strong>Track complete — you now hold the full stack:</strong> disciplined model calls, real RAG, prompts-as-code, agents with guardrails, evals as CI, and production operations. The "Build a Tiny RAG Assistant" and "Run a Mini Eval" projects turn this into demonstrable artifacts — and fruit on the tree. Build them; Karpathy's law applies: you understand what you create.</div>`,
            takeaways: [
              'Cost levers in ROI order: model routing, prompt caching, context discipline, output caps.',
              'Stream for perceived speed; hedge for tail latency; degrade gracefully — AI must never be the single point of failure.',
              'AI rots silently: monitor acceptance rates and online spot-evals; feed production failures back into the golden set.',
            ],
            quote: {
              text: 'The goal of production AI engineering is to make the most exciting technology of the decade completely boring by 2 a.m.',
              by: 'SRE wisdom, LLM edition',
              role: 'Boring is the compliment',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'A process always runs the same three steps: classify the email, extract fields, draft a reply. Agent or workflow?',
              options: [
                'Agent — agents are more modern',
                'Workflow — the steps are known and fixed; chain the calls in code. Agents are for open-ended paths where the model must decide what to do next',
                'Agent — it can adapt if the email is unusual',
                'Neither can handle three steps',
              ],
              answer: 1,
              explain: 'Use a workflow when you know the steps, an agent when you can\'t. Fixed sequences chained in code are cheaper, faster and more debuggable. Agents bought where workflows suffice is the era\'s costliest architecture mistake.',
            },
            {
              q: 'Why must an agent that reads untrusted external content (web, email, docs) not hold unsupervised write access?',
              options: [
                'Write operations are too slow for agent loops',
                'Prompt injection: adversarial instructions embedded in the content can steer the agent into harmful actions — defenses are layered and incomplete',
                'It would consume too many tokens',
                'Compliance forbids agents from writing',
              ],
              answer: 1,
              explain: 'Any text the agent reads can carry adversarial instructions. Delimiting, allowlists and monitoring help, but the bedrock rule is: untrusted input + sensitive action = human approval in between.',
            },
            {
              q: 'What makes an LLM-as-judge trustworthy?',
              options: [
                'Using the largest available model as the judge',
                'Calibration: grade a sample yourself, measure human-judge agreement, iterate the judging prompt until agreement is high — then keep auditing',
                'Running the judge at temperature 0',
                'Judges are inherently reliable',
              ],
              answer: 1,
              explain: 'An uncalibrated judge is noise with gravitas. Calibrate against human grading, measure agreement, and keep spot-auditing — then its scores can gate merges.',
            },
            {
              q: 'Token costs spiked 4× this month. Which lever typically offers the biggest first win?',
              options: [
                'Renegotiating the provider contract',
                'Model routing: classify request difficulty and send the easy majority to a far cheaper model — certified safe by your eval suite',
                'Truncating all outputs to 50 tokens',
                'Disabling streaming',
              ],
              answer: 1,
              explain: 'Most traffic is easy traffic. Routing the easy 80% to a 10–20× cheaper model — with evals certifying quality — is usually the largest, safest cost win, followed by caching and context discipline.',
            },
          ],
        },
      },
    ],
  },
];
