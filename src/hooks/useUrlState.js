import { useCallback } from 'react';

const FIELDS = ['site', 'filetype', 'inurl', 'intitle', 'intext', 'keyword', 'engine'];

/** Read initial state from URL search params */
export function readUrlState(defaults) {
  const params = new URLSearchParams(window.location.search);
  const state = { ...defaults };
  FIELDS.forEach(key => {
    const val = params.get(key);
    if (val !== null) state[key] = val;
  });
  return state;
}

/** Returns a function that pushes current state into the URL */
export function useUrlSync() {
  return useCallback((fields, engine) => {
    const params = new URLSearchParams();
    FIELDS.forEach(key => {
      const val = key === 'engine' ? engine : fields[key];
      if (val) params.set(key, val);
    });
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, []);
}
