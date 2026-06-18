# 🌳 learn.ai — Grow your understanding of AI

> From a seed of curiosity to a banyan of knowledge.

**learn.ai** is a calm, curated learning platform that takes consulting and IT professionals — product owners, developers, business analysts, QA engineers and delivery leaders — from *"what even is AI?"* to genuine professional confidence.

It is a **zero-build, offline-capable Progressive Web App**: pure HTML/CSS/JS, no frameworks, no bundler, no server. Host it on GitHub Pages, open it on any phone or desktop, install it to your home screen, and learn — even offline.

---

## Why this exists

Most professionals around AI today are *puzzled and a little scared* — endless headlines, vendor noise, and no idea what to learn or how. learn.ai answers that with three design decisions:

1. **Curated, persona-based paths.** Everyone shares a six-module foundation; your role (PO / Dev / BA / QA / Leader) then shapes a specialist track written for your actual day-to-day work — not generic ML trivia.
2. **A learning philosophy that works**, borrowed from the best teachers in the field:
   - **Andrej Karpathy** — learning should be *effortful* ("the mental equivalent of sweating"), avoid the "shortification of learning", and *build things to understand them* ("What I cannot create, I do not understand").
   - **Andrew Ng** — foundations → projects → habit. Learn a little every day; consistency beats intensity.
   - **Ethan Mollick** — co-intelligence: you only learn AI's "jagged frontier" through daily use. Always invite AI to the table; be the human in the loop.
3. **Growth you can see.** Your progress is a **banyan tree**: a seed when you start, a sprout after your first lesson, branches for every skill you master (each module's knowledge check grows one), aerial roots when your track is complete, and **golden fruits for every hands-on project you finish**.

## What's inside

| Layer | Content |
|---|---|
| 🌍 **The Roots** (everyone) | 6 foundation modules · 24 lessons: AI demystified · How machines learn · Neural networks & deep learning · The LLM revolution · Working with AI daily · Agents & the modern stack |
| 🌿 **The Branches** (your persona) | 12 personas (PO/PM, Developer, BA/Consultant, QA, Delivery Leader, Architect, Data Analyst, Designer/UX, Operations, Sales, Risk/Governance/Compliance, Executive/Senior Leader) mapped onto 5 specialist tracks — each with its own reading lens, projects and career guidance. Hybrid leaders can add an optional **second hat** (pick from the list or type their own, e.g. "Data Protection Officer") that informs the lens and career consult |
| 🔊 **Listen** | On-device text-to-speech reads any lesson aloud — works on iOS Safari and Android Chrome, free, even offline. For commutes, accessibility, or just resting your eyes |
| ✨ **Visual intros** | Every module opens with a swipeable card deck (touch/keyboard/buttons) that previews the journey in ~30 seconds before the text — so it never feels like a wall of words |
| 🍎 **The Fruits** | 8 hands-on projects in three tiers — 🌱 Starter (30–45 min, browser only), 🌿 Intermediate, 🌳 Advanced — each with what-you-need, tick-off steps, personal notes, downloadable brief (.md), status tracking (not started / in progress / done) and tiered XP |
| 🧠 **Knowledge checks** | Every module ends with a quiz (explanations included, 70% to pass — effortful retrieval is the point) |
| 📈 **Tracking** | XP & levels, daily streaks with **streak shields** (a shield earned per 7-day streak absorbs one missed day — forgiveness mechanics that cut churn), weekly activity, resume-where-you-left-off, milestone celebrations with share |
| 🧠 **Daily Review** | 3-question spaced retrieval from your passed modules — the most evidence-backed technique in learning science (the testing effect, Roediger & Karpicke). Part of the daily goal alongside one lesson |
| 🎯 **Goal gradient** | The Today card shows exactly what stands between you and the next milestone ("2 more modules to Sapling") — concrete proximity is what gets goals finished |
| 🎨 **Two progress styles** | Pick at onboarding, switch anytime in Profile: the playful **Growth Tree** (banyan, branches, fruits) or the professional **Skills Dashboard** (completion ring, certified-skill matrix, capstone badges) — same tracking engine underneath |
| 📄 **AI Readiness Profile** | A print-ready, evidence-based one-pager: certified skills with check scores, delivered capstones, career direction and current focus — show a manager, attach to a review, save as PDF |
| 🧭 **Career Consult** | A 5-minute questionnaire → **3 realistic AI-era pivot roles** with fit scores, transferable skills, honest gaps, a 90-day plan and readiness signals — via the platform's secure AI service, your own key, or an offline estimator |

## Positioning — why this exists when Coursera does

Incumbent platforms (Coursera, DataCamp, LinkedIn Learning, Udacity) sell **course libraries**: thousands of hours, generic audiences, completion certificates. Meanwhile 59% of enterprises report an AI skills gap *while already paying for training* — because libraries don't answer the two questions professionals actually have: *"what should **I** learn for **my** role?"* and *"how do I prove I'm ready?"*

learn.ai's moat is a closed loop none of them offer:

**Career Consult** (where do I fit?) → **persona-curated path** (exactly what to learn, with your role's reading lens) → **certified skills + delivered capstones** (effortful checks, real artifacts) → **AI Readiness Profile** (verifiable proof, on one page).

Free, installable, offline, no account — and every layer reinforces the next.

54 lessons, 38 quiz questions, 8 tiered projects — every lesson with a Quick Take, key takeaways, a leader's quote, and optional "go deeper" links (Karpathy's Zero to Hero, One Useful Thing, The Batch…).

## Hosting on GitHub Pages

Already wired up — one switch to flip:

1. Merge this branch to `main` (or push the files to `main`).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) deploys on every push to `main`.
4. Your app appears at `https://<username>.github.io/learn.ai/`.

