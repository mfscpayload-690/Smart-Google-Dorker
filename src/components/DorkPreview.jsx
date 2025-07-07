import React from 'react';

export default function DorkPreview({ dork }) {
  return (
    <div className="w-full bg-black bg-opacity-70 border border-cyberaccent rounded-md px-4 py-3 mt-2 font-sharetech text-matrix text-lg tracking-wide shadow-inner animate-pulse">
      <span className="select-all">{dork || <span className="opacity-40">Your dork query will appear here...</span>}</span>
    </div>
  );
} 