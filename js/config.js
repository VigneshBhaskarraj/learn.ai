// Platform configuration.
// consultProxyUrl: your deployed Supabase Edge Function, e.g.
//   'https://abcdefgh.supabase.co/functions/v1/career-consult'
// When set, Career Consult works for every visitor with NO API key —
// the key lives server-side in Supabase secrets (see README).
// When empty, the app falls back to bring-your-own-key, then to the
// offline estimator.
// Can also be overridden without editing this file by defining
// globalThis.LEARNAI_CONFIG = { consultProxyUrl: '...' } before app load.
export const CONFIG = {
  consultProxyUrl: '',
};

export function consultProxyUrl() {
  return globalThis.LEARNAI_CONFIG?.consultProxyUrl ?? CONFIG.consultProxyUrl;
}
