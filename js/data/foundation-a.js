// Foundation modules 1-3 — "The Roots". Core curriculum for every persona.
export const foundationA = [
  {
    id: 'f1',
    kind: 'foundation',
    order: 1,
    emoji: '🌍',
    title: 'AI, Demystified',
    skill: 'AI Fluency',
    tagline: 'Cut through the noise. Understand what AI actually is — and lose the fear.',
    minutes: 28,
    lessons: [
      {
        id: 'f1-l1',
        title: "What AI actually is (and isn't)",
        minutes: 7,
        content: `
<p>Strip away the headlines and AI is simply this: <strong>software that learns patterns from data instead of following rules a human wrote.</strong> That's it. No consciousness, no intentions, no robot uprising — a different way of building software.</p>
<h3>The nesting dolls</h3>
<p>The terms get thrown around interchangeably, but they nest inside each other:</p>
<ul>
<li><strong>Artificial Intelligence (AI)</strong> — the broad goal: machines doing tasks that normally need human intelligence (understanding language, recognizing images, making decisions).</li>
<li><strong>Machine Learning (ML)</strong> — the dominant approach to AI: instead of programming rules, you show the machine thousands of examples and it figures out the patterns itself.</li>
<li><strong>Deep Learning</strong> — a powerful family of ML that uses layered "neural networks", loosely inspired by the brain. This is what cracked vision, speech and language.</li>
<li><strong>Generative AI</strong> — deep learning models that <em>create</em> new content: text, images, code, audio. ChatGPT, Claude, Gemini and Midjourney live here.</li>
</ul>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>AI</div>
  <div class="flow-arrow">⊃</div>
  <div class="flow-step"><b>2</b>Machine Learning</div>
  <div class="flow-arrow">⊃</div>
  <div class="flow-step"><b>3</b>Deep Learning</div>
  <div class="flow-arrow">⊃</div>
  <div class="flow-step"><b>4</b>Generative AI</div>
</div>
<div class="viz-cap">The terms nest inside each other — each is a subset of the one before.</div>
<div class="callout"><strong>Office analogy:</strong> traditional software is a meticulous employee following a thick procedures manual. Machine learning is an employee who shadowed ten thousand customer calls and developed an instinct for them. Neither is magic — they were just trained differently.</div>
<h3>You already use AI every day</h3>
<p>Your email spam filter, your phone unlocking with your face, Maps rerouting you around traffic, Netflix recommendations, your bank flagging a suspicious transaction — all machine learning, quietly working for years. What changed recently isn't that AI appeared; it's that AI learned to <em>talk</em>, which made it visible — and useful — to everyone.</p>
<h3>What AI is not</h3>
<p>Today's AI doesn't "understand" the way you do, has no goals of its own, and isn't secretly plotting. It is extraordinary pattern-matching at a scale no human can match. That's both less scary and, as you'll see, more useful than the sci-fi version.</p>`,
        takeaways: [
          'AI = software that learns patterns from data instead of following hand-written rules.',
          'AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI — they nest, they are not synonyms.',
          "You've been using AI for years; generative AI just made it conversational and visible.",
        ],
        quote: {
          text: 'AI is the new electricity. Just as electricity transformed almost everything 100 years ago, today I actually have a hard time thinking of an industry that I don’t think AI will transform.',
          by: 'Andrew Ng',
          role: 'Founder, DeepLearning.AI',
        },
      },
      {
        id: 'f1-l2',
        title: '70 years in 7 minutes: how we got here',
        minutes: 7,
        content: `
<p>Knowing the arc of AI history is the fastest way to stop being intimidated by it. Every "overnight revolution" you're watching took seventy years.</p>
<h3>Act 1 — Rules (1950s–1990s)</h3>
<p>Early AI was hand-written logic: <em>if the customer says X, respond Y.</em> These "expert systems" worked for narrow problems and collapsed everywhere else — the real world has too many exceptions to write rules for. Two "AI winters" followed when hype outran reality. (Remember that pattern; it still applies.)</p>
<h3>Act 2 — Learning (1990s–2017)</h3>
<p>The field flipped the approach: stop writing rules, start learning from examples. Machine learning quietly took over spam filtering, fraud detection and search ranking. Then in <strong>2012</strong>, a deep neural network called AlexNet crushed the ImageNet image-recognition contest, and three ingredients converged for the first time:</p>
<ul>
<li><strong>Data</strong> — the internet produced oceans of text and images to learn from.</li>
<li><strong>Compute</strong> — gaming GPUs turned out to be perfect for training neural networks.</li>
<li><strong>Algorithms</strong> — decades of research finally had the fuel to work at scale.</li>
</ul>
<h3>Act 3 — Language (2017–2022)</h3>
<p>In 2017, Google researchers published the <strong>Transformer</strong> architecture ("Attention Is All You Need") — a design that could digest enormous amounts of text in parallel. OpenAI scaled it relentlessly: GPT-2, GPT-3… and in November 2022, <strong>ChatGPT</strong> put a talking transformer in everyone's browser. A hundred million users in two months.</p>
<div class="viz viz-stats">
  <div class="vstat"><b>2012</b><span>AlexNet wins ImageNet</span></div>
  <div class="vstat"><b>2017</b><span>the Transformer paper</span></div>
  <div class="vstat"><b>2022</b><span>ChatGPT launches</span></div>
  <div class="vstat"><b>100M</b><span>users in 2 months</span></div>
</div>
<div class="viz-cap">The milestones behind the "overnight" revolution.</div>
<h3>Act 4 — Reasoning and agents (2023–today)</h3>
<p>Since then: models that see, hear and speak; "reasoning" models that work through problems step by step before answering; and <strong>agents</strong> — AI that doesn't just answer questions but takes multi-step actions: researching, writing code, operating software. By 2026, a majority of large enterprises run AI agents in production for real workflows. That's the wave you're in right now.</p>
<div class="callout"><strong>The takeaway:</strong> progress came from <em>scale + learning</em>, not from machines "waking up". Each act built on the last — and each one created more demand for people who understand both the technology and the business. People like you.</div>`,
        takeaways: [
          'AI history: hand-written rules → learning from data → language models → reasoning agents.',
          'The 2012 breakthrough came from three ingredients converging: data, compute (GPUs), and algorithms.',
          'The Transformer (2017) is the architecture behind every modern AI assistant.',
        ],
        quote: {
          text: 'The hottest new programming language is English.',
          by: 'Andrej Karpathy',
          role: 'Founding member of OpenAI, former Director of AI at Tesla',
        },
        goDeeper: [
          { label: 'Karpathy — Intro to Large Language Models (1hr talk)', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g' },
        ],
      },
      {
        id: 'f1-l3',
        title: 'Why this matters for your work, specifically',
        minutes: 7,
        content: `
<p>You work in or around consulting and IT delivery. Here is the honest picture of what generative AI changes for that world — no hype, no doom.</p>
<h3>The work AI is genuinely good at</h3>
<p>Generative AI has four sweet spots, and most of professional services runs on them:</p>
<ul>
<li><strong>Drafting</strong> — first versions of emails, documents, user stories, test cases, code, slides.</li>
<li><strong>Extraction</strong> — pulling structure out of mess: requirements from meeting notes, data from PDFs, action items from transcripts.</li>
<li><strong>Synthesis</strong> — summarizing long documents, comparing options, finding themes across interviews.</li>
<li><strong>Conversation</strong> — answering questions over a knowledge base, explaining concepts, role-playing a stakeholder before a difficult meeting.</li>
</ul>
<table class="viz-table">
  <thead><tr><th>Sweet spot</th><th>What it does</th><th>In your work</th></tr></thead>
  <tbody>
    <tr><td>Drafting</td><td>Produces first versions</td><td>Emails, user stories, test cases, slides</td></tr>
    <tr><td>Extraction</td><td>Pulls structure from mess</td><td>Requirements from notes, data from PDFs</td></tr>
    <tr><td>Synthesis</td><td>Condenses and compares</td><td>Summaries, option trade-offs, interview themes</td></tr>
    <tr><td>Conversation</td><td>Answers and role-plays</td><td>Knowledge-base Q&amp;A, stakeholder rehearsal</td></tr>
  </tbody>
</table>
<p>Notice what's missing: judgment, accountability, relationships, context about <em>your</em> client's politics, and knowing what actually matters. That's the human half — your half.</p>
<h3>The realistic impact pattern</h3>
<p>Study after study lands in the same place: AI doesn't replace the role, it <strong>compresses the routine portion of the role.</strong> A consultant using AI well drafts in minutes what took hours, then spends the recovered time on the parts that were always the actual job: framing the problem, checking the answer, persuading the room. The professionals who struggle are not the ones who lack AI skills today — they're the ones who refuse to develop them.</p>
<div class="callout"><strong>The consulting reality, 2026:</strong> clients now ask delivery teams "how are you using AI on our engagement?" the way they once asked about agile. AI fluency is becoming table stakes in proposals. Being the person on the team who genuinely understands it is a career accelerator.</div>
<h3>Why "the new electricity" is the right metaphor</h3>
<p>Electricity didn't eliminate factories; it reorganized them, and the winners were the ones who redesigned work around it rather than bolting a motor onto old machinery. AI is at that same stage: every business process that involves reading, writing, deciding or communicating is being re-examined. Someone has to do that re-examination, client by client, process by process. That is consulting work, and it requires exactly the blend you have: domain knowledge plus (soon) AI literacy.</p>`,
        takeaways: [
          'AI excels at drafting, extraction, synthesis and conversation — the routine layer of knowledge work.',
          'AI compresses the routine part of a role; judgment, context and accountability stay human.',
          'Domain expertise + AI literacy is the combination clients now pay for.',
        ],
        quote: {
          text: 'AI won’t replace managers, but managers who use AI will replace managers who don’t.',
          by: 'Rob Thomas',
          role: 'SVP, IBM',
        },
      },
      {
        id: 'f1-l4',
        title: 'From fear to fluency: the co-intelligence mindset',
        minutes: 7,
        content: `
<p>If AI makes you anxious, you're in the majority — and the anxiety usually comes from two things: not knowing how it works (we'll fix that in the next modules) and not knowing where you stand (we'll fix that right now).</p>
<h3>The jagged frontier</h3>
<p>Wharton professor Ethan Mollick describes AI's ability as a <strong>"jagged frontier"</strong>: it is astonishingly good at some hard tasks and embarrassingly bad at some easy ones — and the boundary is invisible until you test it. AI can draft a sophisticated strategy memo, then confidently miscount the number of words in it. People who fear AI imagine the frontier is a wall far above them. People who use AI daily know it's a jagged line they learn to trace.</p>
<h3>Mollick's four rules</h3>
<p>From his book <em>Co-Intelligence</em>, four rules that turn anxiety into a working relationship:</p>
<ul>
<li><strong>1. Always invite AI to the table.</strong> Try it on everything you legally and ethically can. You can't learn the frontier from articles — only from use.</li>
<li><strong>2. Be the human in the loop.</strong> You review, you verify, you decide, you own the outcome. AI drafts; you sign.</li>
<li><strong>3. Treat it like a person (a smart, alien one).</strong> Brief it the way you'd brief a talented new joiner: context, role, examples, what good looks like. You'll get 10x better results than typing keywords.</li>
<li><strong>4. Assume this is the worst AI you will ever use.</strong> Every capability you learn today compounds, because the tools only get stronger.</li>
</ul>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Invite AI to the table</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Be the human in the loop</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Treat it like a person</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>4</b>Assume it only improves</div>
</div>
<div class="viz-cap">Mollick's four rules for turning anxiety into a working relationship.</div>
<h3>Learning it the right way</h3>
<p>One more mindset, from Andrej Karpathy — one of the clearest teachers in AI. He warns against the <em>"shortification of learning"</em>: ten-minute videos and listicles that feel like learning but are really entertainment. Real learning, he says, should feel like effort — "the mental equivalent of sweating." This platform takes that seriously: short focused lessons, yes, but with <strong>knowledge checks that make you retrieve what you learned</strong>, and <strong>projects that make you apply it</strong>. Your tree out there grows when you do the work, not when you skim.</p>
<div class="callout"><strong>Your unfair advantage:</strong> you already know how businesses actually run — the messy processes, the politics, the edge cases. AI knowledge is learnable in weeks. Your domain judgment took years. Combining them is the whole game.</div>`,
        takeaways: [
          "AI's skill is a jagged frontier — superhuman at some tasks, surprisingly weak at others. You learn it by using it.",
          'Four rules: invite AI to the table, stay in the loop, treat it like a smart alien colleague, assume it only gets better.',
          'Real learning takes effort — knowledge checks and projects here exist to make it stick.',
        ],
        quote: {
          text: 'Learning is not supposed to be fun… the primary feeling should be that of effort. You want the mental equivalent of sweating.',
          by: 'Andrej Karpathy',
          role: 'On the "shortification of learning"',
        },
        goDeeper: [
          { label: 'Karpathy — on shortification of learning (original post)', url: 'https://x.com/karpathy/status/1756380066580455557' },
        ],
      },
    ],
    quiz: {
      passPct: 70,
      questions: [
        {
          q: 'Which statement best describes the relationship between AI, machine learning and generative AI?',
          options: [
            'They are three different names for the same technology',
            'Generative AI is a type of deep learning, which is a type of machine learning, which is an approach to AI',
            'Machine learning replaced AI, and generative AI replaced machine learning',
            'AI is the software, ML is the hardware, generative AI is the interface',
          ],
          answer: 1,
          explain: 'The terms nest: AI is the broad goal, ML is the learn-from-data approach, deep learning is ML with neural networks, and generative AI is deep learning that creates content.',
        },
        {
          q: 'What three ingredients converged around 2012 to make deep learning take off?',
          options: [
            'Quantum computing, 5G networks and the cloud',
            'Big data, GPU compute power and improved algorithms',
            'Smartphones, social media and app stores',
            'Government funding, open source and robotics',
          ],
          answer: 1,
          explain: 'Internet-scale data, GPUs (originally built for gaming) and decades of algorithm research finally came together — that combination powered the deep learning era.',
        },
        {
          q: 'What does Ethan Mollick mean by AI\'s "jagged frontier"?',
          options: [
            'AI development moves in unpredictable boom-and-bust cycles',
            'AI is uniformly better than humans at analytical tasks',
            'AI is surprisingly strong at some hard tasks and surprisingly weak at some easy ones, with an invisible boundary',
            'AI capabilities differ dramatically between vendors',
          ],
          answer: 2,
          explain: 'The frontier of AI capability is jagged: it can write a brilliant strategy memo yet fail simple arithmetic. You learn the shape of the frontier only by using AI and verifying its output.',
        },
        {
          q: 'According to the lesson, what is the realistic impact of generative AI on consulting-style roles?',
          options: [
            'It replaces most roles within a few years',
            'It compresses the routine portion of roles, shifting human time toward judgment, verification and relationships',
            'It has no measurable impact on professional services',
            'It only affects software developers',
          ],
          answer: 1,
          explain: 'Evidence so far shows AI absorbing the routine drafting/extraction/synthesis layer, while framing, judgment and accountability remain human — and become a larger share of the job.',
        },
        {
          q: 'Karpathy\'s warning about the "shortification of learning" implies that the best way to learn AI is to…',
          options: [
            'Watch as many short explainer videos as possible',
            'Wait until the technology stabilizes before learning',
            'Engage in effortful practice — retrieve, apply and build, not just consume',
            'Memorize key terminology and definitions',
          ],
          answer: 2,
          explain: 'Karpathy argues content that feels easy is usually entertainment, not education. Learning requires effort: notes, re-reading, manipulation of ideas, and building things.',
        },
      ],
    },
  },

  {
    id: 'f2',
    kind: 'foundation',
    order: 2,
    emoji: '⚙️',
    title: 'How Machines Learn',
    skill: 'ML Intuition',
    tagline: 'Build a genuine intuition for training, weights and loss — no math degree required.',
    minutes: 26,
    lessons: [
      {
        id: 'f2-l1',
        title: 'Learning from examples, not rules',
        minutes: 6,
        content: `
<p>Here is the single most important mental shift in this entire course. Traditional software and machine learning solve problems in opposite directions.</p>
<h3>Software 1.0: rules in, answers out</h3>
<p>For seventy years, building software meant a human writing explicit instructions: <em>if the email contains "FREE OFFER!!!" then mark as spam.</em> This works brilliantly when the rules are knowable. Payroll, invoicing, inventory — Software 1.0 runs the world.</p>
<p>But try writing rules for "is there a cat in this photo?" or "what does this customer email actually want?" Millions of edge cases. Every rule you write, reality breaks.</p>
<h3>Software 2.0: examples in, rules out</h3>
<p>Machine learning inverts the process. Instead of writing the rules, you collect <strong>examples with answers</strong> — 100,000 emails labeled spam/not-spam — and the algorithm <em>finds the rules itself</em>, encoding them as millions of numbers inside a model. Andrej Karpathy named this <strong>Software 2.0</strong>: the program isn't written by a programmer; it's <em>grown</em> from data. The developer's job shifts from writing logic to curating examples and defining what "good" means.</p>
<div class="viz viz-vs">
  <div class="vs-side"><h4>Software 1.0</h4><p>Humans write explicit rules. Rules in, answers out. Great when the logic is knowable — payroll, invoicing, inventory.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side good"><h4>Software 2.0</h4><p>The model learns rules from labeled examples. Examples in, rules out — encoded as weights. Wins on fuzzy, pattern-rich tasks.</p></div>
</div>
<div class="callout"><strong>New-joiner analogy:</strong> Software 1.0 is handing a new hire a 400-page procedures manual. Software 2.0 is having them sit with your best agent for a month and absorb how it's done. The second one handles novel situations far better — and you can't fully explain how it does it. Both of those properties carry over to AI.</div>
<h3>Why this matters to you</h3>
<p>Almost every practical property of AI — why it needs data, why it can be confidently wrong, why you test it with examples instead of reading its code, why "garbage in, garbage out" — follows directly from this one idea: <strong>the behavior was learned, not specified.</strong> Hold onto that; the rest of the course keeps cashing it in.</p>`,
        takeaways: [
          'Traditional software: humans write rules. Machine learning: machines derive rules from labeled examples.',
          'Karpathy calls ML "Software 2.0" — programs grown from data rather than written by hand.',
          "Most of AI's quirks (data hunger, opacity, confident errors) follow from behavior being learned, not specified.",
        ],
        quote: {
          text: 'Software 2.0 is written in much more abstract, human unfriendly language, such as the weights of a neural network. No human is involved in writing this code.',
          by: 'Andrej Karpathy',
          role: 'From the essay "Software 2.0" (2017)',
        },
      },
      {
        id: 'f2-l2',
        title: 'Knobs and scores: weights, loss and training',
        minutes: 7,
        content: `
<p>"The model learns" sounds mystical. It isn't. Here's the whole mechanism, honestly, in four ideas.</p>
<h3>1. A model is a machine with knobs</h3>
<p>Picture a giant mixing desk with millions of adjustable knobs. Data goes in one side (an email, an image), a prediction comes out the other ("spam: 92%"). Each knob — called a <strong>weight</strong> — slightly changes how the input is transformed into output. Before training, the knobs are random and predictions are garbage.</p>
<h3>2. The loss is the score of wrongness</h3>
<p>Show the model an example you know the answer to. Compare its prediction to the truth. The gap is measured by a single number called the <strong>loss</strong> — think of it as a golf score: lower is better, zero is perfect.</p>
<h3>3. Training is turning knobs to lower the score</h3>
<p>Now the clever part. For every knob, mathematics (calculus, specifically <em>backpropagation</em>) can tell you: "turning this knob slightly up makes the loss worse; slightly down makes it better." So you nudge all million knobs a tiny step in their improving direction, then try the next example. Repeat billions of times. This is <strong>gradient descent</strong> — like descending a foggy mountain by always stepping downhill, even though you can't see the valley.</p>
<h3>4. Learning is what improvement looks like from outside</h3>
<p>No single step is intelligent. But run the loop long enough and the knob settings come to encode real patterns: "exclamation marks plus money words plus unknown sender — probably spam." Nobody wrote that rule. It condensed out of the data.</p>
<div class="callout"><strong>Want to feel it in your hands?</strong> Karpathy's famous <em>Zero to Hero</em> series builds this exact loop — knobs, loss, backpropagation — in about 100 lines of Python, from scratch, live. It's the single best deep dive if (and only if) you want to go beneath this course. Not required; everything here stands without it.</div>
<p>That's the secret. Every AI model you'll ever discuss in a meeting — including the trillion-knob model you chat with — was trained by this same humble loop: <strong>guess, score, nudge, repeat.</strong></p>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Guess</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Score (loss)</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Nudge weights</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>4</b>Repeat</div>
</div>
<div class="viz-cap">The training loop, run billions of times.</div>`,
        takeaways: [
          'A model = millions of adjustable numbers (weights). The loss = a single score of how wrong it is.',
          'Training = repeatedly nudging every weight in the direction that lowers the loss (gradient descent).',
          'Intelligence-looking behavior emerges from billions of tiny dumb improvements — no magic step anywhere.',
        ],
        quote: {
          text: 'The most dramatic optimization to your learning is to build things end to end yourself.',
          by: 'Andrej Karpathy',
          role: 'On learning by building',
        },
        goDeeper: [
          { label: 'Karpathy — Neural Networks: Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html' },
        ],
      },
      {
        id: 'f2-l3',
        title: 'The three ways machines learn',
        minutes: 6,
        content: `
<p>Nearly every ML system you'll encounter uses one of three learning recipes. Knowing which is which lets you instantly orient in any AI conversation.</p>
<h3>Supervised learning: learning with an answer key</h3>
<p>You provide examples <em>with correct answers</em> (labels): emails marked spam/not-spam, loan applications marked repaid/defaulted, X-rays marked healthy/anomalous. The model learns to map input → answer. This is the workhorse of enterprise ML — <strong>most business AI before ChatGPT was supervised learning</strong>: fraud detection, churn prediction, document classification, demand forecasting.</p>
<h3>Unsupervised learning: finding structure without answers</h3>
<p>You provide data with <em>no labels</em> and ask the model to find structure: cluster these 50,000 customers into natural segments; flag transactions that look unlike the others (anomaly detection); group support tickets by theme. It's exploratory — great when you don't know what you're looking for.</p>
<h3>Reinforcement learning: learning from consequences</h3>
<p>No answer key at all — the model <em>acts</em>, receives rewards or penalties, and learns strategies that maximize reward over time. This trained AlphaGo to beat the world Go champion, and — surprisingly relevant to you — it's part of how chat assistants were taught to be helpful (more in Module 4).</p>
<table class="viz-table">
  <thead><tr><th>Type</th><th>What the data looks like</th><th>Classic use</th></tr></thead>
  <tbody>
    <tr><td>Supervised</td><td>Examples with correct answers (labels)</td><td>Fraud, churn, document classification</td></tr>
    <tr><td>Unsupervised</td><td>Data with no labels</td><td>Customer segments, anomaly detection</td></tr>
    <tr><td>Reinforcement</td><td>Actions, rewards and penalties</td><td>AlphaGo, training chat assistants</td></tr>
  </tbody>
</table>
<div class="callout"><strong>Quick orientation trick for meetings:</strong> "Did we have labeled historical examples?" → supervised. "Were we hunting for hidden groupings or oddballs?" → unsupervised. "Did it learn by trial, error and reward?" → reinforcement. You now out-orient most of the room.</div>
<h3>Where do chatbots fit?</h3>
<p>Large language models are trained with a clever twist on supervised learning: the "label" for each piece of text is simply <em>the next word</em>, which means the internet itself becomes an inexhaustible answer key — no human labeling required. That one trick unlocked everything, and it's exactly where Module 4 picks up.</p>`,
        takeaways: [
          'Supervised = learning from labeled examples; powers most enterprise ML (fraud, churn, forecasting).',
          'Unsupervised = finding clusters and anomalies in unlabeled data.',
          'Reinforcement = learning strategies from rewards; LLMs use next-word prediction as a self-generating answer key.',
        ],
        quote: {
          text: 'It is important to understand core concepts behind how and why machine learning works — bias/variance, cost functions, optimization — more than any single model.',
          by: 'Andrew Ng',
          role: 'From "How to Build Your Career in AI"',
        },
      },
      {
        id: 'f2-l4',
        title: 'Data is the syllabus (and other hard truths)',
        minutes: 7,
        content: `
<p>If a model learns from examples, then the examples <em>are</em> the curriculum. Four consequences follow, and they explain most real-world AI failures you'll ever see in a project.</p>
<h3>1. Garbage in, garbage out — now with confidence</h3>
<p>A model trained on messy, outdated or unrepresentative data produces messy, outdated, unrepresentative predictions — fluently and confidently. Data quality work isn't the boring prelude to an AI project; in practice <strong>it usually <em>is</em> the project</strong>. Consultants who internalize this save clients millions.</p>
<h3>2. Bias rides in with the data</h3>
<p>A hiring model trained on a decade of biased decisions learns the bias as if it were signal — famously, one major tech company scrapped a recruiting model that penalized résumés containing the word "women's". The model wasn't malicious; it was an honest mirror. This is why "where did the training data come from?" is one of the most professional questions you can ask in any AI evaluation.</p>
<h3>3. Memorizing isn't learning: overfitting</h3>
<p>A student who memorizes past exam papers aces the practice test and bombs the real one. Models do the same — it's called <strong>overfitting</strong>: nailing the training data while failing on anything new. The defense is simple and universal: <strong>hold back some data the model never saw during training, and grade it on that.</strong> Performance on unseen data is the only number that matters.</p>
<h3>4. Therefore: evaluation is everything</h3>
<p>You can't read a model's millions of weights to check if it's correct — the only way to know what a learned system does is to <em>test it on examples and measure</em>. This idea, called <strong>evals</strong>, has become the beating heart of professional AI work in the LLM era, and it shows up again and again in your persona track. When someone demos an AI feature and you ask "how does it perform on cases it hasn't seen — and how do you measure that?", you are asking the expert question.</p>
<table class="viz-table">
  <thead><tr><th>Hard truth</th><th>Why it bites</th><th>What to do</th></tr></thead>
  <tbody>
    <tr><td>Garbage in, garbage out</td><td>Bad data, bad predictions — fluently</td><td>Treat data quality as the project</td></tr>
    <tr><td>Bias rides in</td><td>The model mirrors biased history</td><td>Ask where the data came from</td></tr>
    <tr><td>Overfitting</td><td>Memorizes instead of generalizing</td><td>Grade on held-out, unseen data</td></tr>
    <tr><td>Evaluation is everything</td><td>You can't read the weights</td><td>Test on examples and measure (evals)</td></tr>
  </tbody>
</table>
<div class="callout"><strong>Module complete — pattern unlocked.</strong> Learned behavior + data as syllabus + testing on unseen examples: with these three ideas you can reason soundly about almost any AI system, including the large language models coming up next.</div>`,
        takeaways: [
          'Data quality and representativeness determine model quality — that work usually IS the project.',
          'Models inherit the biases of their training data; always ask where the data came from.',
          'Overfitting = memorizing instead of generalizing; the cure is testing on data the model never saw (evals).',
        ],
        quote: {
          text: 'Everyone talks about the model. The teams that win obsess over the data.',
          by: 'Andrew Ng',
          role: 'On data-centric AI',
        },
      },
    ],
    quiz: {
      passPct: 70,
      questions: [
        {
          q: 'What is the fundamental difference between traditional software (1.0) and machine learning (Software 2.0)?',
          options: [
            'Software 2.0 runs in the cloud while 1.0 runs on-premises',
            'In 1.0 humans write explicit rules; in 2.0 the rules are learned from examples and stored as weights',
            'Software 2.0 is written in Python instead of Java',
            'Software 2.0 requires no data to function',
          ],
          answer: 1,
          explain: 'Karpathy\'s framing: Software 1.0 is hand-written logic; Software 2.0 is behavior learned from curated data and encoded in neural network weights no human wrote.',
        },
        {
          q: 'In training, what does the "loss" represent?',
          options: [
            'The financial cost of training the model',
            'The amount of data lost during processing',
            'A single number measuring how wrong the model\'s predictions are — lower is better',
            'The percentage of weights that get deleted',
          ],
          answer: 2,
          explain: 'Loss is the score of wrongness. Training is the loop of nudging every weight in the direction that lowers it — gradient descent.',
        },
        {
          q: 'A client wants to group 50,000 customers into natural segments without any predefined categories. Which learning type fits?',
          options: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Transfer learning'],
          answer: 1,
          explain: 'No labels, looking for hidden structure → unsupervised learning (clustering). Labeled answers → supervised. Rewards from actions → reinforcement.',
        },
        {
          q: 'A model performs brilliantly on its training data but poorly on new, unseen cases. What is this called and what is the standard defense?',
          options: [
            'Underfitting; add more layers to the model',
            'Hallucination; use a bigger prompt',
            'Overfitting; evaluate on held-out data the model never saw during training',
            'Drift; retrain the model weekly',
          ],
          answer: 2,
          explain: 'That is overfitting — memorizing instead of generalizing. The universal defense is keeping a held-out test set and trusting only performance on unseen data.',
        },
        {
          q: 'Why did a famous recruiting model end up penalizing résumés containing the word "women\'s"?',
          options: [
            'A programmer wrote a biased rule into the code',
            'The model faithfully learned patterns from a decade of biased historical hiring data',
            'The training hardware malfunctioned',
            'Competitors sabotaged the training process',
          ],
          answer: 1,
          explain: 'Models mirror their training data. Historical bias in past decisions becomes learned "signal" unless actively detected and corrected — which is why data provenance questions matter so much.',
        },
      ],
    },
  },

  {
    id: 'f3',
    kind: 'foundation',
    order: 3,
    emoji: '🧠',
    title: 'Neural Networks & Deep Learning',
    skill: 'Deep Learning',
    tagline: 'What neural networks really are, why depth matters, and why they changed everything.',
    minutes: 24,
    lessons: [
      {
        id: 'f3-l1',
        title: 'A neuron you can actually understand',
        minutes: 6,
        content: `
<p>"Neural network" sounds like wet brain tissue in a server rack. The reality is simpler — and once you see one neuron, you've essentially seen them all.</p>
<h3>One neuron = a tiny weighted vote</h3>
<p>An artificial neuron does three things:</p>
<ul>
<li><strong>Takes several input numbers</strong> — say, signals from other neurons.</li>
<li><strong>Multiplies each by a weight</strong> — the importance assigned to that input (these are the knobs from Module 2).</li>
<li><strong>Sums them up and applies a threshold</strong> — if the total is strong enough, the neuron "fires" and passes a signal onward.</li>
</ul>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Take inputs</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Multiply by weights</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Sum and threshold</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>4</b>Fire</div>
</div>
<div class="viz-cap">One neuron: a tiny weighted vote.</div>
<div class="callout"><strong>Committee analogy:</strong> a neuron is a committee member deciding whether to escalate an issue. They listen to several colleagues, trust some more than others (weights), and speak up only if the overall signal crosses their threshold. One member is trivial. A hierarchy of thousands, each tuned by training, can collectively recognize a face.</div>
<h3>A network = neurons in layers</h3>
<p>Stack neurons into <strong>layers</strong>: the first layer reads raw input (pixel values, word codes), each later layer reads the outputs of the one before, and a final layer produces the answer ("cat: 96%"). Information flows forward through the layers; during training, corrections flow backward (that's backpropagation, adjusting all the weights as in Module 2).</p>
<h3>Is it like the brain?</h3>
<p>Loosely inspired, honestly different. Real neurons are vastly more complex, and brains learn from far less data. The honest claim is humbler and more useful: artificial neural networks are <strong>flexible function-approximators</strong> — given enough neurons and examples, they can learn to approximate almost any input→output mapping. That flexibility, not biological realism, is their superpower.</p>
<p>And scale matters: modern frontier models stack <em>hundreds of billions to trillions</em> of these weighted votes. Same simple unit you just learned — multiplied beyond intuition.</p>`,
        takeaways: [
          'A neuron = weighted inputs, summed, passed through a threshold. That is genuinely all of it.',
          'Networks stack neurons in layers; predictions flow forward, corrections flow backward.',
          'Neural nets are universal pattern-approximators — flexibility at scale is the superpower, not brain mimicry.',
        ],
        quote: {
          text: 'Neural networks are not just another classifier; they represent a fundamental shift in how we write software.',
          by: 'Andrej Karpathy',
          role: 'From "Software 2.0"',
        },
      },
      {
        id: 'f3-l2',
        title: "Why 'deep' changes everything: layers build concepts",
        minutes: 6,
        content: `
<p>The "deep" in deep learning just means <em>many layers</em>. But what those layers do is the most beautiful idea in modern AI.</p>
<h3>A hierarchy of understanding</h3>
<p>Peek inside a deep network trained to recognize faces and you find a conceptual assembly line:</p>
<ul>
<li><strong>Early layers</strong> detect primitive patterns: edges, color gradients, corners.</li>
<li><strong>Middle layers</strong> combine edges into parts: eyes, noses, textures.</li>
<li><strong>Late layers</strong> combine parts into wholes: faces, specific people.</li>
</ul>
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Edges &amp; gradients</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Parts: eyes, noses</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Whole faces</div>
</div>
<div class="viz-cap">Each layer builds on the last — a hierarchy that emerges from training.</div>
<p>Nobody programmed that hierarchy. It <strong>emerges from training</strong>, because layered concepts are simply the most efficient way to compress the patterns in the data. Language models develop the same kind of internal hierarchy for grammar, facts, style and reasoning patterns.</p>
<h3>The end of hand-crafted features</h3>
<p>Before deep learning, experts spent years hand-designing "features" — measurable signals like "distance between the eyes" — and the machine only learned the final step. Deep learning automated the expertise itself: <strong>raw data in, useful internal representations learned automatically.</strong> This is called <em>representation learning</em>, and it's why one architecture family conquered vision, speech, language and protein folding within a single decade.</p>
<div class="callout"><strong>Org-chart analogy:</strong> a shallow model is one heroic analyst staring at raw data. A deep network is an organization: junior staff spot raw details, managers synthesize them into patterns, executives form judgments. The org structure — who attends to what — is itself learned from experience.</div>
<h3>The bitter-sweet lesson</h3>
<p>Researcher Rich Sutton's famous "Bitter Lesson" observes that across 70 years of AI, general methods that scale with compute beat clever hand-engineered ones — every time. Deep learning is the proof. The practical reading for you: <strong>betting on scale and data has consistently beaten betting on human cleverness</strong> — which is exactly why models keep improving and why Mollick's rule ("the worst AI you'll ever use") keeps being right.</p>`,
        takeaways: [
          'Depth = layers, and layers learn a hierarchy: edges → parts → concepts. Nobody programs this; it emerges.',
          'Deep learning automated feature engineering — raw data in, learned representations out.',
          "The 'Bitter Lesson': general methods that scale beat hand-crafted cleverness, which is why AI keeps improving.",
        ],
        quote: {
          text: 'The biggest lesson… is that general methods that leverage computation are ultimately the most effective, and by a large margin.',
          by: 'Rich Sutton',
          role: 'From "The Bitter Lesson" (2019)',
        },
      },
      {
        id: 'f3-l3',
        title: 'Deep learning in the wild: what it powers today',
        minutes: 6,
        content: `
<p>Deep learning isn't a lab curiosity — it's been production infrastructure for a decade. A tour of what it quietly runs, so you can connect concepts to things you've already touched.</p>
<h3>Vision</h3>
<p>Face unlock on your phone, document/ID scanning in banking apps, defect detection on factory lines, tumor flagging in radiology, checkout-free stores, self-driving perception. Computer vision was deep learning's first conquest (that 2012 ImageNet moment) and is now boring, reliable plumbing in hundreds of industries.</p>
<h3>Speech and audio</h3>
<p>Meeting transcription (Teams, Zoom), voice assistants, real-time translation, voice cloning for audiobooks and accessibility. Speech recognition error rates fell off a cliff in the mid-2010s for one reason: deep networks replaced two decades of hand-built acoustic pipelines.</p>
<h3>Language and recommendations</h3>
<p>Search ranking, Translate, autocomplete, spam filtering, and the recommendation engines that decide what you see on Netflix, YouTube, Spotify, LinkedIn and TikTok — all deep learning, all pre-ChatGPT. (Yes: the algorithmic feed that shapes public attention is a neural network optimizing engagement. Worth knowing when you think about AI's social impact.)</p>
<h3>Science and industry</h3>
<p>DeepMind's <strong>AlphaFold</strong> solved protein structure prediction — a 50-year grand challenge — accelerating drug discovery worldwide, and won its creators the 2024 Nobel Prize in Chemistry. Deep learning also powers weather forecasting upgrades, chip design, materials discovery and grid optimization.</p>
<table class="viz-table">
  <thead><tr><th>Domain</th><th>What it quietly runs</th></tr></thead>
  <tbody>
    <tr><td>Vision</td><td>Face unlock, ID scanning, defect detection, radiology</td></tr>
    <tr><td>Speech &amp; audio</td><td>Meeting transcription, voice assistants, translation</td></tr>
    <tr><td>Language &amp; recommendations</td><td>Search ranking, spam filtering, the feeds you scroll</td></tr>
    <tr><td>Science &amp; industry</td><td>AlphaFold, weather forecasting, chip and materials design</td></tr>
  </tbody>
</table>
<div class="callout"><strong>The pattern to remember:</strong> deep learning wins wherever there is (1) lots of data, (2) complex patterns no human can fully articulate, and (3) tolerance for occasional error backed by human oversight. That three-part test is reusable — apply it whenever someone proposes "let's use AI for X", and you'll sound like you've done this for years.</div>`,
        takeaways: [
          'Deep learning has been production infrastructure for a decade: vision, speech, search, recommendations.',
          'AlphaFold solving protein folding (and winning a Nobel) shows deep learning advancing science itself.',
          'Reusable test for AI fit: lots of data + patterns humans can\'t articulate + tolerance for managed error.',
        ],
        quote: {
          text: 'AI could be the most beneficial technology ever — if we get it right. AlphaFold shows what is possible when we apply it to real scientific problems.',
          by: 'Demis Hassabis',
          role: 'CEO & co-founder, Google DeepMind; Nobel laureate 2024',
        },
      },
      {
        id: 'f3-l4',
        title: "The math question: what you need, what you don't",
        minutes: 6,
        content: `
<p>The #1 silent fear of professionals approaching AI: "I'll hit a wall of math." Let's settle it honestly, because the answer depends on what you're trying to become.</p>
<h3>What practitioners actually need (you, most likely)</h3>
<p>To work <em>with</em> AI and around AI projects — as a PO, BA, QA, consultant or leader — you need <strong>concepts, not calculus</strong>:</p>
<ul>
<li>What training is (knobs + loss + nudging — you have this).</li>
<li>What models can and can't do, and why they fail the ways they fail.</li>
<li>How quality is measured (evals, held-out data — you have this too).</li>
<li>What things cost and how long they take.</li>
</ul>
<p>That's the working vocabulary of an effective AI-era professional, and this course delivers all of it. Nobody in your steering committee will ever ask you to derive backpropagation.</p>
<h3>What builders need</h3>
<p>Developers <em>building</em> AI features mostly call models through APIs — modern AI engineering is closer to systems integration plus rigorous testing than to mathematics. The deep math lives inside the model providers' research teams.</p>
<div class="viz viz-vs">
  <div class="vs-side good"><h4>Practitioners (you)</h4><p>Concepts, not calculus: what training is, what models can and can't do, how quality is measured, what things cost.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side"><h4>Builders</h4><p>Mostly API integration plus rigorous testing. The deep math stays with the model providers' research teams.</p></div>
</div>
<h3>If you want to go deeper anyway — the Karpathy path</h3>
<p>If the inner machinery genuinely calls to you, there is a gold-standard route: Karpathy's free <em>Neural Networks: Zero to Hero</em> series. You build everything from scratch in Python — a tiny training engine (micrograd), then language models, then a small GPT — coding along with him, exactly the effortful learning he preaches. Required background: basic Python and a vague memory of high-school calculus. It is genuinely demanding and genuinely transformative. It is also <strong>completely optional</strong> for every track in this platform.</p>
<div class="callout"><strong>Permission slip, formally issued:</strong> "I understand the concepts deeply and I don't do the calculus" is a legitimate, senior, professional position. The industry runs on people exactly like that. Choose depth where it serves your goals — Karpathy himself teaches on-demand learning: learn what your project needs, when it needs it.</div>`,
        takeaways: [
          'Practitioners need concepts (training, capabilities, evals, costs) — not calculus. You already have the core.',
          'AI engineering today is mostly API integration plus rigorous testing, not mathematics.',
          'Karpathy\'s Zero to Hero is the gold-standard optional deep dive: build a GPT from scratch to truly understand it.',
        ],
        quote: {
          text: 'What I cannot create, I do not understand.',
          by: 'Richard Feynman',
          role: 'Karpathy\'s favorite maxim — and the motto of Zero to Hero',
        },
        goDeeper: [
          { label: 'Neural Networks: Zero to Hero (free course)', url: 'https://karpathy.ai/zero-to-hero.html' },
          { label: '3Blue1Brown — But what is a neural network? (visual)', url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
        ],
      },
    ],
    quiz: {
      passPct: 70,
      questions: [
        {
          q: 'What does a single artificial neuron actually do?',
          options: [
            'Stores one fact from the training data',
            'Multiplies inputs by weights, sums them, and fires if the total crosses a threshold',
            'Executes one line of hand-written code',
            'Simulates a biological neuron in full detail',
          ],
          answer: 1,
          explain: 'A neuron is a tiny weighted vote: weighted inputs, summed, thresholded. All the power comes from stacking millions of them in trained layers.',
        },
        {
          q: 'What do the layers of a deep network trained on faces typically learn, from early to late?',
          options: [
            'Random noise that gradually becomes data',
            'Edges → facial parts (eyes, noses) → whole faces — an emergent hierarchy nobody programmed',
            'Names → addresses → biometric records',
            'Each layer learns a complete copy of the task at increasing resolution',
          ],
          answer: 1,
          explain: 'Depth lets networks build concepts hierarchically: primitives in early layers, parts in the middle, whole concepts late. This emerges from training — it is not designed in.',
        },
        {
          q: 'What was the key change deep learning brought versus earlier machine learning?',
          options: [
            'It removed the need for any training data',
            'It made models fully explainable',
            'It learns useful features/representations automatically from raw data, ending hand-crafted feature engineering',
            'It runs without computers',
          ],
          answer: 2,
          explain: 'Representation learning is the revolution: raw data in, learned features out. That is why one method family conquered vision, speech, language and protein folding in a decade.',
        },
        {
          q: 'A client proposes "let\'s use AI for X". Per the lesson, which three-part test tells you whether deep learning fits?',
          options: [
            'Big budget + executive sponsor + vendor available',
            'Lots of data + patterns humans can\'t fully articulate + tolerance for managed error',
            'Cloud infrastructure + Python developers + GPUs',
            'Regulatory approval + labeled data + small scope',
          ],
          answer: 1,
          explain: 'Deep learning wins where data is plentiful, the patterns resist explicit rules, and occasional errors can be managed with human oversight. Reuse this test in real engagements.',
        },
        {
          q: 'How much math does a product owner, BA or consultant need to work effectively on AI projects?',
          options: [
            'University-level calculus and linear algebra',
            'None — and no conceptual understanding either',
            'Conceptual fluency (training, evals, capabilities, costs) — the calculus is optional depth, not a requirement',
            'Enough to implement backpropagation from memory',
          ],
          answer: 2,
          explain: 'Concepts, not calculus. Deep math lives with model providers; effective professionals need working intuition for training, evaluation, capability and cost. Going deeper (e.g. Zero to Hero) is a choice, not a gate.',
        },
      ],
    },
  },
];
