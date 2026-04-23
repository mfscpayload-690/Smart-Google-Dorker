import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { TEMPLATE_CATEGORIES } from '../data/templates';

export default function DorkTemplates({ onUse }) {
  const [query, setQuery]           = useState('');
  const [openCat, setOpenCat]       = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return TEMPLATE_CATEGORIES;
    return TEMPLATE_CATEGORIES.map(cat => ({
      ...cat,
      templates: cat.templates.filter(
        t => t.label.toLowerCase().includes(q) || t.dork.toLowerCase().includes(q)
      ),
    })).filter(cat => cat.templates.length > 0);
  }, [query]);

  // Auto-expand all when searching
  const isSearching = query.trim().length > 0;

  const toggle = id => setOpenCat(prev => prev === id ? null : id);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search templates…"
          className="input-field pl-8 text-sm"
          spellCheck={false}
        />
      </div>

      {/* Categories */}
      <div className="space-y-1.5">
        {filtered.length === 0 && (
          <p className="text-xs text-text-dim text-center py-4">No templates match "{query}"</p>
        )}
        {filtered.map(cat => {
          const isOpen = isSearching || openCat === cat.id;
          return (
            <div key={cat.id} className="border border-border-subtle rounded-md overflow-hidden">
              {/* Category header */}
              <button
                type="button"
                onClick={() => toggle(cat.id)}
                className="w-full flex items-center justify-between px-3 py-2 bg-bg-elevated hover:bg-bg-card transition-colors text-left"
              >
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  {cat.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-dim">{cat.templates.length}</span>
                  {isOpen ? <ChevronUp size={13} className="text-text-dim" /> : <ChevronDown size={13} className="text-text-dim" />}
                </div>
              </button>

              {/* Templates list */}
              {isOpen && (
                <div className="divide-y divide-border-subtle">
                  {cat.templates.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2 bg-bg-secondary hover:bg-bg-elevated transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-text-primary">{t.label}</p>
                        <p className="text-xs font-mono text-text-muted truncate mt-0.5">{t.dork}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onUse(t.dork)}
                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium
                                   bg-accent/10 border border-accent/30 text-accent-light
                                   hover:bg-accent hover:text-white hover:border-accent
                                   transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Zap size={10} />
                        Use
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