All asset paths are relative, so it works on any subpath, custom domain, or local folder.

### Run locally

```bash
npx http-server .        # or: python3 -m http.server
# open http://localhost:8080
```

## Installing as an app (PWA)

Yes — GitHub Pages + PWA works. Pages serves over HTTPS, which is all a service worker needs.

- **Android Chrome:** visit the site → ⋮ menu → **Install app** (or the in-app install button on the Profile page).
- **iPhone/iPad Safari:** visit the site → **Share** → **Add to Home Screen**. Standalone display, themed status bar and offline mode all work (icons and `apple-touch-icon` included).
- **Desktop Chrome/Edge:** install icon in the address bar.

Once installed, the service worker (`sw.js`) serves everything from cache — the full curriculum works offline.

## Career Consult (the second pillar)

Learning answers *"how does AI work?"* — the Career tab answers *"where do I fit?"*. Example: an RPA developer who also manages team resources gets **Agentic Automation Engineer**, **AI Delivery Lead** and **AI Solution Architect**, each with why-you-fit reasoning that references their actual responsibilities, the skills they already carry, the honest gaps, and a 90-day plan that links straight into the platform's tracks and projects (one tap switches their learning branch to match).

**How the inference works** (`js/gemini.js`):
- The questionnaire answers + a curated catalog of 9 AI-era roles are bound into **one prompt**, sent in **one call** to `gemini-2.5-flash` with a strict JSON `responseSchema` (structured output — no parsing roulette).
- 45s timeout, one automatic retry on transient failures only, typed errors so the UI can speak human, response validation + normalization before anything is rendered or stored.
**Engine selection** (automatic, in order):
1. **Platform proxy** — if `consultProxyUrl` is set in `js/config.js`, every visitor gets the analysis with **no API key**: the static app POSTs the structured answers to a Supabase Edge Function that holds the Gemini key server-side (see below).
2. **Bring your own key** — users paste a free key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey); stored only in their device's localStorage, sent only to Google.
3. **Offline estimator** — a rule-based scorer (`localCareerEstimate`) over the same role catalog; clearly labeled.

