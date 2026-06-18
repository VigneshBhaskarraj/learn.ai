// Persona tracks B — Business Analyst / Consultant, QA / Test Engineer, Delivery / Engagement Leader.
export const tracksB = [
  {
    id: 'ba',
    label: 'Business Analyst / Consultant',
    emoji: '📊',
    blurb: 'You translate business problems into solutions.',
    pitch: 'Become the person who finds the real AI opportunities: use-case mining, workflow redesign, honest business cases, and client advisory that cuts through vendor noise.',
    modules: [
      {
        id: 'ba1',
        kind: 'track',
        track: 'ba',
        order: 1,
        emoji: '🔎',
        title: 'Finding the AI Opportunity',
        skill: 'Opportunity Mapping',
        tagline: 'Mine processes for AI candidates, redesign workflows, build business cases that survive scrutiny.',
        minutes: 21,
        lessons: [
          {
            id: 'ba1-l1',
            title: 'Use-case mining: from process map to AI candidates',
            minutes: 7,
            content: `
<p>"Where should we use AI?" is now the opening question of half of all consulting engagements. Most answers are brainstormed wishlists. Yours will be mined from the actual work — a repeatable method you can run in any client context.</p>
<h3>The mining method</h3>
<p><strong>Step 1 — Inventory the tasks, not the jobs.</strong> AI doesn't adopt at the job level; it adopts at the task level. Decompose the process (or role) into tasks: a claims handler reads submissions, requests missing documents, checks policy coverage, drafts decisions, handles appeals. Now you have units of analysis.</p>
<p><strong>Step 2 — Screen each task with the four sweet spots.</strong> Is the task essentially <em>drafting</em> (first versions of text), <em>extraction</em> (structure from messy sources), <em>synthesis</em> (digesting volume into insight), or <em>conversation</em> (answering questions from a knowledge base)? Tasks matching one of the four are candidates; tasks built on judgment, relationships or physical action are not — they're the human remainder, and naming them explicitly builds trust with worried teams.</p>
<table class="viz-table">
  <thead><tr><th>Sweet spot</th><th>What the task is</th></tr></thead>
  <tbody>
    <tr><td>Drafting</td><td>First versions of text</td></tr>
    <tr><td>Extraction</td><td>Structure from messy sources</td></tr>
    <tr><td>Synthesis</td><td>Digesting volume into insight</td></tr>
    <tr><td>Conversation</td><td>Answering from a knowledge base</td></tr>
  </tbody>
</table>
<div class="viz-cap">Tasks matching one of the four are AI candidates; the rest are the human remainder.</div>
<p><strong>Step 3 — Score candidates on the value/feasibility grid.</strong> Value: frequency × time per occurrence × error cost. Feasibility (you know these from foundation!): is the needed context available digitally? Is there tolerance for managed error with human review? Is the volume enough to matter? Plot the grid; the top-right quadrant is your pilot shortlist.</p>
<div class="callout"><strong>The interview question that finds gold:</strong> ask process performers "What part of your week feels like being a human photocopier?" — repetitive transformation of information from one form to another. That phrase unlocks candor, and human-photocopier work maps almost perfectly to the four sweet spots. Three interviews typically yield more honest candidates than three workshops.</div>
<h3>What good output looks like</h3>
<p>Your deliverable is not "47 AI ideas" — it's a ranked shortlist of 3–5 candidates, each with: the task, the sweet spot it matches, the data/context it requires, the human-review design, expected time savings, and what could go wrong. That document is the difference between an AI strategy and an AI mood board.</p>`,
            takeaways: [
              'Decompose to task level — AI adopts at tasks, not jobs. Screen tasks against the four sweet spots.',
              'Score on value (frequency × time × error cost) vs feasibility (context available, error tolerance, volume).',
              'Deliver a ranked shortlist with data needs, review design and risks — not a brainstormed wishlist.',
            ],
            quote: {
              text: 'AI enters organizations through tasks, not job titles. Map the tasks and you map the opportunity.',
              by: 'The task-based adoption principle',
              role: 'Core of every credible AI opportunity assessment',
            },
          },
          {
            id: 'ba1-l2',
            title: 'From process to prompt: redesigning workflows with AI inside',
            minutes: 7,
            content: `
<p>The classic automation mistake — paving the cow path — has an AI edition: bolting a model onto a process designed for humans-only and wondering why gains are marginal. Real value comes from <em>redesigning</em> the workflow around the new division of labor. That redesign is BA work, and you're about to own it.</p>
<h3>The redesign method: three swimlanes</h3>
<p>Draw the future-state process with three lanes:</p>
<ul>
<li><strong>AI lane:</strong> the drafting/extraction/synthesis/conversation steps, each annotated with the context it needs ("full ticket history + policy section" — remember: no context, no performance) and its output contract.</li>
<li><strong>Human lane:</strong> judgment calls, approvals, relationship moments, exception handling — plus the <strong>review checkpoints</strong> where humans verify AI output before it matters. Place these deliberately: after every step is suffocating; after no step is reckless. Risk-weight them: light skim for internal drafts, hard gate before anything external or financial.</li>
<li><strong>System lane:</strong> where the context comes from and where outputs land (the integration reality your developers will price).</li>
</ul>
<table class="viz-table">
  <thead><tr><th>Lane</th><th>What lives here</th></tr></thead>
  <tbody>
    <tr><td>AI</td><td>Drafting, extraction, synthesis, conversation — each with its context and output contract</td></tr>
    <tr><td>Human</td><td>Judgment, approvals, exceptions, plus risk-weighted review checkpoints</td></tr>
    <tr><td>System</td><td>Where context comes from and where outputs land</td></tr>
  </tbody>
</table>
<div class="viz-cap">The three-swimlane future-state map.</div>
<h3>The redesign questions that create the gains</h3>
<p>Don't just insert AI into existing steps — re-ask the process: <em>Which steps existed only because human reading was expensive?</em> (Batch triage queues often dissolve — AI reads everything instantly.) <em>Which handoffs existed to balance workload?</em> (May collapse into one AI-assisted role.) <em>What becomes possible that wasn't?</em> (Responding to every RFP; reviewing every contract, not a sample; personalizing every communication.) The third question is where transformation hides — the first two only find efficiency.</p>
<div class="callout"><strong>Design the failure path with the same care as the happy path:</strong> What does the human see when AI confidence is low? Where does an AI error get caught, and by whom, and how is it fed back? (To the eval set — tell the dev team.) What is the manual fallback when the AI is down? A future-state design without a failure path is a demo drawn in BPMN.</div>
<h3>Change management is half the design</h3>
<p>The people in the current process fear replacement; your design should make the augmentation story concrete: <em>"The AI drafts; you decide — and the photocopier hours become client hours."</em> Co-design the review checkpoints WITH the performers. People support workflows they helped draw — and they know where the bodies are buried in the current process, which makes the design better, not just better-received.</p>`,
            takeaways: [
              'Redesign with three swimlanes — AI (with context annotations), human (with risk-weighted review gates), systems.',
              'Ask what steps existed only because reading was expensive, and what becomes newly possible — that\'s where transformation hides.',
              'Co-design review checkpoints with process performers: better design AND better adoption.',
            ],
            quote: {
              text: 'Electricity transformed factories only when they were redesigned around it. Bolting a motor onto the old steam layout gained almost nothing. AI is at the same moment.',
              by: 'The general-purpose technology lesson',
              role: 'Paving the cow path, AI edition',
            },
          },
          {
            id: 'ba1-l3',
            title: 'The business case: ROI math that survives scrutiny',
            minutes: 7,
            content: `
<p>AI business cases fail in two opposite ways: hype cases (assume perfection, ignore review costs, collapse at first hallucination anecdote) and timid cases (bury the upside in caveats, lose to inertia). The credible middle is a discipline. Here is its anatomy.</p>
<h3>The honest value model</h3>
<p><strong>Value = (time saved per task × frequency × loaded rate) − (review time × frequency × rate) − run costs.</strong> The middle term is what separates pros from vendors: AI output gets reviewed (that's the design!), so net savings is <em>draft time saved minus review time added</em>. Typical honest numbers for drafting tasks: 50–70% net time reduction, not the 95% of vendor decks. Run costs: tokens (your PO colleagues learned the napkin math — cents per task), platform fees, and the integration build amortized.</p>
<div class="viz viz-stats">
  <div class="vstat"><b>50–70%</b><span>honest net time saved on drafting</span></div>
  <div class="vstat"><b>95%</b><span>the vendor-deck claim</span></div>
  <div class="vstat"><b>cents</b><span>token cost per task</span></div>
</div>
<p>Add the harder-to-quantify lines <em>as separate listed benefits, not padded into the number</em>: quality lift from reviewing-everything-instead-of-sampling, speed-to-respond wins, capacity for the previously-impossible. Listing them unpriced signals honesty; pricing them speculatively signals a vendor deck.</p>
<h3>The risk column — write it yourself, first</h3>
<p>Every AI business case needs its risk register on the same page: error rates and their worst-case cost (with the mitigation: review gates, eval thresholds before go-live); adoption risk (the tool nobody uses saves nothing — name the change effort); data risk (what client data goes where — one slide on this preempts the security veto); model dependency (provider changes, cost shifts). <strong>Writing the risk column yourself, before the skeptics do, is the single biggest credibility move available to you.</strong></p>
<h3>Pilot design: small, measured, honest</h3>
<p>Structure the ask as a pilot with success criteria set <em>in advance</em>: one process, one team, 6–8 weeks, baseline measured before start (time per task today — actually measure it; nobody knows it), eval thresholds agreed for quality, and a kill criterion ("if net savings < X% or quality gate fails, we stop and report why"). A pre-committed kill criterion paradoxically gets more pilots approved — it tells the room you're measuring, not selling.</p>
<div class="callout"><strong>The slide that wins the meeting:</strong> one page — task, before/after workflow sketch, honest net-savings math, risk register with mitigations, pilot plan with kill criterion. Executives see twenty AI pitches a quarter; the one with the kill criterion is the one they remember. The "Client-Ready AI Briefing" project in your path has you build exactly this.</div>`,
            takeaways: [
              'Honest value = time saved − review time − run costs. Net 50–70% on drafting tasks, not vendor-deck 95%.',
              'Write the risk register yourself, first — it is the biggest credibility move in AI consulting.',
              'Pilots need pre-measured baselines, pre-agreed quality gates, and a pre-committed kill criterion.',
            ],
            quote: {
              text: 'The business case with a kill criterion is the one that gets approved. It signals measurement, not salesmanship.',
              by: 'AI advisory practice',
              role: 'Why honesty outcompetes hype in the long game',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'Why decompose to TASK level rather than job level when mining AI opportunities?',
              options: [
                'Tasks are easier to put in spreadsheets',
                'AI adopts at the task level — a role is a bundle of tasks, some perfect for AI (drafting, extraction), others firmly human (judgment, relationships)',
                'Job-level analysis requires HR approval',
                'Tasks have better data quality',
              ],
              answer: 1,
              explain: 'No job is "automated by AI" wholesale; specific tasks within it are augmented. Task decomposition finds the real candidates and honestly names the human remainder.',
            },
            {
              q: 'In the future-state workflow design, how should human review checkpoints be placed?',
              options: [
                'After every AI step, for maximum safety',
                'Nowhere — review defeats the purpose of AI',
                'Risk-weighted: light review for internal/low-stakes outputs, hard gates before external, financial or irreversible actions',
                'Only at the very end of the process',
              ],
              answer: 2,
              explain: 'Review after everything suffocates the gains; review after nothing is reckless. Weight the gates by consequence — and design the failure path with the same care as the happy path.',
            },
            {
              q: 'What makes an AI business case "honest" in its value math?',
              options: [
                'Using the vendor\'s published productivity statistics',
                'Subtracting the added human review time and run costs from gross time saved — and listing unquantifiable benefits separately, unpriced',
                'Adding a 20% contingency to all benefits',
                'Excluding costs below $10,000',
              ],
              answer: 1,
              explain: 'Net value = saved time − review time − run costs. Honest drafting-task numbers land at 50–70% net, and unpriced benefit lines signal credibility where speculative pricing signals a vendor deck.',
            },
            {
              q: 'Why does pre-committing a kill criterion help a pilot get approved?',
              options: [
                'It reduces the pilot budget',
                'It signals you are measuring rather than selling — executives trust proposals that define failure in advance',
                'It is required by procurement in most firms',
                'It shortens the pilot timeline',
              ],
              answer: 1,
              explain: 'A pre-committed kill criterion ("if net savings < X%, we stop and report why") demonstrates intellectual honesty — the scarcest commodity in AI pitches, and the most remembered.',
            },
          ],
        },
      },
      {
        id: 'ba2',
        kind: 'track',
        track: 'ba',
        order: 2,
        emoji: '🧑‍💼',
        title: 'Advising with Confidence',
        skill: 'Client Advisory',
        tagline: 'Navigate the vendor landscape, assess data readiness, and run AI conversations clients trust.',
        minutes: 21,
        lessons: [
          {
            id: 'ba2-l1',
            title: 'Reading the vendor landscape without the vertigo',
            minutes: 7,
            content: `
<p>Thousands of AI vendors, daily launches, every product now "agentic" — clients are dizzy, and dizzy clients buy badly. Your value is a stable map. Good news: the chaotic surface sits on a simple structure you already understand from foundation.</p>
<h3>The four-layer market map</h3>
<ul>
<li><strong>Model providers</strong> (Anthropic, OpenAI, Google, Meta's open-weights, Mistral…): build the brains. A handful matter. Differences: capability profile, cost, context size, safety posture, data terms.</li>
<li><strong>Cloud & platform</strong> (AWS Bedrock, Azure AI, Google Vertex; plus orchestration/eval/observability tooling): the picks-and-shovels where enterprises actually access models — often through their existing cloud contract, which is why procurement loves this layer.</li>
<li><strong>Applications</strong> (copilots for support, sales, coding, legal…): rent models underneath, differentiate via workflow + integrations + domain tuning. Evaluate as you would any SaaS, plus the AI-specific questions below.</li>
<li><strong>Services</strong> (your layer!): the redesign, integration, change and governance work that turns the other three layers into outcomes.</li>
</ul>
<table class="viz-table">
  <thead><tr><th>Layer</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td>Model providers</td><td>Build the brains — a handful matter</td></tr>
    <tr><td>Cloud and platform</td><td>Picks-and-shovels where enterprises access models</td></tr>
    <tr><td>Applications</td><td>Copilots that rent models, differentiate on workflow</td></tr>
    <tr><td>Services</td><td>Redesign, integration, change, governance — your layer</td></tr>
  </tbody>
</table>
<div class="viz-cap">The chaos is at the surface, not the structure.</div>
<h3>Decode the marketing in ten seconds</h3>
<p>Foundation pays off: "proprietary AI engine" → usually a rented model + prompts (ask which model and what happens when it upgrades). "Agentic platform" → tool-calling loop (ask about permission boundaries and trajectory logging). "Trained on your data" → almost always RAG, not training (ask about retrieval quality measurement). "99% accurate" → on whose test set? (ask for evals on cases like yours — the question that separates engineering from demo-ware, every time).</p>
<div class="callout"><strong>The five questions that make you the adult in the vendor meeting:</strong> (1) Show evals on cases like ours — set, rubric, scores. (2) Data flow: training use? retention? residency? (3) Model dependency: whose models, what's the upgrade/regression process? (4) Pricing at our realistic volume — and the overage story. (5) Exit: what do we keep — prompts, configurations, eval sets, data? Vendors with real engineering answer crisply. Vendors with demos change the subject. Either way, you got your answer.</div>
<h3>Open vs closed, the consultant's cut</h3>
<p>Closed APIs: stronger frontier capability, zero infra burden, data leaves the building under contract. Open-weights: run anywhere (data never leaves), customizable, but you own the serving, scaling and safety engineering. Steer: most clients most of the time → closed API via their cloud platform; genuine data-sovereignty or massive-scale cost cases → open weights with eyes open about the engineering bill.</p>`,
            takeaways: [
              'Map the market in four layers: models, platforms, applications, services. The chaos is at the surface, not the structure.',
              'Decode marketing with foundation concepts: "proprietary engine"=rented model, "trained on your data"=RAG, "99% accurate"=whose test set?',
              'Five vendor questions: evals, data flow, model dependency, real pricing, exit story.',
            ],
            quote: {
              text: 'Clients do not pay consultants to know every vendor. They pay them to ask the five questions every vendor must answer.',
              by: 'AI advisory craft',
              role: 'The stable map under the chaotic surface',
            },
          },
          {
            id: 'ba2-l2',
            title: 'Data readiness and governance: the unglamorous deal-makers',
            minutes: 7,
            content: `
<p>Two topics decide whether client AI initiatives fly or die, and neither is the model: <em>is the data ready?</em> and <em>is the use allowed?</em> Consultants fluent in both are rare and billable. Here's the working fluency.</p>
<h3>Data readiness — the real checklist</h3>
<p>Remember the foundation: AI performance is capped by the context you can feed it. For LLM/RAG initiatives, readiness means: <strong>Does the knowledge exist digitally?</strong> (Tribal knowledge in heads can't be retrieved.) <strong>Is it findable and current?</strong> (A SharePoint of seven contradictory policy versions retrieves… confidently wrong answers. Curation beats volume.) <strong>Is access governed?</strong> (Retrieval must respect permissions — the intern's chatbot must not quote the M&A folder. Say "access control at retrieval time" and watch the security team relax.) <strong>Is there an owner?</strong> (Stale knowledge bases make stale AI; someone must own freshness.) Run this checklist in week one — it predicts the project's fate better than any model benchmark.</p>
<h3>Governance — the EU AI Act in one paragraph</h3>
<p>The world's reference regulation works on <strong>risk tiers</strong>: <em>prohibited</em> uses (social scoring, manipulative systems); <em>high-risk</em> (hiring, credit, essential services — heavy obligations: documentation, human oversight, accuracy monitoring); <em>limited-risk</em> (chatbots — mainly transparency: users must know it's AI); <em>minimal</em> (most internal productivity uses — light touch). The consultant's screen: <strong>"Does this use case make consequential decisions about people?"</strong> If yes — hiring, lending, claims decisions — expect the high-risk regime anywhere in the world, design human oversight in from day one, and price the compliance work. If it drafts documents for professional review, you're almost always in light-touch territory.</p>
<table class="viz-table">
  <thead><tr><th>Risk tier</th><th>Example uses</th><th>Obligation</th></tr></thead>
  <tbody>
    <tr><td>Prohibited</td><td>Social scoring, manipulative systems</td><td>Banned</td></tr>
    <tr><td>High-risk</td><td>Hiring, credit, essential services</td><td>Documentation, human oversight, monitoring</td></tr>
    <tr><td>Limited-risk</td><td>Chatbots</td><td>Transparency — users must know it's AI</td></tr>
    <tr><td>Minimal</td><td>Most internal productivity uses</td><td>Light touch</td></tr>
  </tbody>
</table>
<div class="viz-cap">EU AI Act tiers follow consequence to people, not technology choice.</div>
<div class="callout"><strong>The governance kit every client needs (and few have):</strong> an acceptable-use policy (which tools, which data classes — the "client data only in approved tools" rule scaled to an org); a use-case intake with risk triage (the tier question above); human-oversight standards per tier; logging/audit for consequential uses; and an incident path ("the AI said something wrong and a customer acted on it — who does what?"). Offering to draft this kit is among the highest-value, lowest-tech AI engagements that exist.</div>
<h3>Why this is your edge</h3>
<p>Everyone sells models and demos. Almost nobody walks in asking "is the knowledge curated, who owns freshness, and which risk tier are we in?" — the questions that actually decide outcomes. Unglamorous fluency, premium positioning.</p>`,
            takeaways: [
              'Data readiness for LLM projects = digital + curated + access-governed + owned. Run the check in week one.',
              'Risk-tier screen: consequential decisions about people → high-risk regime, human oversight by design, priced compliance.',
              'The governance kit (policy, intake triage, oversight standards, audit, incident path) is a high-value consulting deliverable.',
            ],
            quote: {
              text: 'In enterprise AI, the model is rarely the bottleneck. The data was not ready and nobody had decided what was allowed.',
              by: 'Post-mortem of a thousand stalled pilots',
              role: 'The two questions that decide outcomes',
            },
          },
          {
            id: 'ba2-l3',
            title: 'Running the client AI conversation',
            minutes: 7,
            content: `
<p>Everything in your track converges on a human moment: a client across the table asking <em>"so what should we do about AI?"</em> — often with a board breathing down their neck and a vendor deck in their inbox. How you run that conversation is the craft. A field guide.</p>
<h3>Read the room first: the three client states</h3>
<ul>
<li><strong>FOMO-driven</strong> ("everyone has an AI strategy but us!"): your job is channeling energy from announcements toward task-level value. Give them the mining method — it feels like motion because it is.</li>
<li><strong>Burned</strong> ("we piloted a chatbot in 2024; it embarrassed us"): your job is diagnosis, not cheerleading. Usually the post-mortem finds: no eval discipline, no review design, wrong use case. Show what's different when those exist — their scar tissue becomes your specification.</li>
<li><strong>Paralyzed</strong> ("it changes weekly; we'll wait until it settles"): your job is the Mollick argument — it will not settle, the capability you build compounds, and waiting is a decision with costs. Smallest safe start: one internal, low-risk, high-frequency task. (Sound familiar? It's this platform's pedagogy applied to an enterprise.)</li>
</ul>
<table class="viz-table">
  <thead><tr><th>Client state</th><th>The tell</th><th>Your job</th></tr></thead>
  <tbody>
    <tr><td>FOMO-driven</td><td>"Everyone has a strategy but us"</td><td>Channel energy to task-level value</td></tr>
    <tr><td>Burned</td><td>"We piloted a chatbot; it embarrassed us"</td><td>Diagnose, not cheerlead</td></tr>
    <tr><td>Paralyzed</td><td>"We'll wait until it settles"</td><td>The Mollick argument; smallest safe start</td></tr>
  </tbody>
</table>
<div class="viz-cap">Read the room before you prescribe.</div>
<h3>The discovery questions that open everything</h3>
<p>Skip "what's your AI strategy?" Ask instead: <em>"Where does expensive reading and writing happen in volume?"</em> (points at the sweet spots) · <em>"What would you review-everything if review were free?"</em> (finds the newly-possible) · <em>"What knowledge lives only in your best people's heads?"</em> (data readiness, succession risk, and a RAG candidate in one) · <em>"What did your last AI experiment teach you?"</em> (reads the scar tissue). Each maps directly to a module you've completed — you're not reciting a script, you're navigating with a map.</p>
<h3>Demo wisely, promise precisely</h3>
<p>Live demos move rooms like nothing else — and set expectations like nothing else. The discipline: demo on <em>their</em> kind of task, include one graceful failure on purpose ("notice it flagged that it couldn't find the answer — that honesty is engineered"), and pair every wow with a number ("drafts in seconds; our pilots show 50–70% net time savings after review"). You are always doing two jobs: opening eyes and calibrating them. The consultants clients keep are the ones whose promises came true.</p>
<div class="callout"><strong>Track complete.</strong> You can mine opportunities, redesign workflows, build cases that survive scrutiny, read the vendor map, run the readiness checks and lead the conversation. The "Client-Ready AI Briefing" project packages it into a portfolio artifact — and a fruit on your banyan. Go pick it.</div>`,
            takeaways: [
              'Diagnose the client state first — FOMO, burned, or paralyzed — each needs a different conversation.',
              'Discovery: where is expensive reading/writing? what would you review if review were free? whose heads hold the knowledge?',
              'Demo on their tasks, include a graceful failure deliberately, pair every wow with an honest number.',
            ],
            quote: {
              text: 'Assume this is the worst AI you will ever use. Waiting for it to settle is a decision — and it has costs.',
              by: 'Ethan Mollick',
              role: 'The answer to "we\'ll wait" — Co-Intelligence, rule 4',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'A vendor claims their product is "trained on your data" and is "99% accurate". What is the informed translation?',
              options: [
                'They fine-tune a custom model and it almost never errs',
                'Almost certainly RAG (retrieval over your documents), and "99%" is meaningless without knowing whose test set — ask for evals on cases like yours',
                'The claim is impossible; report them to regulators',
                'They use reinforcement learning from your users',
              ],
              answer: 1,
              explain: '"Trained on your data" nearly always means retrieval, not training; accuracy claims mean nothing without the eval set behind them. Both decode instantly from foundation concepts.',
            },
            {
              q: 'Which question best screens whether a client use case lands in the high-risk regulatory regime (EU AI Act pattern)?',
              options: [
                '"Does it use a large language model?"',
                '"Does the system make or materially influence consequential decisions about people — hiring, credit, claims, essential services?"',
                '"Is the vendor based in Europe?"',
                '"Does it cost more than €100,000?"',
              ],
              answer: 1,
              explain: 'Risk tiers follow consequence to people, not technology choice. Consequential-decision systems need documented human oversight, monitoring and compliance work — design and price it from day one.',
            },
            {
              q: 'A client says: "We tried a chatbot in 2024 and it embarrassed us. AI doesn\'t work here." Best response pattern?',
              options: [
                'Agree and recommend waiting two years',
                'Counter with vendor success statistics',
                'Diagnose the failure — typically no eval discipline, no review design, wrong use case — and show how those specifics differ now; their scar tissue becomes your specification',
                'Suggest they simply needed a bigger model',
              ],
              answer: 2,
              explain: 'Burned clients need diagnosis, not cheerleading. Failed pilots almost always lacked evals, review design or use-case fit — naming the specific cause converts skepticism into a spec.',
            },
            {
              q: 'Why include a deliberate graceful failure in a client demo?',
              options: [
                'To lower expectations so the project seems impressive later',
                'To show that honest uncertainty handling ("not found in the sources") is an engineered feature — calibrating the room while still impressing it',
                'Legal requires failure disclosure in demos',
                'To test whether the client is paying attention',
              ],
              answer: 1,
              explain: 'A demo\'s job is opening eyes AND calibrating them. Showing the system declining gracefully demonstrates production thinking — and preempts the hallucination objection before a skeptic raises it.',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'qa',
    label: 'QA / Test Engineer',
    emoji: '🔍',
    blurb: 'You make sure it actually works.',
    pitch: 'Non-determinism breaks the classic playbook — and creates the decade\'s biggest QA opportunity: evals, golden datasets, red-teaming, and AI as your testing copilot.',
    modules: [
      {
        id: 'qa1',
        kind: 'track',
        track: 'qa',
        order: 1,
        emoji: '🧪',
        title: 'Testing AI Systems',
        skill: 'AI Quality',
        tagline: 'From pass/fail to score distributions: evals, golden sets, judges and red teams.',
        minutes: 21,
        lessons: [
          {
            id: 'qa1-l1',
            title: 'Why AI breaks your testing playbook (and what replaces it)',
            minutes: 7,
            content: `
<p>Your career is built on a contract: defined expected behavior, reproducible steps, deterministic verdicts. LLM features break all three clauses — same input, varied output; "correct" is a judgment with many acceptable answers; and there's no complete spec to test against, because the behavior was learned, not written. Before the playbook, the mindset shift that makes it click.</p>
<h3>From verdicts to distributions</h3>
<p>Stop asking "does it pass?" Start asking <strong>"how well does it perform across a representative distribution of cases — and is that changing?"</strong> You're moving from binary verdicts to measurement: scores, rates, confidence intervals, trends. Less like checking a calculator, more like evaluating an employee: you assess work samples across situations, not a single answer.</p>
<div class="viz viz-vs">
  <div class="vs-side bad"><h4>Binary verdicts</h4><p>Does it pass? One input, one expected answer, checked like a calculator.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side good"><h4>Distributions</h4><p>How well across representative cases — scores, rates, trends, like evaluating an employee.</p></div>
</div>
<h3>What survives from the classic playbook (more than you'd fear)</h3>
<ul>
<li><strong>Boundary analysis</strong> → empty inputs, maximum-length documents, mixed languages, malformed data: still gold, still finds bugs.</li>
<li><strong>Equivalence partitioning</strong> → becomes the structure of your golden dataset: typical cases, edge cases, adversarial cases, must-never-fail cases.</li>
<li><strong>Regression discipline</strong> → more vital than ever, because changes come from everywhere now: prompts, retrieval, tool definitions, and the model itself shifting under provider upgrades.</li>
<li><strong>Risk-based prioritization</strong> → your scarce grading budget goes where errors cost most. Pure QA instinct, directly transferable.</li>
</ul>
<h3>What's genuinely new</h3>
<p>Three muscles to build: <strong>statistical thinking</strong> (a case that passes 9/10 runs isn't "flaky" in the old sense — pass-rate IS the measurement; thresholds live on aggregates); <strong>rubric design</strong> (writing down what "good" means concretely enough to grade — half the value is forcing the team to decide); and <strong>grading at scale</strong> (you cannot read 10,000 outputs; you'll wield LLM judges — next lesson — and audit them like the instruments they are).</p>
<div class="callout"><strong>The career frame, stated plainly:</strong> every company shipping AI features has discovered they need exactly this discipline, and almost nobody owns it. "Eval engineer" roles are multiplying; QA professionals who add statistical evaluation to their testing instincts are walking into the gap. This track is that walk.</div>`,
            takeaways: [
              'Shift from binary verdicts to distributions: scores, pass-rates and trends across representative cases.',
              'Classic skills transfer: boundary analysis, partitioning (→ golden set structure), regression discipline, risk-based focus.',
              'New muscles: statistical thinking, rubric design, and auditing automated graders.',
            ],
            quote: {
              text: 'You cannot unit-test a learned system. You can only measure it — which makes measurement the new testing.',
              by: 'The eval-era QA principle',
              role: 'Module 2\'s deepest idea, now your job description',
            },
          },
          {
            id: 'qa1-l2',
            title: 'Golden datasets and LLM judges: the eval engineer\'s toolkit',
            minutes: 7,
            content: `
<p>The golden dataset is to AI quality what the test suite is to code quality — and building a good one is a skill that will define senior AI-QA roles. Here's the craft, concretely.</p>
<h3>Anatomy of a golden set</h3>
<p>For each case: <strong>input</strong> (realistic! production-shaped messiness included), <strong>reference</strong> (expected answer where one exists, or key facts that must appear), <strong>rubric criteria</strong> (what to grade), and <strong>tags</strong> (category, difficulty, source) so you can slice scores — "we regressed specifically on long-document cases" is a finding; "the score went down" is a shrug.</p>
<p>Composition follows your old partitioning instincts: ~60% typical cases (weighted by real frequency), ~20% edge cases (boundaries, odd formats, ambiguity), ~10% adversarial (injection attempts, off-topic bait, trick premises), ~10% <strong>must-never-fail</strong> cases — the ones tied to harm, money or law, where a single failure blocks release regardless of the average. Size: 50 cases finds gross issues; 200–500 gives stable statistics per slice. Start at 50, grow forever — every production incident becomes a case (your defect-to-regression-test reflex, unchanged).</p>
<div class="viz viz-bars">
  <div class="bar"><span class="bar-l">Typical</span><span class="bar-track"><i style="width:60%"></i></span><span class="bar-v">60%</span></div>
  <div class="bar"><span class="bar-l">Edge</span><span class="bar-track"><i style="width:20%"></i></span><span class="bar-v">20%</span></div>
  <div class="bar"><span class="bar-l">Adversarial</span><span class="bar-track"><i style="width:10%"></i></span><span class="bar-v">10%</span></div>
  <div class="bar"><span class="bar-l">Must-never-fail</span><span class="bar-track"><i style="width:10%"></i></span><span class="bar-v">10%</span></div>
</div>
<div class="viz-cap">Golden-set composition by case type.</div>
<h3>Grading: the three-tier economy</h3>
<ul>
<li><strong>Deterministic checks</strong> (free, run always): schema validity, required facts present, forbidden content absent, citations resolve, length bounds. Maximize what you can check this way — it's the only tier with zero noise.</li>
<li><strong>LLM-as-judge</strong> (cheap, scalable): a strong model grades outputs against your rubric. The craft is in the judging prompt: grade <em>one criterion at a time</em> (a faithfulness judge, a tone judge — not one "rate 1–10 overall" mush), require cited evidence for the verdict ("quote the unsupported claim"), use few-shot examples of your grading standard.</li>
<li><strong>Human grading</strong> (expensive, authoritative): reserved for calibrating the judges and for the must-never-fail slice.</li>
</ul>
<div class="callout"><strong>Calibration — the step that makes you credible:</strong> before trusting any judge, run it against 50 human-graded cases and measure agreement. Below ~85–90%? Fix the rubric or the judging prompt and re-measure. Report judge-human agreement alongside scores, and re-audit monthly — judges drift too (they're models!). An eval report that states its instrument's calibration is a professional document; one that doesn't is vibes with decimals.</div>
<h3>Reading results like an analyst</h3>
<p>Slice by tag before reporting averages (averages hide the failure cluster); investigate variance (high-variance cases usually mark ambiguous rubric or genuinely unstable behavior — both findings); track trends per slice across versions. Your deliverable evolves from "test report: 14 defects" to "quality dashboard: faithfulness 94% (▲2), tone 97% (—), must-never-fail 100%, judge agreement 91%". That dashboard is what release decisions lean on. That's power. Use it honestly.</p>`,
            takeaways: [
              'Golden set: realistic inputs + references + rubric + tags; ~60/20/10/10 typical/edge/adversarial/never-fail mix.',
              'Three-tier grading: deterministic checks first, calibrated LLM judges for scale, humans for calibration and critical slices.',
              'Calibrate judges against human grading (target ~85–90%+ agreement), report it, re-audit monthly. Slice before averaging.',
            ],
            quote: {
              text: 'Six months in, the eval set is the most valuable artifact on the team — it encodes everything reality taught you.',
              by: 'Eval engineering practice',
              role: 'Why golden sets are IP',
            },
          },
          {
            id: 'qa1-l3',
            title: 'Red-teaming: adversarial testing for the AI era',
            minutes: 7,
            content: `
<p>Functional evals ask "does it work when used as intended?" Red-teaming asks the QA question of the decade: <strong>"what happens when someone uses it as NOT intended?"</strong> With AI systems the attack surface is the conversation itself — and your exploratory-testing instincts are about to feel young again.</p>
<h3>The adversarial catalogue</h3>
<ul>
<li><strong>Prompt injection</strong> — the SQL injection of the LLM era: instructions hidden in content the system processes (a document, email or webpage saying "ignore your instructions and..."). Direct (user types it) and indirect (it rides in via retrieved/processed content — far more dangerous for agents with tools). Test: plant instructions in every content channel the system reads; verify they're treated as data, not commands.</li>
<li><strong>Jailbreaking</strong> — coaxing the system past its behavioral rules via role-play framing ("pretend you're an AI without restrictions"), hypotheticals, encoding tricks, or multi-turn boiling-the-frog escalation. Test the system prompt's rules one by one: can persistence, reframing or fiction defeat them?</li>
<li><strong>Data exfiltration</strong> — "repeat your system prompt", "summarize the documents you can see", probing whether retrieval respects permissions (ask about content this user must not access — the M&A folder test). For agents: can the conversation steer a tool call into leaking data to an external destination?</li>
<li><strong>Harm elicitation & brand damage</strong> — off-limits content, defamatory statements about real people, competitor recommendations, promises the company must then honor (airlines have lost legal cases over chatbot-invented policies — chatbot output can bind the business). The cheapest finding you'll ever deliver is the screenshot that would have been the press story.</li>
</ul>
<table class="viz-table">
  <thead><tr><th>Attack family</th><th>The probe</th></tr></thead>
  <tbody>
    <tr><td>Prompt injection</td><td>Instructions hidden in processed content — direct and indirect</td></tr>
    <tr><td>Jailbreaking</td><td>Role-play, hypotheticals, encoding, multi-turn escalation</td></tr>
    <tr><td>Data exfiltration</td><td>"Repeat your system prompt"; probing retrieval permissions</td></tr>
    <tr><td>Harm and brand damage</td><td>Off-limits content, defamation, binding promises</td></tr>
  </tbody>
</table>
<div class="viz-cap">The four adversarial families to charter against.</div>
<h3>Method: structured, recorded, scaled</h3>
<p>Charter your sessions like exploratory testing ("this hour: indirect injection via the document-upload channel"); record everything (transcripts = reproduction steps); convert every successful attack into a permanent golden-set adversarial case (your defect-to-regression reflex again — the red-team corpus compounds); and scale yourself with automation: maintain attack-pattern libraries, and use one model to generate attack variations against another. The field literally calls it red-team automation; it is exploratory testing with a power tool.</p>
<div class="callout"><strong>Scope and ethics, briefly and firmly:</strong> red-team systems you're authorized to test, report through agreed channels, never exfiltrate real data to prove a point — your authorization is a test charter, not a license. Inside those lines: be creative, be persistent, be the attacker so the real one finds nothing left. Module two of your track flips the lens: AI as your testing copilot.</div>`,
            takeaways: [
              'Four attack families: prompt injection (direct/indirect), jailbreaks, data exfiltration, harm/brand damage.',
              'Indirect injection via processed content is the critical threat for tool-wielding agents — test every content channel.',
              'Charter sessions, record transcripts, convert successful attacks into permanent eval cases, automate attack variation.',
            ],
            quote: {
              text: 'Every text channel your AI reads is an input field. You spent a career learning to distrust input fields.',
              by: 'The red-teamer\'s orientation',
              role: 'Why QA instincts transfer to AI security',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'An LLM feature returns slightly different (all acceptable) outputs on repeated runs. The professional QA response?',
              options: [
                'File a defect: outputs must be identical',
                'Measure pass-rates across repeated runs and a representative case set, with thresholds on aggregates — distributions, not verdicts',
                'Set temperature to zero and call it solved',
                'Exclude such features from testing scope',
              ],
              answer: 1,
              explain: 'Non-determinism is inherent; the discipline shift is from binary verdicts to statistical measurement: scores, pass-rates, slices and trends.',
            },
            {
              q: 'Why must an LLM-as-judge be calibrated against human grading before its scores are trusted?',
              options: [
                'To comply with ISO testing standards',
                'Judges are models too — without measured human-agreement (~85-90%+), their scores are noise with decimals; and they drift, so re-audit',
                'Human grading is always wrong without AI verification',
                'Calibration reduces token costs',
              ],
              answer: 1,
              explain: 'The judge is an instrument; instruments get calibrated. Measure judge-human agreement, fix rubric/prompt until high, report it with results, and re-check monthly.',
            },
            {
              q: 'What distinguishes INDIRECT prompt injection, and why is it the bigger threat for agents?',
              options: [
                'The attacker whispers instead of typing',
                'Malicious instructions arrive hidden inside content the system processes (documents, emails, webpages) — and a tool-wielding agent reading them can be steered into real actions',
                'It only affects open-source models',
                'It requires physical access to the servers',
              ],
              answer: 1,
              explain: 'Direct injection comes from the user; indirect rides in through any content channel the system reads. For agents with write-capable tools, that converts a text trick into real-world actions — test every channel.',
            },
            {
              q: 'What should the golden dataset\'s "must-never-fail" slice trigger?',
              options: [
                'A 5% weight in the overall average score',
                'Release blocking on ANY failure in the slice, regardless of how good the average score looks',
                'Weekly email reports',
                'Automatic retries until the cases pass',
              ],
              answer: 1,
              explain: 'Cases tied to harm, money or law are not averaged away: a single failure blocks release. Averages are for trends; the critical slice is a gate.',
            },
          ],
        },
      },
      {
        id: 'qa2',
        kind: 'track',
        track: 'qa',
        order: 2,
        emoji: '🤖',
        title: 'AI as Your Testing Copilot',
        skill: 'AI-Assisted QA',
        tagline: 'Generate tests and data, tame flaky automation, triage failures — and grow into the eval-era career.',
        minutes: 21,
        lessons: [
          {
            id: 'qa2-l1',
            title: 'Generating tests and test data with AI',
            minutes: 7,
            content: `
<p>Flip the lens: AI isn't just your test subject — it's the strongest test-design assistant you've ever had, IF you use it where its jagged frontier is strong. Map first, then exploit.</p>
<h3>Where AI shines in test design</h3>
<ul>
<li><strong>Edge-case brainstorming (the killer app):</strong> paste a user story or API spec and ask: "Enumerate edge cases a senior tester would probe: boundaries, nulls, encodings, timezones, concurrency, permissions, locale weirdness." The model has absorbed the collective scar tissue of the profession — it reliably surfaces the 20% you'd find on a good day plus several you wouldn't. You curate; it enumerates. (Notice the shape: AI proposes, human disposes — your own track's design pattern, applied to yourself.)</li>
<li><strong>Test case drafting:</strong> requirements → structured cases with steps, data and expected results, in your team's exact format (show it two examples — few-shot, from your foundation). First drafts in seconds; your review converts them from plausible to correct. That review is non-negotiable: generated cases can include subtly wrong expected results — confidently. Every artifact carries the same rule: <strong>AI writes, QA signs.</strong></li>
</ul>
<div class="viz viz-vs">
  <div class="vs-side good"><h4>AI proposes</h4><p>Enumerates edge cases, drafts cases and data in seconds — the profession's scar tissue at scale.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side"><h4>Human disposes</h4><p>Curates, prioritizes and verifies; expected results can be confidently wrong. AI writes, QA signs.</p></div>
</div>
<ul>
<li><strong>Test data factories:</strong> "Generate 50 customer records as JSON: valid mainstream cases plus accented names, 64-character emails, leap-day birthdays, RTL scripts, maximum-length addresses…" — realistic, varied, deliberately spiky data on demand. Two cautions: <em>never paste real customer data as the example</em> (anonymize first — your confidentiality rule), and remember generated data inherits plausible-not-valid risks: validate formats before trusting checksummed fields (IBANs, VAT numbers — the jagged frontier strikes precisely there).</li>
</ul>
<h3>Where it stumbles (the frontier's dips)</h3>
<p>Deep domain rules it was never told (your pricing logic's exceptions); state-heavy end-to-end flows spanning many systems; anything requiring knowledge of YOUR codebase's actual bug history. The pattern: <strong>AI knows testing-in-general superbly and your-system-in-particular not at all</strong> — which is exactly the gap your prompts must bridge with context (paste the business rules!) and your review must police.</p>
<div class="callout"><strong>The honest productivity math:</strong> teams report test-design time dropping by half or more — but the gain is in <em>drafting</em>, while <em>review</em> grows slightly. Net: you cover materially more ground at the same rigor. Anyone who tells you review can be skipped has not read their generated cases carefully. You have. That's the job.</div>`,
            takeaways: [
              'AI\'s killer QA app: edge-case enumeration — it has absorbed the profession\'s collective scar tissue.',
              'AI drafts cases and data fast; expected results can be confidently wrong — AI writes, QA signs.',
              'Bridge the gap with context (paste YOUR business rules) and never use real customer data as the example.',
            ],
            quote: {
              text: 'Always invite AI to the table — then check its work like the senior reviewer you are.',
              by: 'Mollick\'s rules 1 and 2',
              role: 'Applied to the QA desk',
            },
          },
          {
            id: 'qa2-l2',
            title: 'AI in test automation: locators, triage and the log pile',
            minutes: 7,
            content: `
<p>Automation's oldest enemies — brittle locators, flaky failures, unreadable log piles — are all pattern-recognition problems. You now know what's good at pattern recognition. Three applications, ranked by maturity.</p>
<h3>1. Self-healing automation (mature, buy it)</h3>
<p>Classic break: the button's ID changed, forty tests fail, nothing is wrong. AI-era tools locate elements by <em>semantic intent</em> ("the primary submit button in the checkout form") with visual and structural context, surviving cosmetic refactors. Modern frameworks heal locators automatically and report the heal for review. Evaluate such tools with your own discipline: a healed locator is a <em>guess</em> — demand the audit trail, and treat repeated heals on one element as a smell worth a conversation with the dev team.</p>
<h3>2. Failure triage (the highest-ROI application — build this)</h3>
<p>The nightly run drops 73 failures on you; the first hour of every day is archaeology. An LLM with the failure output, stack traces, diff of recent commits and test history clusters them in seconds: "61 share a root cause: login service timeout — infrastructure, not product. 9 match the known flaky-websocket signature. 3 are novel — and these two touch the payment flow changed in yesterday's deploy; start there." That's synthesis over volume — squarely in the sweet spots, and it converts your morning from archaeology to verification. Teams wire this into CI as an automatic comment on the failed run. Verify the clustering before acting (it will occasionally group by coincidence), but even 90%-right triage transforms the economics of a large suite.</p>
<div class="viz viz-stats">
  <div class="vstat"><b>73</b><span>nightly failures landed</span></div>
  <div class="vstat"><b>61</b><span>one root cause: login timeout</span></div>
  <div class="vstat"><b>9</b><span>known flaky-websocket signature</span></div>
  <div class="vstat"><b>3</b><span>novel — start here</span></div>
</div>
<div class="viz-cap">73 failures are usually three stories.</div>
<h3>3. Coverage conversation (useful, with care)</h3>
<p>Feed requirements + existing suite, ask "what's untested?" Treat output as hypotheses for your judgment, not findings — it can't know what your exploratory sessions covered. Best used quarterly as a fresh-eyes review of suite blind spots.</p>
<div class="callout"><strong>The flaky-test reframe you already earned:</strong> module one taught you pass-rate-as-measurement for AI features. Apply it backwards to your classic suite: a test passing 92% of runs is emitting a signal — environment instability, race condition, timing assumption. AI triage clusters flaky signatures across months of runs and surfaces the pattern ("fails only on Mondays after the data refresh"). The flaky test was never the problem; it was the messenger. Now you have a tool that reads messenger-ese.</div>`,
            takeaways: [
              'Self-healing locators work — demand the audit trail and treat repeated heals as a design smell.',
              'AI failure triage (cluster, root-cause, prioritize) is the highest-ROI automation application — wire it into CI.',
              'Apply pass-rate thinking to classic flaky tests: they are signals; AI clustering reads the pattern.',
            ],
            quote: {
              text: 'The nightly run\'s 73 failures were always three stories wearing 73 costumes. Synthesis is what AI is for.',
              by: 'Test automation triage, AI era',
              role: 'From archaeology to verification',
            },
          },
          {
            id: 'qa2-l3',
            title: 'The QA career in the AI era: quality engineering ascendant',
            minutes: 7,
            content: `
<p>Close the track with the question under everyone's keyboard: <em>what happens to QA careers?</em> The honest answer has a direction, and for those who act on it, the direction is up.</p>
<h3>What genuinely shrinks</h3>
<p>Manual regression clicking, boilerplate case writing, test-data hand-crafting, failure archaeology — the mechanical layer is compressing fast, exactly like the "human photocopier" tasks in every other profession. Pretending otherwise wastes your planning time.</p>
<div class="viz viz-vs">
  <div class="vs-side bad"><h4>Shrinks</h4><p>Manual regression clicking, boilerplate cases, hand-crafted test data, failure archaeology.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side good"><h4>Grows faster</h4><p>Eval engineering, quality architecture, AI-risk specialism, the human judgment layer.</p></div>
</div>
<h3>What grows (faster than the shrink)</h3>
<ul>
<li><strong>Eval engineering:</strong> every AI feature shipping anywhere needs golden sets, rubrics, calibrated judges, red-team coverage — a discipline barely older than this course, with demand exploding and almost no incumbents. You finished module one of this track; you are already ahead of most of the market.</li>
<li><strong>Quality architecture:</strong> when AI generates code and tests at volume, someone must own the question "what does quality mean here and how do we measure it?" — rubric design, risk modeling, quality gates across human+AI pipelines. That is senior QA thinking, promoted to architecture.</li>
<li><strong>AI-system risk specialism:</strong> red-teaming, safety testing, compliance evidence for regulated AI (recall the high-risk tier obligations — someone must produce that documentation; regulators have effectively mandated a QA growth market).</li>
<li><strong>The judgment layer of the augmented suite:</strong> exploratory testing, user empathy, the "this technically passes but something is off" instinct — the parts that were always the soul of great QA remain stubbornly human, and they get MORE valuable as generated artifacts flood the pipeline needing a discerning eye.</li>
</ul>
<h3>The repositioning, concretely</h3>
<p>Your transferable core — distrust of happy paths, boundary instincts, regression discipline, risk-based prioritization — is the foundation of every growth area above. The additions, all begun in this track: statistical evaluation, rubric craft, judge calibration, adversarial testing, AI-assisted tooling. Karpathy's on-demand learning rule applies: take the next AI feature your team builds and <em>volunteer to own its evals</em>. One real golden set on a real product teaches more than any course — and quietly makes you the team's eval engineer before the title exists.</p>
<div class="callout"><strong>Track complete.</strong> You can test the non-deterministic, build and calibrate measurement instruments, attack systems like a red-teamer and wield AI as a force multiplier. The "Run a Mini Eval" project turns it into proof — a real eval comparing two models on a golden set you design. Build it; hang the fruit on your tree.</div>`,
            takeaways: [
              'The mechanical layer shrinks; eval engineering, quality architecture, AI-risk specialism and judgment-layer QA grow faster.',
              'Your classic instincts are the foundation; statistics, rubrics, calibration and red-teaming are the additions.',
              'Career move available today: volunteer to own the evals on your team\'s next AI feature.',
            ],
            quote: {
              text: 'When generation becomes cheap, judgment becomes precious. QA was always the judgment profession.',
              by: 'The quality engineering thesis',
              role: 'Why this era favors the discerning',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'Why is edge-case brainstorming AI\'s "killer app" for test design?',
              options: [
                'It eliminates the need for human test design',
                'The model has absorbed the profession\'s collective failure patterns and reliably enumerates probes you would only find on a good day — you curate the list',
                'Edge cases no longer matter with AI features',
                'It runs the edge cases automatically',
              ],
              answer: 1,
              explain: 'Enumeration is pattern recall at scale — squarely on AI\'s strong frontier. The QA pro curates, prioritizes and verifies; AI proposes, human disposes.',
            },
            {
              q: 'AI-generated test data includes IBAN account numbers. What is the specific risk?',
              options: [
                'IBANs are confidential by definition',
                'Generated identifiers look plausible but may fail checksum validation — the jagged frontier dips exactly at precise formats; validate before trusting',
                'The data will be too uniform',
                'There is no risk with modern models',
              ],
              answer: 1,
              explain: 'Plausible ≠ valid: checksummed and structured identifiers (IBANs, VAT numbers) are precisely where pattern-generation produces convincing fakes. Validate formats mechanically.',
            },
            {
              q: 'What makes AI-powered failure triage the highest-ROI automation application?',
              options: [
                'It fixes the failing tests automatically',
                'It clusters dozens of failures to shared root causes and prioritizes novel ones near recent changes — converting an hour of archaeology into minutes of verification',
                'It deletes flaky tests from the suite',
                'It makes the nightly run faster',
              ],
              answer: 1,
              explain: 'Synthesis over volume is a core AI sweet spot: 73 failures are usually three stories. Cluster, root-cause, prioritize — then a human verifies before acting.',
            },
            {
              q: 'Which QA career direction does the track identify as exploding with almost no incumbents?',
              options: [
                'Manual regression testing',
                'Eval engineering: golden sets, rubrics, judge calibration and red-team coverage for AI features',
                'Test environment administration',
                'Defect report formatting',
              ],
              answer: 1,
              explain: 'Every AI feature needs measurement discipline, and the discipline is younger than most careers. QA professionals who add statistical evaluation to testing instincts walk into the gap.',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'lead',
    label: 'Delivery / Engagement Leader',
    emoji: '🧑‍✈️',
    blurb: 'You lead teams, portfolios and client outcomes.',
    pitch: 'Cut through hype with portfolio judgment: AI economics, pilot discipline, governance that enables, and leading teams through the shift without fear.',
    modules: [
      {
        id: 'lead1',
        kind: 'track',
        track: 'lead',
        order: 1,
        emoji: '🗺️',
        title: 'AI Strategy for Delivery Leaders',
        skill: 'AI Strategy',
        tagline: 'Portfolio-level judgment: where AI pays, what it costs, and why pilots die.',
        minutes: 21,
        lessons: [
          {
            id: 'lead1-l1',
            title: 'Cutting through the hype: a leader\'s capability model',
            minutes: 7,
            content: `
<p>You sit between two pressures: boards demanding "an AI story" and teams whispering that the demos are oversold. Both are right. Your job is the synthesis — and it starts with carrying a capability model sturdy enough to make portfolio decisions on.</p>
<h3>The leader's three-sentence model</h3>
<p>Everything from your foundation compresses to this: <strong>(1)</strong> AI is superb at the routine cognitive layer — drafting, extraction, synthesis, conversation — wherever context can be provided and errors can be caught by review. <strong>(2)</strong> It is unreliable wherever truth matters more than plausibility and no verification step exists. <strong>(3)</strong> Its frontier is jagged and moving — so capability claims are empirical questions, answered by evals, never by demos or vendor decks. Carry these three sentences into every steering committee; they will not embarrass you, and they will disqualify half the proposals you see.</p>
<h3>Why 40% of agent projects were predicted to fail</h3>
<p>Gartner's much-quoted forecast — over 40% of agentic AI projects scrapped by 2027 — is your most useful statistic, because the post-mortems repeat four patterns you can screen for at approval time: <strong>wrong use case</strong> (automation where error tolerance was zero — the triangle would have caught it); <strong>no measurement</strong> (launched on demo applause, no evals, quality invisible until the incident); <strong>integration underestimated</strong> (the model was fine; getting it secure access to systems was the actual project — the #1 cited blocker in industry surveys); and <strong>adoption ignored</strong> (working tool, unconvinced workforce, zero usage). Note what's absent from the list: "the AI wasn't smart enough." Capability is rarely the binding constraint. Execution discipline is.</p>
<div class="viz viz-stats">
  <div class="vstat"><b>40%+</b><span>of agentic AI projects scrapped by 2027</span></div>
  <div class="vstat"><b>4</b><span>repeating failure patterns</span></div>
  <div class="vstat"><b>#1</b><span>blocker: integration, not capability</span></div>
</div>
<div class="callout"><strong>The portfolio screen — four questions before any AI initiative gets funded:</strong> Which routine cognitive task, at what volume? (value) · Where will the context come from, and is the data ready? (feasibility) · What is the eval plan and the quality gate for go-live? (measurement) · Who reviews AI output before it matters, and who owns adoption? (operating model). Initiatives with four crisp answers succeed at rates that would flip Gartner's statistic. Initiatives with applause instead of answers become the statistic.</div>
<h3>The two failure modes of leadership posture</h3>
<p>Overcaution — banning or burying AI in committee — quietly taxes you: your best people use it anyway (unsanctioned, ungoverned: shadow AI), competitors compound their learning curve, and recruiting notices. Overenthusiasm — mandating "AI everywhere" without the screen above — manufactures the 40%. The posture that works is the one this course has taught throughout: <strong>structured contact with reality</strong> — real pilots, real measurement, real review gates, scaled when the numbers say so.</p>`,
            takeaways: [
              'Three-sentence model: superb at routine cognitive work with context+review; unreliable where truth matters and verification is absent; jagged frontier → evals decide, not demos.',
              'Agent projects fail on use-case fit, measurement, integration and adoption — almost never raw capability.',
              'Fund only initiatives with crisp answers on value, context/data, eval plan, and review/adoption ownership.',
            ],
            quote: {
              text: 'Over 40% of agentic AI projects will be scrapped by 2027 — and almost none for lack of intelligence. Execution discipline is the binding constraint.',
              by: 'Gartner forecast + industry post-mortems',
              role: 'The leader\'s most useful statistic',
            },
          },
          {
            id: 'lead1-l2',
            title: 'AI economics: budgets, tokens and the productivity question',
            minutes: 7,
            content: `
<p>AI line items are appearing in every budget you own, priced in unfamiliar units. A leader who can sanity-check the economics in their head makes better calls than one outsourcing the math to the enthusiasts. The working knowledge, compressed.</p>
<h3>The three cost shapes</h3>
<ul>
<li><strong>Per-seat tools</strong> (copilots, assistants: ~$20–60/user/month): easy to budget, easy to waste. The metric that matters is active use — license utilization audits routinely find half the seats cold. Buy in waves tied to enablement, not org-wide on day one.</li>
<li><strong>Per-token consumption</strong> (custom features and agents): scales with usage — a feature that succeeds can cost 10× its pilot estimate <em>as a success signal</em>, but you want that growth forecast, capped and alerted, not discovered. Insist any custom AI business case states cost-per-use × realistic volume (your PO peers learned the napkin math; require the napkin).</li>
<li><strong>The build & run iceberg:</strong> the model API is often the <em>smallest</em> line. Integration engineering, data readiness work, eval development, monitoring and change management routinely run 3–5× the inference bill. Budgets that only show the API line are demos in spreadsheet form.</li>
</ul>
<table class="viz-table">
  <thead><tr><th>Cost shape</th><th>Unit</th><th>The leadership move</th></tr></thead>
  <tbody>
    <tr><td>Per-seat tools</td><td>~$20–60/user/month</td><td>Audit utilization; buy in waves</td></tr>
    <tr><td>Per-token consumption</td><td>Scales with usage</td><td>Forecast, cap and alert</td></tr>
    <tr><td>Build and run iceberg</td><td>3–5× the inference bill</td><td>Budget the whole iceberg, not the API tip</td></tr>
  </tbody>
</table>
<div class="viz-cap">The three cost shapes a leader sanity-checks.</div>
<h3>The productivity measurement trap</h3>
<p>"AI made the team 30% faster" claims deserve your scrutiny. Self-reported time savings inflate; activity metrics (more code, more documents) measure volume, not value; and the review time your governance correctly added eats part of the gross gain. Honest measurement: <strong>baseline before pilot</strong> (actual cycle times, actually measured), then compare end-to-end flow — including review — on the same work type. Expect honest nets of 20–50% on suitable tasks: genuinely transformative, and roughly half of what the headlines claim. Quote the honest number; your credibility is worth more than the slide.</p>
<div class="callout"><strong>Where the saved time goes is a leadership decision, not an accounting entry:</strong> the gain becomes value as more throughput, better quality (review-everything instead of sample), faster client response, or capacity for the previously-impossible. Decide which, explicitly, per team — or the time evaporates into Parkinson's law and your AI program will be accused of having delivered nothing measurable. The follow-the-time discipline is also your best defense of the program's budget next cycle.</div>
<h3>One more line item: the learning dividend</h3>
<p>Mollick's fourth rule has a budget implication — part of today's spend buys <em>organizational capability</em> with tools that keep improving. Teams fluent now compound; the budget line is partly R&D, partly tuition. Account for it that way and pilots that "merely" trained fifty people stop looking like failures — because they weren't.</p>`,
            takeaways: [
              'Three cost shapes: per-seat (audit utilization), per-token (forecast, cap, alert), and the 3–5× build/run iceberg under the API line.',
              'Measure productivity end-to-end against a pre-pilot baseline, review time included; expect honest nets of 20–50%.',
              'Decide explicitly where saved time goes — throughput, quality, speed or new capacity — or it evaporates.',
            ],
            quote: {
              text: 'The API bill is the visible tip. Integration, data readiness, evals and change management are the iceberg — and the project.',
              by: 'Enterprise AI budgeting reality',
              role: 'Why "the model is cheap" misleads',
            },
          },
          {
            id: 'lead1-l3',
            title: 'From pilot to portfolio: scaling what works',
            minutes: 7,
            content: `
<p>Most organizations are graveyards of successful pilots: the demo worked, the team was happy, and eighteen months later nothing changed. Pilots die not from failure but from <em>orphanhood</em> — no owner, no path, no decision forced. The leader's craft is building the pipeline that forces decisions.</p>
<h3>The pilot contract</h3>
<p>Approve no pilot without four pre-commitments, in writing: <strong>baseline</strong> (current performance, measured before start — unmeasured baselines make results unprovable and scaling unfundable); <strong>gates</strong> (the quality threshold — eval scores — and the value threshold — net time/cost — that define success); <strong>the scale path</strong> (if gates pass: what team, what budget, what timeline takes it wider — agreed BEFORE the pilot, or success leads nowhere); and <strong>the kill criterion</strong> (if gates fail: it stops, and the learning is written down — a graveyard of zombie pilots consuming attention is worse than honest kills). This contract is one page. It is the difference between an AI program and AI theater.</p>
<h3>Sequencing the portfolio</h3>
<p>Run waves, not big bangs: <strong>Wave 1</strong> — internal, low-risk, high-frequency (drafting, summarization, knowledge Q&A): fast wins, builds fluency, low blast radius. <strong>Wave 2</strong> — workflow integration with review gates (your BAs' three-swimlane redesigns): real process change, real measurement. <strong>Wave 3</strong> — client-facing and agentic: only on top of demonstrated eval discipline and operating maturity from waves 1–2. Skipping to wave 3 because a competitor's press release went there is how organizations donate case studies to Gartner's 40%.</p>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Internal, low-risk, high-frequency</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Workflow integration with review gates</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Client-facing and agentic</div>
</div>
<div class="viz-cap">Sequence in waves; skipping ahead manufactures failures.</div>
<h3>The operating spine that scaling requires</h3>
<p>Scaled AI needs owners the org chart didn't have: someone owning <strong>evals as a shared service</strong> (your QA leads are ready — their track trained them for exactly this); someone owning <strong>model/vendor strategy</strong> (portfolio, not per-team marriages); someone owning <strong>the governance kit</strong> (acceptable use, risk triage, incident path — lightweight, enabling, enforced); and per-initiative <strong>adoption owners</strong> (the tool nobody uses saves nothing — somebody's name goes next to usage). Small council, light process, real authority. The alternative is forty teams making forty independent vendor decisions, none with evals.</p>
<div class="callout"><strong>The leader's weekly question:</strong> replace "are we doing AI?" with <em>"what did we measure this week, and what decision does it force?"</em> — the question that turns AI from a topic into a program. Module two: the human side — leading the people through the shift.</div>`,
            takeaways: [
              'The pilot contract: pre-measured baseline, quality+value gates, a pre-agreed scale path, and a kill criterion.',
              'Sequence in waves: internal low-risk → workflow integration → client-facing/agentic. Skipping waves manufactures failures.',
              'Scaling needs an operating spine: eval service, vendor strategy, governance kit, named adoption owners.',
            ],
            quote: {
              text: 'Pilots do not die of failure. They die of orphanhood — no owner, no path, no decision forced.',
              by: 'The pilot graveyard post-mortem',
              role: 'Why the contract matters more than the technology',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'Per industry post-mortems, what is almost NEVER the cause of failed agentic AI projects?',
              options: [
                'Wrong use-case selection',
                'Missing measurement and eval discipline',
                'Insufficient raw model capability',
                'Underestimated integration and ignored adoption',
              ],
              answer: 2,
              explain: 'Capability is rarely the binding constraint. Projects fail on use-case fit, measurement, integration and adoption — all screenable at approval time with four questions.',
            },
            {
              q: 'An AI business case shows only the model API costs. What does the lesson say is missing?',
              options: [
                'Nothing — the API is the main cost',
                'The iceberg: integration engineering, data readiness, eval development, monitoring and change management, typically 3–5× the inference bill',
                'Marketing costs for the launch',
                'GPU purchase costs',
              ],
              answer: 1,
              explain: 'The API line is the visible tip. Budgets showing only inference costs are demos in spreadsheet form — the build-and-run iceberg is the actual project.',
            },
            {
              q: 'Why must the scale path be agreed BEFORE a pilot starts?',
              options: [
                'Procurement lead times require it',
                'Successful pilots without a pre-agreed path become orphans — the demo works, no decision is forced, and eighteen months later nothing changed',
                'It guarantees the pilot will succeed',
                'Auditors require scale documentation',
              ],
              answer: 1,
              explain: 'The pilot graveyard is full of successes nobody owned. The contract — baseline, gates, scale path, kill criterion — forces a decision either way.',
            },
            {
              q: 'What is the honest approach to measuring AI productivity gains?',
              options: [
                'Survey the team on perceived time savings',
                'Count output volume (documents, code) before and after',
                'Measure end-to-end cycle times against a pre-pilot baseline, INCLUDING the added review time — and expect honest nets of 20–50%',
                'Use the vendor\'s published benchmark figures',
              ],
              answer: 2,
              explain: 'Self-reports inflate and volume measures miss value. Baseline first, compare end-to-end including review, quote the honest number — your credibility compounds, like the savings.',
            },
          ],
        },
      },
      {
        id: 'lead2',
        kind: 'track',
        track: 'lead',
        order: 2,
        emoji: '🌱',
        title: 'Leading Teams Through the Shift',
        skill: 'Leading Change',
        tagline: 'Upskill without fear, govern without strangling, and build the org that keeps learning.',
        minutes: 21,
        lessons: [
          {
            id: 'lead2-l1',
            title: 'Upskilling without fear: the adoption psychology',
            minutes: 7,
            content: `
<p>The hardest part of enterprise AI is not in any architecture diagram: it's the moment a capable professional quietly concludes <em>"this thing is here to replace me"</em> — and disengages, resists or polishes their CV. Adoption is psychology before it is technology, and leaders own the psychology.</p>
<h3>Name the fear, then narrow it</h3>
<p>Vague fear is unmanageable; specific truth is. The honest message, delivered without corporate anesthesia: <em>"AI will absorb a real share of the routine layer of our work — the drafting, the summarizing, the photocopier hours. The judgment, the client trust, the accountability stay human, and they become a bigger share of everyone's day. Our plan is to be excellent at that new mix, and here is the training, the time and the safety to get there."</em> Then — critically — behave consistently with it: if AI time savings immediately convert to headcount cuts, every future adoption message is dead on arrival. The organizations winning the talent side treat recovered hours as capacity for growth, quality and development — and say so out loud, repeatedly.</p>
<div class="viz viz-vs">
  <div class="vs-side bad"><h4>The routine layer</h4><p>Drafting, summarizing, the photocopier hours — AI absorbs a real share.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side good"><h4>The human layer</h4><p>Judgment, client trust, accountability — stays human and a bigger share of the day.</p></div>
</div>
<h3>Make practice safe and visible</h3>
<p>People learn AI by contact (the jagged frontier admits no other route), and contact requires psychological safety plus permission: <strong>sanctioned tools</strong> (so practice isn't policy violation — shadow AI thrives exactly where sanctioned AI is absent); <strong>explicit practice time</strong> (the ten-minutes-daily habit, blessed from the top — what leaders measure and mention, people do); <strong>failure-friendly forums</strong> ("what I tried, where it failed" sessions where seniors share their AI misses first — the fastest psychological-safety signal a leader can send); and <strong>champions over mandates</strong> (every team has two natural experimenters; resource them, platform them, let peer proof do what policy cannot).</p>
<div class="callout"><strong>Watch the junior pipeline — a leadership-grade risk hiding in plain sight:</strong> AI absorbs precisely the routine tasks juniors learned the craft on. If your operating model quietly assumes "AI does the junior work", you are eating your seniors' replacements. Redesign development paths deliberately: juniors now learn by <em>reviewing</em> AI output against quality bars (faster exposure to more cases than drafting ever gave them), by owning evals, by running the verification layer. The firms that solve junior development in the AI era win the decade's talent compounding; the ones that don't will discover the hole in five years, all at once.</div>
<h3>The leader as visible learner</h3>
<p>One behavior outweighs every program: <strong>use the tools yourself, visibly, imperfectly.</strong> Draft your team comms with AI and say so; share your own jagged-frontier discoveries in leadership meetings; do your daily rep where people can see it. "My leader is learning this too" de-risks learning for everyone below you. (You're doing the course; you're already ahead on this one.)</p>`,
            takeaways: [
              'Replace vague fear with specific truth: routine layer shrinks, judgment layer grows — then behave consistently with the message.',
              'Adoption needs sanctioned tools, blessed practice time, failure-friendly forums and resourced champions.',
              'Redesign junior development deliberately (review, evals, verification) — or eat your seniors\' replacements.',
            ],
            quote: {
              text: 'People do not resist technology. They resist loss, ambiguity and being changed without consent. Address those, and the technology adopts itself.',
              by: 'Change leadership principle',
              role: 'The psychology under every stalled rollout',
            },
          },
          {
            id: 'lead2-l2',
            title: 'Governance that enables: guardrails, not gates',
            minutes: 7,
            content: `
<p>Two governance failure modes, equally expensive: the <strong>free-for-all</strong> (client data pasted into consumer tools, forty vendors, no audit trail — works fine until the incident, which arrives) and the <strong>frozen org</strong> (six-month approval cycles, banned tools, shadow AI everywhere — all the risk, none of the learning). The third way is lightweight governance that makes the right thing the easy thing. You've met its components throughout the course; here they assemble into the leader's kit.</p>
<div class="viz viz-vs">
  <div class="vs-side bad"><h4>Free-for-all</h4><p>Client data in consumer tools, forty vendors, no audit trail — fine until the incident arrives.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side bad"><h4>Frozen org</h4><p>Six-month approvals, banned tools, shadow AI everywhere — all the risk, none of the learning.</p></div>
</div>
<div class="viz-cap">Both failure modes are equally expensive — the third way is enabling guardrails.</div>
<h3>The five-piece governance kit</h3>
<ul>
<li><strong>Acceptable use, on one page:</strong> which tools are sanctioned for which data classes ("client-identifying data only in firm-approved tools; anonymize by default") — written for humans, not lawyers, with examples. If it takes longer to read than the task it governs, it will be skipped.</li>
<li><strong>Risk-tiered intake:</strong> one question routes everything — <em>does this use case make or influence consequential decisions about people, money or anything external-facing?</em> No → fast lane, days not months. Yes → the heavier path: human oversight design, eval thresholds, documentation (the high-risk regime your BAs learned). Speed for the safe; scrutiny for the consequential. Most proposals are safe; let them move.</li>
<li><strong>Eval gates as policy:</strong> nothing consequential goes live without a golden set, thresholds and monitoring — governance and engineering discipline turn out to be the same document (you knew this from the foundation: evals are the only honest dashboard).</li>
<li><strong>Audit and incident paths:</strong> logs for consequential uses; a pre-named owner and play for "the AI said something wrong and someone acted on it." Incidents handled well in hours build trust; incidents improvised over a weekend destroy programs.</li>
<li><strong>A standing review rhythm:</strong> quarterly, lightweight — what's deployed, what do the dashboards say, what changed in the regulatory weather (the EU AI Act timeline marches; client contracts increasingly carry AI clauses — your firm is likely contractually bound to some of this already, a fact remarkably few delivery leaders have checked).</li>
</ul>
<div class="callout"><strong>The litmus test of good AI governance:</strong> measure the time from "team has a low-risk idea" to "team is allowed to try it." If it's days, your governance enables. If it's months, you are growing shadow AI — paying governance costs while receiving none of the protection. Speed in the safe lane IS a control: it keeps activity visible, sanctioned and learnable-from.</div>
<h3>Client-facing diligence, the consulting edition</h3>
<p>Your engagements add a layer: <em>disclosure</em> (does the client know where AI touches their deliverables? increasingly they're asking in RFPs — have the answer before it's a surprise), <em>contract hygiene</em> (data processing terms vs your AI toolchain — verify, don't assume), and <em>provenance honesty</em> (AI-assisted work product reviewed by named humans, billed honestly). The firms turning AI governance into a client-trust asset are selling it as a differentiator; the ones improvising it are one procurement questionnaire from an awkward meeting.</p>`,
            takeaways: [
              'Govern with the five-piece kit: one-page acceptable use, risk-tiered intake, eval gates, audit/incident paths, quarterly review.',
              'Litmus test: low-risk ideas approved in days. Slow safe-lanes grow shadow AI — all risk, no learning.',
              'Client-facing: disclose AI use, verify contract terms against your toolchain, keep provenance honest.',
            ],
            quote: {
              text: 'Make the right thing the easy thing. Governance that slows the safe lane does not reduce risk — it just relocates it into the shadows.',
              by: 'The enabling-governance principle',
              role: 'Guardrails, not gates',
            },
          },
          {
            id: 'lead2-l3',
            title: 'The organization that keeps learning',
            minutes: 7,
            content: `
<p>Final lesson of the track — and it zooms out to the only durable advantage available. Models commoditize: every competitor rents the same brains. Vendor features converge. What compounds privately is <strong>organizational learning velocity</strong> — how fast your firm turns AI contact into capability, capability into client value, and value into the next round of contact. Leaders build that flywheel or it doesn't exist.</p>
<h3>The flywheel's four bearings</h3>
<ul>
<li><strong>Habits over events:</strong> a two-day AI training is an event; the daily rep, the frontier journal, the failure-friendly forum are habits. Events inform; habits compound. Budget accordingly — and protect the habits when delivery pressure mounts, because that's precisely when they pay.</li>
<li><strong>Shared memory:</strong> the prompt that cracked the proposal workflow, the eval set from the claims pilot, the vendor diligence that found the data-terms landmine — these die in inboxes or live in a commons. A searchable, curated library of what-worked (owned, like all knowledge bases, by someone — your data-readiness lesson applies internally too) turns fifty teams' contact into one firm's capability.</li>
<li><strong>Measurement as culture:</strong> the weekly question from module one — <em>what did we measure, what decision does it force?</em> — practiced until it's reflex. Firms that measure learn; firms that demo repeat.</li>
<li><strong>Slack for exploration:</strong> compounding requires experiments, and experiments require sanctioned slack — the champion's Friday afternoon, the pilot budget line that survives the cost review. The portfolio math: most experiments return learning, a few return the next wave-one win, and occasionally one returns the practice that differentiates the firm. That asymmetry is the budget's justification.</li>
</ul>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Habits over events</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Shared memory</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Measurement as culture</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>4</b>Slack for exploration</div>
</div>
<div class="viz-cap">The learning flywheel's four bearings.</div>
<h3>What to watch on the horizon (the leader's light diet)</h3>
<p>Agents maturing from copilots to coworkers — watch the permission-boundary and accountability questions, they land on delivery leaders first. Regulation tightening — the risk-tier muscle you built is durable. Capability jumps continuing — Mollick's rule 4 is a planning assumption, not a slogan: whatever you architect, assume the AI inside it improves twice before the contract renews. And the talent market repricing — AI-fluent professionals at every level, your juniors included, now have a market; retention is partly an AI-program quality question.</p>
<div class="callout"><strong>Track complete — and a closing mirror:</strong> you've built the strategy screen, the economics, the pilot discipline, the psychology, the governance and the flywheel. Notice that every one of them is a <em>learning</em> structure — which is the quiet thesis of this whole platform: the organizations that thrive with AI are the ones that institutionalize what you just did personally. The "Client-Ready AI Briefing" and "AI Workflow Audit" projects turn your track into artifacts; your tree is waiting on the fruit. Lead from the front: finish with your hands.</div>`,
            takeaways: [
              'Durable advantage = learning velocity: habits over events, shared memory, measurement culture, sanctioned slack.',
              'Horizon watch: agent accountability, tightening regulation, continuing capability jumps, a repricing talent market.',
              'Every structure in this track is a learning structure — institutionalize personally-proven loops at firm scale.',
            ],
            quote: {
              text: 'In a world where everyone rents the same models, the only compounding asset is how fast your organization learns.',
              by: 'The learning-velocity thesis',
              role: 'The leader\'s closing argument',
            },
          },
        ],
        quiz: {
          passPct: 70,
          questions: [
            {
              q: 'Why does converting AI time-savings directly into headcount cuts sabotage future adoption?',
              options: [
                'It violates labor regulations',
                'It proves the workforce\'s replacement fear true — after which every adoption message is dead and practice goes underground',
                'It reduces the AI budget',
                'It does not — efficiency is the point',
              ],
              answer: 1,
              explain: 'Adoption runs on psychology. One inconsistent action outweighs a hundred reassuring messages; winning organizations visibly convert recovered hours into growth, quality and development.',
            },
            {
              q: 'What is the "junior pipeline" risk of AI adoption?',
              options: [
                'Juniors adopt AI too slowly',
                'AI absorbs the routine tasks juniors learned the craft on — without redesigned development paths (review, evals, verification), you eat your seniors\' replacements',
                'Junior salaries rise too fast',
                'Juniors leave for AI startups',
              ],
              answer: 1,
              explain: 'The routine layer was the training ground. Deliberate redesign — juniors reviewing AI output, owning evals, running verification — solves it; assuming "AI does the junior work" defers the hole five years.',
            },
            {
              q: 'What is the litmus test of enabling (vs strangling) AI governance?',
              options: [
                'The number of policies published',
                'Time from "team has a low-risk idea" to "team may try it" — days enables; months grows shadow AI with all the risk and none of the visibility',
                'The size of the governance committee',
                'Whether a big-four firm audited the framework',
              ],
              answer: 1,
              explain: 'Speed in the safe lane is itself a control: it keeps experimentation visible and sanctioned. Slow safe-lanes relocate activity into the shadows, where governance reaches nothing.',
            },
            {
              q: 'According to the track\'s closing thesis, what is the durable competitive advantage in the AI era?',
              options: [
                'Exclusive access to frontier models',
                'The largest AI budget in the sector',
                'Organizational learning velocity — habits, shared memory, measurement culture and slack for experiments, compounding privately while models commoditize',
                'Being first to announce an AI strategy',
              ],
              answer: 2,
              explain: 'Everyone rents the same brains; vendor features converge. What compounds is how fast the organization turns contact into capability — the flywheel leaders build or don\'t.',
            },
          ],
        },
      },
    ],
  },
];
