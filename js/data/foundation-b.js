// Foundation modules 4-6 — "The Roots", continued.
export const foundationB = [
  {
    id: 'f4',
    kind: 'foundation',
    order: 4,
    emoji: '💬',
    title: 'The LLM Revolution',
    skill: 'LLMs',
    tagline: 'How ChatGPT-class models actually work: tokens, training, and the Software 3.0 shift.',
    minutes: 28,
    lessons: [
      {
        id: 'f4-l1',
        title: "Predicting the next word — that's really it?",
        minutes: 7,
        content: `
<p>Here is the open secret of the AI revolution: a large language model (LLM) is trained to do exactly one thing — <strong>given some text, predict what comes next.</strong> "The capital of France is ___" → "Paris". Trillions of times, over essentially the readable internet.</p>
<h3>Why such a humble task creates such striking ability</h3>
<p>Because predicting the next word <em>well</em> turns out to require absorbing almost everything embedded in human text. To continue "The verdict in the patent case hinged on…" you need law. To continue Python code, you need programming. To finish a joke, you need humor and timing. Next-word prediction is a forcing function: <strong>to get really good at it, the model must internally compress grammar, facts, styles, and reasoning patterns</strong> — because all of those are what make the next word predictable.</p>
<div class="callout"><strong>The "autocomplete on steroids" trap:</strong> technically accurate, deeply misleading. Your phone's autocomplete looks back two words with no understanding. An LLM weighs an entire conversation — potentially hundreds of pages — through hundreds of layers and hundreds of billions of weights. Calling that "autocomplete" is like calling a hospital "a building with band-aids." Use the phrase to explain the mechanism, never to predict the capability.</div>
<h3>One mechanism, two faces</h3>
<p>This single fact explains both sides of the jagged frontier you met in Module 1:</p>
<ul>
<li><strong>The brilliance:</strong> fluent drafting, translation, summarization, coding — all are "continue this text well" in disguise.</li>
<li><strong>The flaws:</strong> the model generates what's <em>plausible</em>, not what's <em>verified</em>. When plausible and true diverge, you get confident nonsense — hallucination. Same engine, both outcomes.</li>
</ul>
<div class="viz viz-vs">
  <div class="vs-side good"><h4>Plausible</h4><p>What the model always produces: a fluent continuation that fits the pattern. Powers drafting, translation, summarizing, coding.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side"><h4>Verified</h4><p>What is actually true. The model never checks this on its own — when it diverges from plausible, you get confident hallucination.</p></div>
</div>
<div class="viz-cap">One engine, both faces: brilliance and hallucination share a mechanism.</div>
<p>Hold this lesson close: it is the single highest-leverage piece of intuition in modern AI. Nearly every strength and weakness you'll ever observe in an AI assistant traces back to "it is generating a plausible continuation."</p>`,
        takeaways: [
          'An LLM does one thing: predict the next token of text — at colossal scale.',
          'Doing that well forces the model to internalize grammar, facts, styles and reasoning patterns.',
          'Generation produces what is plausible, not what is verified — brilliance and hallucination share one mechanism.',
        ],
        quote: {
          text: 'When we train a large neural network to accurately predict the next word in lots of different texts, what we are doing is learning a world model… a compressed representation of the world.',
          by: 'Ilya Sutskever',
          role: 'Co-founder & former Chief Scientist, OpenAI',
        },
      },
      {
        id: 'f4-l2',
        title: 'Tokens and context windows: the working memory of AI',
        minutes: 7,
        content: `
<p>Two technical terms appear in every AI product conversation, every pricing page, and every limitation you'll ever hit. Master them here, in plain language.</p>
<h3>Tokens: the LLM's alphabet</h3>
<p>Models don't read letters or whole words — they read <strong>tokens</strong>: common chunks of characters. "consulting" might be one token; "Llanfairpwllgwyngyll" might be eight. Rule of thumb in English: <strong>1 token ≈ ¾ of a word</strong>; 1,000 tokens ≈ 750 words.</p>
<div class="viz viz-stats">
  <div class="vstat"><b>≈¾</b><span>of a word per token</span></div>
  <div class="vstat"><b>750</b><span>words in 1,000 tokens</span></div>
  <div class="vstat"><b>~3K → millions</b><span>context window, 2022 to today</span></div>
  <div class="vstat"><b>$3</b><span>per million input tokens (200K model)</span></div>
</div>
<p>Why you should care: <strong>tokens are the billing meter and the speed limit.</strong> API usage is priced per million tokens (in and out), and generation speed is measured in tokens per second. When a developer says "that feature costs about a cent per request," they counted tokens.</p>
<h3>The context window: everything the model can "see" right now</h3>
<p>The <strong>context window</strong> is the maximum number of tokens a model can consider at once — the conversation so far, documents you pasted, instructions, plus its own developing answer. Think of it as <strong>working memory, like a desk</strong>: whatever's on the desk, the model reasons over brilliantly; whatever isn't on the desk <em>does not exist for it.</em></p>
<p>Crucial corollary: <strong>the model has no memory between conversations.</strong> Each new chat starts blank. When an assistant "remembers" you, the product is quietly re-loading notes into the desk — er, context — behind the scenes. The model itself learned nothing about you.</p>
<div class="callout"><strong>Why this lesson pays rent:</strong> context windows have grown from ~3,000 tokens (2022) to millions (today) — whole codebases and document rooms now fit on the desk. But bigger desks cost more per request, and models can still skim-read the middle of very long contexts. "What fits in context, what does it cost, and what stays reliable" is a genuine design conversation you can now follow — and even lead.</div>
<h3>Instant fluency check</h3>
<p>You can now decode sentences like: <em>"We're on a 200K-context model at $3 per million input tokens; the RAG pipeline keeps prompts around 8K tokens."</em> If that parses — and it should — you've cleared a bar most professionals haven't.</p>`,
        takeaways: [
          'Tokens (≈¾ word) are the unit of AI cost and speed — billing is per million tokens.',
          'The context window is the model\'s working memory: what\'s not in it does not exist for the model.',
          'Models forget everything between chats; "memory" features just re-load context behind the scenes.',
        ],
        quote: {
          text: 'The context window is your new program. Filling it well — instructions, examples, the right documents — is the core skill of the LLM era.',
          by: 'Andrej Karpathy',
          role: 'Paraphrasing his Software 3.0 framing',
        },
      },
      {
        id: 'f4-l3',
        title: 'How an assistant is made: pretrain, tune, align',
        minutes: 7,
        content: `
<p>A raw next-word predictor isn't a helpful assistant — ask a freshly pretrained "base model" a question and it might just continue with… more questions, since that's a plausible continuation. Turning the wild engine into the polite expert you chat with takes a three-stage pipeline worth knowing.</p>
<h3>Stage 1 — Pretraining: read (almost) everything</h3>
<p>The model learns next-word prediction across trillions of tokens of web text, books and code. Takes months on tens of thousands of GPUs; costs in the hundreds of millions. The result — the <strong>base model</strong> — contains nearly all the raw knowledge and capability, with the manners of a wild animal. This stage is why frontier AI is so capital-intensive and why a handful of labs dominate it.</p>
<h3>Stage 2 — Instruction tuning: teach the format</h3>
<p>Fine-tune on curated examples of question → high-quality answer, written or vetted by humans. The model learns the <em>shape</em> of being an assistant: answer the question asked, be structured, admit limits. Relatively cheap; transformative for usability.</p>
<h3>Stage 3 — Alignment: sand off the rough edges</h3>
<p>Humans (and increasingly AI judges) compare pairs of answers — "this one is more helpful / more honest / less harmful" — and reinforcement learning (Module 2's third recipe!) nudges the model toward preferred behavior. This is <strong>RLHF</strong> — reinforcement learning from human feedback. Anthropic adds <strong>Constitutional AI</strong>: the model critiques and revises its own outputs against a written set of principles. Alignment is why the assistant declines to help build weapons and why it sometimes feels overly cautious — that dial is genuinely hard to set.</p>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Pretrain</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Instruction-tune</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Align (RLHF)</div>
</div>
<div class="viz-cap">Raw knowledge, then assistant format, then preferred behavior.</div>
<div class="callout"><strong>Software 3.0 — the punchline:</strong> Karpathy's arc completes here. Software 1.0: humans write code. Software 2.0: training writes the weights. <strong>Software 3.0: the model is a new kind of computer, and you program it in English</strong> — via the context window. Prompts are programs. That makes everyone who can write a clear brief… a programmer. Including you.</div>
<h3>Why assistants differ</h3>
<p>ChatGPT, Claude and Gemini all follow this same recipe — differing in data mix, scale, and especially alignment choices. That's why they have noticeably different personalities and strengths, and why "which model?" is now a real product decision (your persona track picks this up).</p>`,
        takeaways: [
          'Pipeline: pretraining (knowledge, $100M+ scale) → instruction tuning (assistant format) → RLHF/alignment (behavior).',
          'Base models are capable but wild; alignment makes them helpful, honest and (sometimes frustratingly) careful.',
          'Software 3.0: LLMs are a new computer programmed in natural language — prompts are programs.',
        ],
        quote: {
          text: 'We are now programming computers in English. I call it Software 3.0 — the prompt is the program, and the LLM is the interpreter.',
          by: 'Andrej Karpathy',
          role: 'From "Software Is Changing (Again)"',
        },
        goDeeper: [
          { label: 'Karpathy — Deep Dive into LLMs like ChatGPT (3.5hr, the full pipeline)', url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI' },
        ],
      },
      {
        id: 'f4-l4',
        title: 'Powers and limits: hallucination, cutoffs, reasoning',
        minutes: 7,
        content: `
<p>You now know how LLMs are built. This lesson turns that into the practical capability map you'll use every working day.</p>
<h3>Limit 1 — Hallucination: plausible ≠ true</h3>
<p>The model always generates a continuation; it never "looks up" facts unless given tools. When the pattern is strong (capital of France) plausibility and truth coincide. When it's weak (an obscure case citation, a niche statistic) the model produces something <em>shaped like</em> a fact — fluently, confidently, and sometimes wrongly. Lawyers have been sanctioned for filing AI-invented case law. <strong>Rule: the more specific, recent or consequential the claim, the more verification it needs.</strong></p>
<h3>Limit 2 — The knowledge cutoff</h3>
<p>Pretraining ends on a date; the base model's knowledge freezes there. Anything after is invisible — unless the product adds web search or document retrieval (most now do; the model then reads results <em>in its context window</em> — see how the concepts stack?).</p>
<h3>Limit 3 — Jagged, still</h3>
<p>Counting, precise arithmetic, spatial puzzles and "how many R's in strawberry" style questions can trip models that simultaneously write excellent contract analyses. You know why now: everything is text-pattern continuation, and some tasks encode poorly as text patterns. Modern systems patch this by handing math to actual calculators and code — tools, next module.</p>
<h3>Power 1 — Reasoning models: thinking before speaking</h3>
<p>Since late 2024, <strong>reasoning models</strong> generate extensive hidden "thinking" tokens — working through the problem step by step, checking themselves — before answering. Hard math, debugging, multi-constraint planning improved dramatically. The trade: slower and pricier per query. Modern product design routes easy queries to fast models, hard ones to thinkers.</p>
<h3>Power 2 — Multimodality</h3>
<p>Frontier models now see images, hear audio, read screens and generate all of the above. "Language model" increasingly means "general-purpose model that also speaks fluent human."</p>
<div class="callout"><strong>The professional's capability map:</strong> Trust drafting, transformation, synthesis and explanation by default (verify tone and emphasis). Verify all facts, figures, citations and anything recent. Route math and data work to tools. Escalate genuinely hard problems to reasoning models. Never delegate final judgment. Print this paragraph on your brain.</div>
<table class="viz-table">
  <thead><tr><th>Move</th><th>When</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>Trust</td><td>Default (check tone)</td><td>Drafting, transformation, synthesis, explanation</td></tr>
    <tr><td>Verify</td><td>Specific or recent</td><td>Facts, figures, citations, anything after the cutoff</td></tr>
    <tr><td>Route to tools</td><td>Math and data work</td><td>Arithmetic, counting, calculations</td></tr>
    <tr><td>Escalate</td><td>Genuinely hard problems</td><td>Multi-constraint planning, hard debugging — reasoning models</td></tr>
  </tbody>
</table>`,
        takeaways: [
          'Hallucination is structural: generation produces plausibility; verification is your job — scale it with the stakes.',
          'Knowledge cutoffs freeze model knowledge; search and retrieval patch it by loading fresh facts into context.',
          'Reasoning models trade speed and cost for step-by-step accuracy on hard problems — route accordingly.',
        ],
        quote: {
          text: 'AI is impressive, but it is a tool whose outputs you check — not an oracle whose outputs you obey.',
          by: 'Dario Amodei',
          role: 'CEO, Anthropic (paraphrased from public remarks)',
        },
      },
    ],
    quiz: {
      passPct: 70,
      questions: [
        {
          q: 'What is the single training objective of a large language model?',
          options: [
            'Answering questions truthfully',
            'Predicting the next token in a sequence of text',
            'Retrieving documents from a database',
            'Translating between languages',
          ],
          answer: 1,
          explain: 'Next-token prediction is the entire pretraining objective. Helpfulness and honesty are layered on afterward via tuning and alignment — and truth is never structurally guaranteed.',
        },
        {
          q: 'Your team pastes a 100-page contract into a chat and the model misses a clause from the middle. Which two concepts are most relevant?',
          options: [
            'Knowledge cutoff and RLHF',
            'Context window limits and degraded attention over very long inputs',
            'Tokens and temperature',
            'Pretraining cost and GPU shortages',
          ],
          answer: 1,
          explain: 'Everything the model "sees" must fit in the context window, and reliability can dip in the middle of very long contexts. This drives real design choices like retrieval and chunking.',
        },
        {
          q: 'Why do models hallucinate?',
          options: [
            'Bugs in the code that providers haven\'t fixed',
            'They are trained to deceive users',
            'They always generate plausible continuations; when plausible and true diverge, output is confidently wrong',
            'Hackers poison them in real time',
          ],
          answer: 2,
          explain: 'Hallucination is structural, not a bug: the same generative mechanism that produces fluent drafts produces fluent fabrications when the underlying pattern is weak. Hence: verify specifics.',
        },
        {
          q: 'Put the assistant-building pipeline in the correct order:',
          options: [
            'Alignment → pretraining → instruction tuning',
            'Pretraining on internet-scale text → instruction tuning on Q&A examples → alignment via human feedback (RLHF)',
            'Instruction tuning → RLHF → pretraining',
            'RLHF → fine-tuning → tokenization',
          ],
          answer: 1,
          explain: 'Pretrain (raw capability) → instruction-tune (assistant format) → align (preferred behavior). Different labs\' choices in the last stage explain the different "personalities" of assistants.',
        },
        {
          q: 'What distinguishes a "reasoning model" from a standard LLM?',
          options: [
            'It has a larger vocabulary of tokens',
            'It generates extended hidden step-by-step thinking before answering — better on hard problems, slower and costlier',
            'It is trained only on mathematics',
            'It never hallucinates',
          ],
          answer: 1,
          explain: 'Reasoning models "think before speaking", dramatically improving hard math, code and planning at the price of latency and cost — which is why products route queries by difficulty.',
        },
      ],
    },
  },

  {
    id: 'f5',
    kind: 'foundation',
    order: 5,
    emoji: '🤝',
    title: 'Working With AI, Daily',
    skill: 'AI Collaboration',
    tagline: 'Prompting as briefing, verification as habit, and grounding AI in your own knowledge.',
    minutes: 26,
    lessons: [
      {
        id: 'f5-l1',
        title: 'Briefing, not commanding: the anatomy of a great prompt',
        minutes: 7,
        content: `
<p>The single biggest gap between people who find AI "meh" and people who find it transformative is not the model they use — it's how they brief it. Mollick's rule 3 ("treat it like a smart, alien colleague") becomes concrete here.</p>
<h3>The five-part brief</h3>
<p>Strong prompts tend to contain five ingredients. You don't need all five every time — but when output disappoints, the missing ingredient is almost always on this list:</p>
<ul>
<li><strong>Role:</strong> "You are a senior management consultant reviewing a transformation roadmap…" — frames which patterns the model draws on.</li>
<li><strong>Task:</strong> one unambiguous instruction. "Review this for risks" beats "thoughts?"</li>
<li><strong>Context:</strong> the background a new colleague would need — audience, constraints, what's already been tried, relevant documents pasted in. <em>This is the highest-leverage ingredient and the most commonly skipped.</em></li>
<li><strong>Format:</strong> what good output looks like — "a table of risk / impact / mitigation", "under 200 words", "as bullet points for an exec."</li>
<li><strong>Examples:</strong> one or two samples of the style or structure you want. Showing beats describing.</li>
</ul>
<table class="viz-table">
  <thead><tr><th>Ingredient</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td>Role</td><td>Frames which patterns the model draws on</td></tr>
    <tr><td>Task</td><td>One unambiguous instruction</td></tr>
    <tr><td>Context</td><td>Background a new colleague would need — highest-leverage, most skipped</td></tr>
    <tr><td>Format</td><td>What good output looks like</td></tr>
    <tr><td>Examples</td><td>A sample or two — showing beats describing</td></tr>
  </tbody>
</table>
<div class="callout"><strong>Remember Software 3.0:</strong> the context window is the program and you are programming in English. A lazy prompt is lazy code — it runs, but you won't like the output. The good news: unlike code, you can simply <em>talk to the program</em> and ask it to fix itself.</div>
<h3>Iterate — it's a dialogue, not a vending machine</h3>
<p>First drafts are negotiations: "Shorter. More skeptical. Rewrite point 2 for a CFO. What questions would a regulator ask about this?" Each refinement costs seconds. People who treat AI as one-shot search walk away after a mediocre first answer; people who treat it as a colleague get to remarkable results three exchanges later.</p>
<h3>Two power moves</h3>
<ul>
<li><strong>Ask the model to interview you:</strong> "Before drafting, ask me five questions that would most improve the result." Flips context-gathering on its head — devastatingly effective.</li>
<li><strong>Ask for critique before content:</strong> "Here's my draft proposal — attack it as a skeptical client procurement lead." You stay the author; AI becomes the red team. (Notice: zero hallucination risk when AI critiques rather than asserts.)</li>
</ul>`,
        takeaways: [
          'Brief AI like a talented new colleague: Role, Task, Context, Format, Examples — context is the most-skipped, highest-leverage part.',
          'Iterate in dialogue; the third exchange is usually where the magic is.',
          'Power moves: make the model interview you first, and use it as a critic of your drafts, not just a generator.',
        ],
        quote: {
          text: 'Treat AI like a person — a smart but alien person. Tell it who it is, give it context, and you will get dramatically better results.',
          by: 'Ethan Mollick',
          role: 'Professor, Wharton; author of "Co-Intelligence"',
        },
      },
      {
        id: 'f5-l2',
        title: 'The verification habit: trust, but calibrate',
        minutes: 6,
        content: `
<p>Mollick's rule 2 — <em>be the human in the loop</em> — is easy to nod at and hard to practice under deadline pressure. This lesson makes it operational with one principle and one routine.</p>
<h3>The principle: verification effort scales with stakes and specificity</h3>
<p>Not all output deserves equal scrutiny. Calibrate:</p>
<ul>
<li><strong>Low stakes, low specificity</strong> (brainstorm titles, rephrase a paragraph): skim and go. Errors are cheap and obvious.</li>
<li><strong>Medium</strong> (internal summary, draft user stories): read fully, spot-check any claims against the source.</li>
<li><strong>High stakes or high specificity</strong> (client deliverables, numbers, names, dates, citations, legal/medical/financial anything): verify every factual claim independently. The model's confidence level carries <em>zero</em> evidential weight — fluency is not accuracy.</li>
</ul>
<table class="viz-table">
  <thead><tr><th>Tier</th><th>Examples</th><th>Effort</th></tr></thead>
  <tbody>
    <tr><td>Low stakes, low specificity</td><td>Brainstorm titles, rephrase a paragraph</td><td>Skim and go</td></tr>
    <tr><td>Medium</td><td>Internal summary, draft user stories</td><td>Read fully, spot-check claims</td></tr>
    <tr><td>High stakes or specificity</td><td>Client deliverables, numbers, names, citations</td><td>Verify every claim independently</td></tr>
  </tbody>
</table>
<h3>The routine: three questions before you ship AI-assisted work</h3>
<ul>
<li><strong>"Which claims here are checkable?"</strong> — names, numbers, dates, quotes, citations. Check them.</li>
<li><strong>"What would make this embarrassingly wrong?"</strong> — the failure your reviewer/client would catch. Hunt for it specifically.</li>
<li><strong>"Would I sign this?"</strong> — because you are. Authorship transfers the moment you hit send. "The AI wrote it" has never once survived contact with an unhappy client.</li>
</ul>
<div class="callout"><strong>Confidentiality — the other half of professional hygiene:</strong> know your firm's AI policy before pasting anything. Consumer chat tools may use input for training; enterprise tiers contractually don't. Default rule for consultants: <em>client-identifying data goes only into firm-approved tools.</em> When in doubt, anonymize — most tasks work fine with "Client X, a mid-size European insurer."</div>
<h3>Why this habit is a career asset, not overhead</h3>
<p>As AI drafts more of the world's first versions, the scarce skill shifts from <em>producing</em> to <em>judging</em>: knowing what good looks like, catching the subtle wrongness, owning the call. Verification isn't the tax on AI productivity — it's the human contribution that keeps commanding the fee.</p>`,
        takeaways: [
          'Scale verification with stakes and specificity; fluency is not accuracy and confidence is not evidence.',
          'Ship-check: Which claims are checkable? What would be embarrassingly wrong? Would I sign this?',
          'Client data only in approved tools — anonymize by default. Judgment is the skill that stays scarce.',
        ],
        quote: {
          text: 'Be the human in the loop. The AI proposes; you verify, decide and own the outcome.',
          by: 'Ethan Mollick',
          role: '"Co-Intelligence", rule 2',
        },
      },
      {
        id: 'f5-l3',
        title: 'RAG in plain language: grounding AI in your knowledge',
        minutes: 7,
        content: `
<p>Here's the question every organization asks within a week of trying ChatGPT: <em>"Amazing — but can it answer from <strong>our</strong> documents?"</em> The standard answer is a pattern called <strong>RAG — Retrieval-Augmented Generation</strong> — and it's the most common enterprise AI architecture in the world. After this lesson you'll understand it better than most people selling it.</p>
<h3>The problem</h3>
<p>The model has never read your project documentation, policies, or client contracts. Ask it about them and you get either "I don't know" or — worse — a confident hallucination shaped like an answer. Retraining the model on your documents is expensive, slow, and goes stale instantly. There's a better way, and you already know all of its parts.</p>
<h3>The insight: open-book exam</h3>
<p>Remember: the model reasons brilliantly over <em>whatever is in its context window</em>. So don't teach it your knowledge — <strong>hand it the right page at question time.</strong> Closed-book exams invite invention; open-book exams ground answers in the source.</p>
<h3>The pipeline, in four steps</h3>
<ul>
<li><strong>1. Chunk:</strong> split your documents into bite-size passages.</li>
<li><strong>2. Index:</strong> convert each passage into an <strong>embedding</strong> — a list of numbers capturing its <em>meaning</em>, such that similar meanings get nearby numbers. ("Annual leave policy" and "vacation rules" land close together despite sharing no words.) Store these in a vector database.</li>
<li><strong>3. Retrieve:</strong> when a user asks something, embed the question too, and fetch the passages whose meanings sit closest.</li>
<li><strong>4. Generate:</strong> stuff those passages into the context window with the question and an instruction: <em>"Answer using these sources; cite them; say so if they don't contain the answer."</em></li>
</ul>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Chunk</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Index</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Retrieve</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>4</b>Generate</div>
</div>
<div class="viz-cap">RAG: hand the model the right page at question time.</div>
<div class="callout"><strong>Why everyone loves RAG:</strong> answers cite real sources (auditable!), knowledge updates by updating documents (no retraining), access controls can apply at retrieval time, and hallucination drops sharply. Why it still needs care: retrieval can fetch the wrong passages, stale documents produce confidently stale answers, and quality needs measuring — with evals, naturally.</div>
<h3>Where you'll meet it</h3>
<p>Enterprise copilots, "chat with your documents" features, customer-support bots, policy assistants, proposal-drafting tools trained on past bids — RAG, RAG, RAG, RAG, RAG. When a vendor demos "AI that knows your business," your first question is now ready: <em>"What does retrieval quality look like, and how do you measure it?"</em> Watch them recalibrate their pitch.</p>`,
        takeaways: [
          'RAG = retrieve the relevant passages, then generate an answer grounded in them — an open-book exam.',
          'Embeddings turn meaning into geometry: similar meanings → nearby numbers → findable by similarity.',
          'RAG gives citations, instant knowledge updates and less hallucination — but retrieval quality must be measured.',
        ],
        quote: {
          text: 'The biggest wins in enterprise AI come from connecting models to your own data, with citations — not from the model knowing everything.',
          by: 'Common wisdom of the field',
          role: 'You will hear a version of this in every enterprise AI briefing',
        },
      },
      {
        id: 'f5-l4',
        title: 'Your personal AI operating rhythm',
        minutes: 6,
        content: `
<p>Knowledge becomes advantage only through habit. This lesson turns the course so far into a daily operating rhythm — and it's deliberately small, because small is what survives contact with a busy calendar.</p>
<h3>The daily invitation (Mollick rule 1, made concrete)</h3>
<p>For the next two weeks, run this experiment: <strong>every task that crosses your desk, spend ten seconds asking "could AI help with part of this?"</strong> Email to write, notes to structure, document to digest, plan to sanity-check, meeting to prep. When the answer is plausibly yes, try it — even (especially) when you suspect it'll fail. You are not chasing efficiency yet; you are <strong>mapping your personal jagged frontier</strong>, and there is no other way to map it than contact.</p>
<h3>Build the habit small (Ng's method)</h3>
<p>Andrew Ng's advice for sustainable learning famously starts absurdly small — the point is that <strong>consistency beats intensity</strong>: a little practice every working day compounds into fluency within a quarter. Attach AI practice to an existing routine: first coffee → run one work task through AI before opening email. Done daily, that single rep makes you the most AI-fluent person on most teams within months. This platform's streak counter exists precisely to honor that loop.</p>
<h3>Keep a frontier journal (two minutes, gold mine)</h3>
<p>One line per notable result: <em>"Drafted SOW section — 80% usable, invented a milestone date (caught it)."</em> Three weeks of entries becomes your personal playbook of where AI is brilliant, where it's risky, and which briefing patterns work — knowledge no course can give you, because your frontier is yours.</p>
<div class="callout"><strong>The two-week challenge, formally issued:</strong> (1) Ten-second invitation on every task. (2) One deliberate AI rep each morning. (3) One journal line per notable result. That's the whole assignment — and it's also Project territory: the "AI Workflow Audit" project in your path turns exactly this into a portfolio piece with measured results.</div>
<table class="viz-table">
  <thead><tr><th>Habit</th><th>Cadence</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td>Ten-second invitation</td><td>Every task</td><td>Map your personal jagged frontier</td></tr>
    <tr><td>One deliberate AI rep</td><td>Each morning</td><td>Consistency compounds into fluency</td></tr>
    <tr><td>One journal line</td><td>Per notable result</td><td>Build your personal playbook</td></tr>
  </tbody>
</table>
<h3>Where you now stand</h3>
<p>Foundation nearly complete: you know what AI is, how it learns, how LLMs work, and how to work with them daily. One module remains — the frontier itself: agents, tools, and how to keep your footing as the ground keeps moving. Then your tree grows its persona branch.</p>`,
        takeaways: [
          'Map your personal jagged frontier: ten-second "could AI help?" check on every task for two weeks.',
          'Consistency beats intensity — one deliberate AI rep per day compounds into team-leading fluency.',
          'A two-minute frontier journal becomes your personal playbook of strengths, risks and briefing patterns.',
        ],
        quote: {
          text: 'If you cultivate the habit of learning a little bit every week, you can make significant progress with what feels like less effort.',
          by: 'Andrew Ng',
          role: '"How to Build Your Career in AI"',
        },
      },
    ],
    quiz: {
      passPct: 70,
      questions: [
        {
          q: 'Which ingredient is described as the highest-leverage and most commonly skipped part of a prompt?',
          options: ['Role', 'Context — the background a new colleague would need', 'Format', 'Politeness'],
          answer: 1,
          explain: 'Role, Task, Format and Examples all help, but missing context is the most common reason for disappointing output. Brief AI like a smart new colleague who knows nothing about your situation.',
        },
        {
          q: 'How should verification effort be calibrated?',
          options: [
            'Verify everything with equal rigor, always',
            'Trust outputs that sound confident',
            'Scale verification with stakes and specificity — brainstorms get a skim; numbers, names, citations and client deliverables get independent checks',
            'Verification is unnecessary with newer models',
          ],
          answer: 2,
          explain: 'Fluency is not accuracy. Low-stakes creative output needs a skim; specific, consequential claims need independent verification — because you own what you ship.',
        },
        {
          q: 'In the RAG pattern, what role do embeddings play?',
          options: [
            'They compress documents to save storage',
            'They encrypt sensitive content',
            'They turn text meaning into numbers so semantically similar passages can be found by proximity',
            'They make the model type faster',
          ],
          answer: 2,
          explain: 'Embeddings map meaning to geometry: "annual leave policy" and "vacation rules" land near each other, letting retrieval find relevant passages even with zero word overlap.',
        },
        {
          q: 'Why does RAG reduce hallucination?',
          options: [
            'It uses a larger model',
            'It grounds generation in retrieved source passages and instructs the model to cite them or admit absence — an open-book exam instead of closed-book recall',
            'It blocks the model from answering at all',
            'It fine-tunes the model nightly on company data',
          ],
          answer: 1,
          explain: 'The model reasons over real passages in its context window rather than generating from pattern memory — and citations make answers auditable. Retrieval quality still needs measuring.',
        },
        {
          q: 'What is the purpose of the "frontier journal" habit?',
          options: [
            'Compliance documentation for your employer',
            'Building a personal, evidence-based map of where AI is strong, weak and risky for YOUR tasks',
            'Training data to fine-tune your own model',
            'Tracking your typing speed improvements',
          ],
          answer: 1,
          explain: 'The jagged frontier is personal — it depends on your tasks. One line per notable result compounds into a playbook no generic course can provide.',
        },
      ],
    },
  },

  {
    id: 'f6',
    kind: 'foundation',
    order: 6,
    emoji: '🤖',
    title: 'Agents & the Modern AI Stack',
    skill: 'Agents & Stack',
    tagline: 'From chatbots to agents: tools, MCP, evals, and how to stay current without drowning.',
    minutes: 26,
    lessons: [
      {
        id: 'f6-l1',
        title: 'From chatbots to agents: AI that does, not just says',
        minutes: 7,
        content: `
<p>Everything so far described AI that <em>answers</em>. The frontier — and the word in every 2026 strategy deck — is AI that <em>acts</em>: <strong>agents</strong>.</p>
<h3>The definition that actually helps</h3>
<p>An agent is an LLM put in a loop with tools and a goal:</p>
<ul>
<li><strong>Goal:</strong> "Find the three best venue options for the offsite, within budget, and draft the booking email."</li>
<li><strong>Loop:</strong> the model plans → takes an action (search the web, query a system, run code, edit a file) → observes the result → re-plans → acts again… until done or stuck.</li>
<li><strong>Tools:</strong> the actions available to it — and the reason it can affect the world rather than just describe it.</li>
</ul>
<div class="callout"><strong>Upgrade analogy:</strong> a chatbot is a brilliant advisor locked in a phone booth — all advice, no hands. An agent has hands: a browser, a terminal, your calendar, your company's systems. Same brain, plus the ability to <em>do</em> — which is exactly why both the value and the risk jump an order of magnitude.</div>
<div class="viz viz-vs">
  <div class="vs-side"><h4>Chatbot</h4><p>A brilliant advisor in a phone booth — all advice, no hands. It answers.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side good"><h4>Agent</h4><p>Same brain, plus tools: a loop of plan, act, observe, re-plan toward a goal. It acts.</p></div>
</div>
<h3>Agents you can already watch working</h3>
<ul>
<li><strong>Coding agents</strong> (the most mature): given a ticket, they explore the codebase, write changes, run tests, fix failures, open a pull request. Real engineering teams merge their work daily.</li>
<li><strong>Deep research agents:</strong> given a question, they run dozens of searches, read sources, reconcile contradictions and return a cited report in minutes.</li>
<li><strong>Operations agents:</strong> triaging support tickets end-to-end, reconciling invoices, onboarding processing — by 2026 a majority of large enterprises have agents like these in production.</li>
</ul>
<h3>The two design questions that tame the risk</h3>
<p>Acting AI fails more interestingly than talking AI — an agent confidently doing the wrong thing has consequences. The craft (your persona tracks go deeper) hangs on two questions: <strong>What is the agent allowed to do without asking?</strong> (its permission boundary) and <strong>Where must a human approve?</strong> (the checkpoints). Drafting an email: autonomous. Sending it to a client: checkpoint. Notice this is just Mollick's human-in-the-loop rule, now wearing system-architecture clothes.</p>`,
        takeaways: [
          'Agent = LLM + tools + goal, running a plan→act→observe loop until done.',
          'Coding, research and operations agents are in real production now — this is the current frontier, not the future.',
          'Agent design hinges on permission boundaries and human checkpoints: human-in-the-loop as architecture.',
        ],
        quote: {
          text: '2025 was when agents started to work; 2026 is when they started to matter. The question enterprises ask is no longer whether to build agents, but how to deploy them reliably.',
          by: 'Synthesis of 2026 industry reports',
          role: 'LangChain & Arcade "State of AI Agents", Gartner forecasts',
        },
      },
      {
        id: 'f6-l2',
        title: 'The plumbing: APIs, tool calling and MCP',
        minutes: 6,
        content: `
<p>A little plumbing knowledge goes a long way in AI conversations — it's the difference between nodding at architecture diagrams and reading them. Three concepts cover 90% of what you'll encounter.</p>
<h3>1. The API: AI as an ingredient</h3>
<p>Every product with a sparkle-emoji button works the same way underneath: the application sends instructions plus the user's input over an <strong>API</strong> to a model hosted by a provider (Anthropic, OpenAI, Google…), gets text back, and weaves it into the experience. Implications worth knowing: the "AI feature" is often a well-crafted prompt around a rented model (so <em>differentiation comes from context and workflow, not the model</em>); costs are metered per token; and switching providers is increasingly feasible — model choice has become a procurement decision, not a marriage.</p>
<h3>2. Tool calling: how the model gets hands</h3>
<p>Developers describe available actions to the model — "you may call <em>search_flights(from, to, date)</em>" — and the model, mid-conversation, can reply with a structured request to use one. The application executes the real action and feeds the result back into the context. <strong>The model never touches your systems directly; it asks, the application acts.</strong> That gap is where all the safety engineering lives — every permission check and audit log sits in it.</p>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Model requests action</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Application checks and executes</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Result fed back to context</div>
</div>
<div class="viz-cap">It asks, the application acts — the gap is where safety lives.</div>
<h3>3. MCP: a standard plug for AI integrations</h3>
<p>Historically, every app×tool pairing needed custom wiring — N apps × M tools = misery. The <strong>Model Context Protocol (MCP)</strong>, introduced by Anthropic in late 2024 and adopted industry-wide since, standardizes the socket: build one MCP server for your system (CRM, database, ticketing…), and any MCP-capable AI app can use it. The "USB-C of AI" cliché is accurate — and it's why enterprise AI integration estimates dropped from quarters to weeks.</p>
<div class="callout"><strong>Meeting fluency unlocked:</strong> "The copilot calls the model over API, uses tool calling for actions, and we expose our systems through MCP servers" — a sentence you can now parse, question, and even draw on a whiteboard. Useful question to ask next: <em>"Which tools can it call without human approval?"</em> (Lesson 1's permission boundary — see how it stacks?)</div>`,
        takeaways: [
          'AI features = application + prompt + rented model over API; differentiation lives in context and workflow.',
          'Tool calling: the model requests actions, the application executes them — safety lives in that gap.',
          'MCP standardizes AI-to-system integration ("USB-C of AI"), collapsing integration time from quarters to weeks.',
        ],
        quote: {
          text: 'We are entering the era where LLMs are the kernel of a new kind of operating system — orchestrating tools, memory and other models the way an OS orchestrates hardware.',
          by: 'Andrej Karpathy',
          role: 'The "LLM OS" vision',
        },
      },
      {
        id: 'f6-l3',
        title: 'Evals: how professionals measure AI (and win arguments)',
        minutes: 6,
        content: `
<p>Here's a scene from every AI project: the demo dazzles, leadership approves, the feature ships… and three weeks later sales reports it "sometimes says weird things to customers." Nobody can say how often, whether it's getting better, or whether yesterday's prompt tweak helped. The missing discipline has a name — <strong>evals</strong> — and it has quietly become the most important practice in applied AI.</p>
<h3>From vibes to evidence</h3>
<p>You can't unit-test a model the classic way — the same input can produce different (all acceptable) outputs, and "correct" is often a judgment call. Evals adapt Module 2's deepest idea (<em>the only way to know what a learned system does is to test it on examples</em>) to the LLM era:</p>
<ul>
<li><strong>Golden set:</strong> assemble 50–200 realistic test cases — typical ones, tricky ones, ones that must never go wrong (the "never invent a price" cases).</li>
<li><strong>Rubric:</strong> define what good output means, concretely: factually grounded in the source? right tone? under length? refuses out-of-scope questions?</li>
<li><strong>Grade:</strong> run the system over the whole set on every change. Grade automatically where possible — exact checks where they exist; for judgment calls, use a strong model as grader (<strong>LLM-as-judge</strong>), spot-checked by humans so you can trust the grader itself.</li>
<li><strong>Compare:</strong> now "did the new prompt help?" has a number. So does "can we switch to the cheaper model?" — run the evals, read the scores.</li>
</ul>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Golden set</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Rubric</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Grade</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>4</b>Compare</div>
</div>
<div class="viz-cap">Evals turn AI quality from vibes into numbers.</div>
<div class="callout"><strong>Why this is in the foundation and not just the QA track:</strong> evals are how every role wins AI arguments. POs: evals are your acceptance criteria. Consultants: "what do your evals show?" instantly separates serious vendors from demo-ware. Leaders: eval scores are the only honest dashboard of AI quality. Developers: evals are your regression suite. One discipline, every seat at the table.</div>
<h3>The cultural shift</h3>
<p>Industry surveys in 2026 put quality — not capability — as the #1 blocker to deploying AI at scale, and teams' answer is uniform: invest in evals. The phrase to retire from your vocabulary: <em>"it seems to work."</em> The phrase that replaces it: <em>"it scores 94% on our golden set, up from 89% last month."</em> Same product, different profession.</p>`,
        takeaways: [
          'Evals = golden test set + concrete rubric + automated grading, run on every change.',
          'LLM-as-judge scales judgment-call grading; humans audit the judge.',
          'Evals turn AI quality from vibes into numbers — acceptance criteria for POs, due diligence for consultants, dashboards for leaders.',
        ],
        quote: {
          text: 'Quality remains the biggest barrier to scaling agents in production — and systematic evaluation is how teams are breaking through it.',
          by: 'State of AI Agents 2026',
          role: 'Industry survey synthesis',
        },
      },
      {
        id: 'f6-l4',
        title: 'Staying current without drowning',
        minutes: 7,
        content: `
<p>Final foundation lesson — and it tackles the meta-problem that brought many of you here: <em>the field moves so fast that learning it feels like bailing the ocean.</em> Good news: you're now equipped to see why that feeling is misleading.</p>
<h3>Separate the layers: principles vs products</h3>
<p>AI news runs on two layers moving at wildly different speeds:</p>
<ul>
<li><strong>The principles layer (slow):</strong> learning from data, next-token prediction, context windows, training pipelines, retrieval, tool loops, evals. This is what you just spent six modules acquiring — and it has barely changed in years. New releases mostly <em>recombine</em> these pieces at better price-performance.</li>
<li><strong>The products layer (fast):</strong> model versions, benchmark leapfrogging, startup launches, feature announcements. Loud, daily, and mostly safe to ignore — because you can now decode any of it on demand from the principles.</li>
</ul>
<div class="viz viz-vs">
  <div class="vs-side good"><h4>Principles (slow)</h4><p>Learning from data, next-token prediction, context windows, retrieval, tool loops, evals. Barely changed in years — what you just learned.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side"><h4>Products (fast)</h4><p>Model versions, benchmark leapfrogging, launches, feature announcements. Loud and daily — decode them on demand from the principles.</p></div>
</div>
<p>Watch it work. "Vendor launches agentic copilot with 1M-token context and MCP support" — you just read that as <em>LLM + tool loop + big working memory + standard integrations</em>, and your next question ("what do the evals show?") is better than most analysts'. The headline was new; nothing in it was.</p>
<h3>A sustainable information diet</h3>
<p>Karpathy's advice applies doubly to AI news itself: skip the shorts, choose fewer and deeper sources. A working diet: <strong>one weekly digest</strong> (e.g. Ethan Mollick's <em>One Useful Thing</em>, or The Batch from DeepLearning.AI), <strong>one quarterly deep read</strong> (a Karpathy lecture, a major lab's launch deep-dive), and — most important — <strong>daily hands-on use</strong>, because the frontier is learned through fingertips, not feeds. That's 30 minutes a week plus your existing work. Sustainable indefinitely.</p>
<h3>Why leaders believe this matters — the stakes</h3>
<p>The heads of the major labs — whatever you make of their timelines — agree on direction: Dario Amodei writes of AI compressing decades of scientific progress into years; Demis Hassabis speaks of "radical abundance"; Sam Altman of intelligence too cheap to meter. You don't have to buy any specific forecast to accept the underlying bet: <strong>capabilities will keep compounding, so the people who've built the habit of working with AI compound with them</strong> — Mollick's fourth rule, played out over a career.</p>
<div class="callout"><strong>🌳 Foundation complete.</strong> Look at your tree — those roots and that trunk are real: AI fluency, ML intuition, deep learning, LLMs, collaboration habits, and the modern stack. Pass this knowledge check and your persona branch starts growing: the track built for your role. Then come the projects — and the fruit.</div>`,
        takeaways: [
          'Principles move slowly; products move fast. You learned the principles — decode the products on demand.',
          'Information diet: one weekly digest, one quarterly deep dive, daily hands-on practice. Skip the shorts.',
          'Lab leaders disagree on timelines but agree on direction: capabilities compound — so should your habits.',
        ],
        quote: {
          text: 'Powerful AI could compress a century of scientific progress into a decade. I think it could genuinely transform the world for the better — if we do the work to get it right.',
          by: 'Dario Amodei',
          role: 'CEO, Anthropic — "Machines of Loving Grace"',
        },
        goDeeper: [
          { label: 'Ethan Mollick — One Useful Thing (newsletter)', url: 'https://www.oneusefulthing.org/' },
          { label: 'The Batch — DeepLearning.AI weekly digest', url: 'https://www.deeplearning.ai/the-batch/' },
          { label: 'Dario Amodei — Machines of Loving Grace (essay)', url: 'https://www.darioamodei.com/essay/machines-of-loving-grace' },
        ],
      },
    ],
    quiz: {
      passPct: 70,
      questions: [
        {
          q: 'What turns an LLM into an agent?',
          options: [
            'A bigger context window',
            'Putting it in a loop with tools and a goal: plan → act → observe → repeat',
            'Training it on more data',
            'Giving it a friendly name and avatar',
          ],
          answer: 1,
          explain: 'Agent = LLM + tools + goal in a loop. The model plans, takes actions through tools, observes results and re-plans until the goal is met — AI that does, not just says.',
        },
        {
          q: 'In tool calling, what is the critical safety property of the architecture?',
          options: [
            'The model connects directly to enterprise databases for speed',
            'The model only REQUESTS actions; the application executes them — permissions and audit live in that gap',
            'Tools are limited to read-only operations',
            'All tool calls require a password',
          ],
          answer: 1,
          explain: 'The model proposes structured action requests; the application decides, executes and logs. Every safety control — permission boundaries, human checkpoints — lives in that gap.',
        },
        {
          q: 'What problem does MCP (Model Context Protocol) solve?',
          options: [
            'It makes models reason more accurately',
            'It standardizes how AI applications connect to tools and systems — build one server, every MCP-capable app can use it',
            'It compresses tokens to reduce costs',
            'It encrypts conversations end to end',
          ],
          answer: 1,
          explain: 'MCP is the "USB-C of AI": instead of custom wiring for every app×system pair, one standard protocol — which is why enterprise integration timelines collapsed.',
        },
        {
          q: 'Your vendor demos an impressive AI copilot. Which single question most effectively separates serious engineering from demo-ware?',
          options: [
            '"Which model is it built on?"',
            '"How many parameters does it have?"',
            '"What do your evals show — what\'s the golden set, the rubric, and the current scores?"',
            '"Does it use the latest GPUs?"',
          ],
          answer: 2,
          explain: 'Demos show the happy path. Evals show measured quality across realistic and adversarial cases. Teams that can answer have done the engineering; teams that can\'t have done a demo.',
        },
        {
          q: 'Per the final lesson, what is the sustainable strategy for keeping up with AI?',
          options: [
            'Follow breaking AI news daily across multiple feeds',
            'Wait for the field to stabilize before engaging',
            'Master slow-moving principles, use AI hands-on daily, and follow one weekly digest plus an occasional deep dive',
            'Re-take a fundamentals course every quarter',
          ],
          answer: 2,
          explain: 'Principles change slowly; products recombine them quickly. With principles mastered and daily practice, a light, deep information diet beats drinking from the firehose.',
        },
      ],
    },
  },
];
