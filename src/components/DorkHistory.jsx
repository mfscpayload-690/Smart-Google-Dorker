import React from 'react';
import { Clock, Trash2, X, RotateCcw } from 'lucide-react';

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function DorkHistory({ history, onRestore, onRemove, onClear }) {
  if (history.length === 0) {
    return (
      <div className="text-center py-6">
        <Clock size={20} className="text-text-dim mx-auto mb-2" />
        <p className="text-xs text-text-dim">No history yet. Run a query to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {/* Clear all */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 text-xs text-text-dim hover:text-danger transition-colors"
        >
          <Trash2 size={11} />
          Clear all
        </button>
      </div>

      {history.map(item => (
        <div
          key={item.ts}
          className="flex items-center gap-3 px-3 py-2 rounded-md bg-bg-secondary border border-border-subtle hover:border-accent/30 transition-colors group"
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-accent-light truncate">{item.dork}</p>
            <p className="text-xs text-text-dim mt-0.5">
              {item.engine} · {timeAgo(item.ts)}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onRestore(item)}
              className="p-1.5 rounded text-text-muted hover:text-accent-light hover:bg-accent/10 transition-colors"
              title="Restore"
            >
              <RotateCcw size={12} />
            </button>
            <button
              type="button"
              onClick={() => onRemove(item.ts)}
              className="p-1.5 rounded text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
              title="Remove"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
