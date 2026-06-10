// Curriculum index: merges foundation, tracks and projects into one queryable model.
import { foundationA } from './foundation-a.js';
import { foundationB } from './foundation-b.js';
import { tracksA } from './tracks-a.js';
import { tracksB } from './tracks-b.js';
import { projects } from './projects.js';

export const foundation = [...foundationA, ...foundationB];
export const tracks = [...tracksA, ...tracksB];
export { projects };

export const personas = tracks.map((t) => ({
  id: t.id,
  label: t.label,
  emoji: t.emoji,
  blurb: t.blurb,
  pitch: t.pitch,
}));

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
  const track = trackById(personaId);
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
  // Recommended first (persona match), then the rest.
  const mine = projects.filter((p) => p.personas.includes(personaId));
  const rest = projects.filter((p) => !p.personas.includes(personaId));
  return { recommended: mine, more: rest };
}
