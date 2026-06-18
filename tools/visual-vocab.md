# Lesson Visual Vocabulary

Reusable, theme-aware visual components for embedding inside a lesson's `content`
HTML string. Goal: make lessons feel **light, visual and to the point** — replace
or punctuate walls of text with an infographic, chart, table or comparison.

## Hard rules (read carefully)

- `content` is a **JavaScript backtick template literal**. Inside your added HTML:
  - **NEVER** use a backtick `` ` `` or a `${` sequence.
  - Use **double quotes** for HTML attributes.
  - Apostrophes in text are fine.
- Use **only** the classes below. No new class names. No inline `style` except the
  bar-fill width (`style="width:72%"`).
- **Do not invent numbers/statistics.** Only use figures that appear in the lesson's
  own prose or takeaways. If there's no real number, use qualitative bars/labels or a
  table/comparison instead — never fabricate data.
- Keep it tasteful: aim for **one strong visual per lesson** (two only if the lesson
  is long and a second genuinely helps). Decoration for its own sake is worse than none.
- Place each visual **next to the prose it illustrates** (right after that paragraph).
- Do **not** change `takeaways`, `quote`, `quiz`, `id`, `title`, `minutes`, `skill`.

## Components (copy these shapes)

### Stat strip — a few punchy numbers
```html
<div class="viz viz-stats">
  <div class="vstat"><b>~75%</b><span>of a word per token</span></div>
  <div class="vstat"><b>2017</b><span>the Transformer paper</span></div>
  <div class="vstat"><b>100M</b><span>users in 2 months</span></div>
</div>
```

### Comparison table
```html
<table class="viz-table">
  <thead><tr><th>Approach</th><th>Who writes the rules</th><th>Best for</th></tr></thead>
  <tbody>
    <tr><td>Software 1.0</td><td>Humans, by hand</td><td>Known, stable logic</td></tr>
    <tr><td>Software 2.0</td><td>Learned from data</td><td>Fuzzy, pattern-rich tasks</td></tr>
  </tbody>
</table>
```

### A vs B (two sides; optional `good`/`bad` accent classes)
```html
<div class="viz viz-vs">
  <div class="vs-side good"><h4>Augment</h4><p>AI proposes, human disposes. Low bar to ship.</p></div>
  <div class="vs-mid">vs</div>
  <div class="vs-side"><h4>Automate</h4><p>Removes the human. Needs near-perfect reliability.</p></div>
</div>
```

### Labeled bar chart (qualitative or real %)
```html
<div class="viz viz-bars">
  <div class="bar"><span class="bar-l">Drafting</span><span class="bar-track"><i style="width:90%"></i></span><span class="bar-v">high</span></div>
  <div class="bar"><span class="bar-l">Verifying</span><span class="bar-track"><i style="width:40%"></i></span><span class="bar-v">low</span></div>
</div>
```

### Numbered flow / pipeline
```html
<div class="viz viz-flow">
  <div class="flow-step"><b>1</b>Chunk</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>2</b>Embed</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>3</b>Retrieve</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step"><b>4</b>Generate</div>
</div>
```

### Optional caption under any `.viz`
```html
<div class="viz-cap">RAG in four steps.</div>
```

## Validation (every agent must do this before finishing)

```bash
node --input-type=module --check < <your-file>          # syntax OK
node -e "import('./<your-file>').then(()=>console.log('loads ok'))"  # imports OK
```
Both must succeed. If you break the file, fix it.
