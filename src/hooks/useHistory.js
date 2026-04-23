import { useState, useCallback } from 'react';

const STORAGE_KEY = 'sgd_history';
const MAX_ITEMS = 50;

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function save(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useHistory() {
  const [history, setHistory] = useState(load);

  const push = useCallback((dork, fields, engine) => {
    if (!dork.trim()) return;
    setHistory(prev => {
      // deduplicate by query string
      const filtered = prev.filter(h => h.dork !== dork);
      const next = [
        { dork, fields, engine, ts: Date.now() },
        ...filtered,
      ].slice(0, MAX_ITEMS);
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((ts) => {
    setHistory(prev => {
      const next = prev.filter(h => h.ts !== ts);
      save(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    save([]);
    setHistory([]);
  }, []);

  return { history, push, remove, clear };
}
