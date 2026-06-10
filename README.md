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
| 🌿 **The Branches** (your persona) | 5 tracks × 2 modules × 3 lessons: Product Owner/PM · Developer/Engineer · Business Analyst/Consultant · QA/Test Engineer · Delivery/Engagement Leader |
| 🍎 **The Fruits** | 6 hands-on projects with briefs, steps and self-checks: Prompt Portfolio · AI Workflow Audit · AI Feature One-Pager · Tiny RAG Assistant · Mini Eval · Client-Ready AI Briefing |
| 🧠 **Knowledge checks** | Every module ends with a quiz (explanations included, 70% to pass — effortful retrieval is the point) |
| 📈 **Tracking** | XP & levels, daily streaks, weekly activity, resume-where-you-left-off, milestone celebrations |

54 lessons, 38 quiz questions, 6 projects — every lesson with key takeaways, a leader's quote, and optional "go deeper" links (Karpathy's Zero to Hero, One Useful Thing, The Batch…).

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
