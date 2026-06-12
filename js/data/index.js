// Curriculum index: merges foundation, tracks and projects into one queryable model.
import { foundationA } from './foundation-a.js';
import { foundationB } from './foundation-b.js';
import { tracksA } from './tracks-a.js';
import { tracksB } from './tracks-b.js';
import { projects } from './projects.js';

export const foundation = [...foundationA, ...foundationB];
export const tracks = [...tracksA, ...tracksB];
export { projects };

// 10 generic personas covering most consulting/IT roles. Each maps onto one
// of the five content tracks; `lens` is the role-specific reading prompt shown
// on foundation modules to keep shared content relatable per persona.
export const personas = [
  { id: 'po', label: 'Product Owner / PM', emoji: '🧭', track: 'po',
    blurb: 'You decide what gets built and why.',
    lens: 'As you read, track how each idea changes what goes in your backlog — and how acceptance criteria must evolve.' },
  { id: 'dev', label: 'Developer / Engineer', emoji: '💻', track: 'dev',
    blurb: 'You build and integrate the systems.',
    lens: 'As you read, map each concept to the systems you build — where would this live in your architecture?' },
  { id: 'ba', label: 'Business Analyst / Consultant', emoji: '📊', track: 'ba',
    blurb: 'You translate business problems into solutions.',
    lens: 'As you read, think of one client process each concept could reshape — that list becomes your opportunity map.' },
  { id: 'qa', label: 'QA / Test Engineer', emoji: '🔍', track: 'qa',
    blurb: 'You make sure it actually works.',
    lens: 'As you read, ask: how would I verify this behaves correctly — and what would a failure look like?' },
  { id: 'lead', label: 'Delivery / Engagement Leader', emoji: '🧑‍✈️', track: 'lead',
    blurb: 'You lead teams, portfolios and outcomes.',
    lens: 'As you read, weigh each idea at portfolio level: cost, risk, team impact, and what you would fund.' },
  { id: 'arch', label: 'Solution / Enterprise Architect', emoji: '🏗️', track: 'dev',
    blurb: 'You design how it all fits together.',
    lens: 'As you read, sketch where each capability sits in an enterprise landscape — integration points, data flows, controls.' },
  { id: 'data', label: 'Data Analyst / BI', emoji: '📈', track: 'ba',
    blurb: 'You turn data into decisions.',
    lens: 'As you read, consider how each concept changes what you analyze, how you analyze it, and what becomes measurable.' },
  { id: 'design', label: 'Designer / UX', emoji: '🎨', track: 'po',
    blurb: 'You shape how people experience products.',
    lens: 'As you read, imagine the user-facing surface of each concept — where does trust, feedback or friction live?' },
  { id: 'ops', label: 'Operations / Support', emoji: '🛠️', track: 'ba',
    blurb: 'You keep the business running every day.',
    lens: 'As you read, spot which of your daily processes each concept touches — triage, tickets, requests, reports.' },
  { id: 'sales', label: 'Sales / Client Partner', emoji: '🤝', track: 'ba',
    blurb: 'You own the client conversation.',
    lens: 'As you read, build your client narrative: how would you explain this to a buyer, and what would you propose?' },
];

export function personaById(id) {
  return personas.find((p) => p.id === id) || null;
}

export function trackForPersona(personaId) {
  const p = personaById(personaId);
  return trackById(p ? p.track : personaId);
}

export const levels = [
  { id: 'new', label: 'New to AI', emoji: '🌰', blurb: 'I hear about it everywhere but it feels like a black box.' },
  { id: 'aware', label: 'Curious user', emoji: '🌱', blurb: 'I use ChatGPT-style tools sometimes, but I want to really understand.' },
  { id: 'hands-on', label: 'Hands-on already', emoji: '🌿', blurb: 'I use AI regularly and want structure, depth and the professional toolkit.' },
];

export function trackById(id) {
  return tracks.find((t) => t.id === id) || null;
}

// The full ordered learning path for a persona: foundation modules then track modules.
export function pathFor(personaId) {
  const track = trackForPersona(personaId);
  return [...foundation, ...(track ? track.modules : [])];
}

export function moduleById(id) {
  for (const m of foundation) if (m.id === id) return m;
  for (const t of tracks) for (const m of t.modules) if (m.id === id) return m;
  return null;
}

export function lessonById(moduleId, lessonId) {
  const mod = moduleById(moduleId);
  if (!mod) return null;
  return mod.lessons.find((l) => l.id === lessonId) || null;
}

export function projectById(id) {
  return projects.find((p) => p.id === id) || null;
}

export function projectsFor(personaId) {
  // Recommended first (track match), then the rest.
  const track = trackForPersona(personaId);
  const trackId = track ? track.id : personaId;
  const mine = projects.filter((p) => p.personas.includes(trackId));
  const rest = projects.filter((p) => !p.personas.includes(trackId));
  return { recommended: mine, more: rest };
}
