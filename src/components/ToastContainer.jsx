import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const icons = {
  success: <Check size={13} className="text-success shrink-0" />,
  error:   <AlertCircle size={13} className="text-danger shrink-0" />,
};

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.key}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-lg
                     bg-bg-elevated border border-border-subtle shadow-card
                     text-sm text-text-primary font-medium
                     animate-slide-in"
        >
          {icons[t.type] ?? icons.success}
          <span>{t.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(t.key)}
            className="ml-1 text-text-dim hover:text-text-muted transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
