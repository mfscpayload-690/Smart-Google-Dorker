import React from 'react';
import { Clock, Trash2, X, RotateCcw, ArrowRight } from 'lucide-react';

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="p-3 rounded-full bg-bg-elevated border border-border-subtle mb-4">
        <Clock size={22} className="text-text-dim" />
      </div>
      <p className="text-sm font-medium text-text-primary mb-1">No history yet</p>
      <p className="text-xs text-text-muted max-w-xs leading-relaxed">
        Every query you run is saved here automatically. Head to the{' '}
        <strong className="text-text-primary">Query Builder</strong> and run your first dork.
      </p>
    </div>
  );
}

export default function DorkHistory({ history, onRestore, onRemove, onClear }) {
  if (history.length === 0) return <EmptyState />;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-dim">{history.length} saved {history.length === 1 ? 'query' : 'queries'}</span>
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
          className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-bg-secondary border border-border-subtle hover:border-accent/30 transition-colors group"
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-accent-light truncate">{item.dork}</p>
            <p className="text-xs text-text-dim mt-0.5 capitalize">
              {item.engine} · {timeAgo(item.ts)}
            </p>
          </div>
          {/* Always visible on mobile, hover on desktop */}
          <div className="flex items-center gap-1 shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onRestore(item)}
              className="p-1.5 rounded text-text-muted hover:text-accent-light hover:bg-accent/10 transition-colors"
              title="Restore query"
            >
              <RotateCcw size={13} />
            </button>
            <button
              type="button"
              onClick={() => onRemove(item.ts)}
              className="p-1.5 rounded text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
              title="Remove"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
