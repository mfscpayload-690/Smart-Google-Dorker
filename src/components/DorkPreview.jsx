import React from 'react';
import { Terminal } from 'lucide-react';

export default function DorkPreview({ dork }) {
  return (
    <div className="mt-1">
      <div className="flex items-center gap-2 mb-1.5">
        <Terminal size={12} className="text-text-muted" />
        <span className="label">Query Preview</span>
      </div>
      <div className={`code-block min-h-[44px] flex items-center${!dork ? ' opacity-40' : ''}`}>
        {dork || 'Your query will appear here…'}
      </div>
    </div>
  );
}