### Setting up the platform key (Supabase Edge Function)

A GitHub secret can't protect a key on GitHub Pages — Pages is static, so anything injected at build time ships to every visitor's browser. The proxy keeps the key genuinely server-side:

```bash
# one-time, from the repo root (needs the Supabase CLI + a free project)
supabase link --project-ref <your-project-ref>
supabase functions deploy career-consult --no-verify-jwt
supabase secrets set GEMINI_API_KEY=<your AI Studio key>
supabase secrets set ALLOWED_ORIGINS=https://<you>.github.io   # comma-separated
```

Then set the function URL in `js/config.js`:

```js
consultProxyUrl: 'https://<your-project-ref>.supabase.co/functions/v1/career-consult'
```

Abuse resistance is built into the function (`supabase/functions/career-consult/index.ts`): it accepts only **structured answers** (never raw prompts, so it can't be used as a generic Gemini proxy), validates every field against whitelists and length caps, enforces an origin allowlist, and applies a best-effort per-IP rate limit. To harden further for heavy traffic, move the rate limit into a Supabase table.

## Architecture

```
index.html              app shell + PWA meta
manifest.webmanifest    install metadata + icons
sw.js                   service worker: precache, stale-while-revalidate
css/styles.css          design system (deep-forest dark theme, mobile-first)
js/
  app.js                hash router, views, quiz engine, celebrations
  storage.js            local-first persistence (adapter seam for cloud sync)
  progress.js           derived progress, XP levels, tree growth model
  tree.js               procedural SVG banyan renderer (8 growth stages)
  data/                 the curriculum: foundation, tracks, projects
tools/
  generate-icons.mjs    zero-dependency PNG icon generator (pure Node)
  smoke-test.mjs        headless test: data integrity, progress engine, tree
.github/workflows/deploy.yml   GitHub Pages deployment
```

**No build step, no dependencies.** ES modules served as-is — auditable, forkable, and immune to dependency rot.

### Progress & privacy

Progress lives in `localStorage` on the user's device — no account, no server, no tracking. Users can **export/import** their progress as JSON from the Profile page (works as backup or device transfer).

### Adding cloud sync (Supabase) later

`js/storage.js` deliberately isolates persistence behind a tiny adapter (`load` / `save` / `clear`). To add login + cross-device sync:

1. Create a Supabase project with a `progress` table (`user_id uuid`, `state jsonb`, `updated_at`) and Row Level Security (`user_id = auth.uid()`).
2. Add `supabase-js` via CDN import and implement the same adapter interface (magic-link auth keeps it password-free).
3. Sync strategy: local-first writes, debounced push to Supabase, pull-and-merge on login.

The current export/import feature means users never lose data in the meantime.

## Testing

```bash
node tools/smoke-test.mjs
```

Validates curriculum integrity (unique IDs, quiz answer indices, lesson substance), the full progression engine (seed → flourishing banyan, XP, streaks), all 8 tree render stages, and export/import round-trips.

## Content sources & inspiration

- Karpathy — [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) · [on the shortification of learning](https://x.com/karpathy/status/1756380066580455557) · Software 2.0/3.0 ("Software Is Changing (Again)")
- Andrew Ng — [How to Build Your Career in AI](https://info.deeplearning.ai/how-to-build-a-career-in-ai-book) · [The Batch](https://www.deeplearning.ai/the-batch/)
- Ethan Mollick — *Co-Intelligence* · [One Useful Thing](https://www.oneusefulthing.org/)
- Dario Amodei — [Machines of Loving Grace](https://www.darioamodei.com/essay/machines-of-loving-grace)
- Industry: LangChain & Arcade *State of AI Agents* surveys, Gartner agentic-AI forecasts (2026)

---

*Built to show what thoughtful curation + a little craft can do. Plant your seed.* 🌱
