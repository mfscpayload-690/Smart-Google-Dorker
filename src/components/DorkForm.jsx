import React, { useState, useEffect, useCallback } from 'react';
import { Info, Search, Copy, Check, Link, Globe } from 'lucide-react';
import DorkPreview from './DorkPreview';
import { readUrlState, useUrlSync } from '../hooks/useUrlState';

const DEFAULT_FIELDS = { site: '', keyword: '', filetype: '', inurl: '', intitle: '', intext: '' };

const searchEngines = [
  { label: 'Google',     value: 'google',     url: 'https://www.google.com/search?q=' },
  { label: 'DuckDuckGo', value: 'duckduckgo', url: 'https://duckduckgo.com/?q=' },
  { label: 'Startpage',  value: 'startpage',  url: 'https://www.startpage.com/do/dsearch?query=' },
  { label: 'Shodan',     value: 'shodan',     url: 'https://www.shodan.io/search?query=' },
];

const tooltips = {
  site:     'Restrict results to a specific domain (e.g., example.com).',
  filetype: 'Filter by file extension (e.g., pdf, xls, docx).',
  inurl:    'Match pages with this string in the URL.',
  intitle:  'Match pages with this string in the page title.',
  intext:   'Match pages containing this string in the body text.',
  keyword:  'Additional free-text terms appended to the query.',
};

function buildDork({ site, keyword, filetype, inurl, intitle, intext }) {
  const parts = [];
  if (site)     parts.push(`site:${site}`);
  if (filetype) parts.push(`filetype:${filetype}`);
  if (inurl)    parts.push(`inurl:${inurl}`);
  if (intitle)  parts.push(`intitle:${intitle}`);
  if (intext)   parts.push(`intext:${intext}`);
  if (keyword)  parts.push(keyword);
  return parts.join(' ');
}

export function parseDork(raw) {
  const fields = { ...DEFAULT_FIELDS };
  const remaining = [];
  raw.trim().split(/\s+/).forEach(token => {
    if (token.startsWith('site:'))         fields.site     = token.slice(5);
    else if (token.startsWith('filetype:'))fields.filetype = token.slice(9);
    else if (token.startsWith('inurl:'))   fields.inurl    = token.slice(6);
    else if (token.startsWith('intitle:')) fields.intitle  = token.slice(8);
    else if (token.startsWith('intext:'))  fields.intext   = token.slice(7);
    else remaining.push(token);
  });
  fields.keyword = remaining.join(' ');
  return fields;
}

function InputField({ name, value, onChange, placeholder, colSpan, tooltip, activeTooltip, onShow, onHide }) {
  const filled = value.trim().length > 0;
  return (
    <div className={`relative${colSpan ? ' md:col-span-2' : ''}`}>
      {/* Filled indicator dot */}
      {filled && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-success pointer-events-none" />
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field pr-8 transition-all${filled ? ' pl-7 border-border-active/40' : ''}`}
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="button"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-dim hover:text-accent-light transition-colors"
        onMouseEnter={() => onShow(name)}
        onMouseLeave={onHide}
        onClick={() => onShow(name)}
        aria-label={`Info: ${name}`}
      >
        <Info size={13} />
      </button>
      {activeTooltip === name && (
        <div className="absolute z-30 right-0 top-full mt-1.5 w-60 bg-bg-elevated border border-border-subtle text-text-muted text-xs rounded-md px-3 py-2 shadow-card leading-relaxed">
          {tooltip}
        </div>
      )}
    </div>
  );
}

export default function DorkForm({ engine, onEngineChange, loadedDork, onRunQuery, onToast }) {
  const initial = readUrlState({ ...DEFAULT_FIELDS, engine: 'google' });
  const [fields, setFields]           = useState({ site: initial.site, keyword: initial.keyword, filetype: initial.filetype, inurl: initial.inurl, intitle: initial.intitle, intext: initial.intext });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const syncUrl = useUrlSync();
  const dork    = buildDork(fields);

  // Load dork from external source (templates / history / recon)
  useEffect(() => {
    if (!loadedDork) return;
    setFields(parseDork(loadedDork.dork));
  }, [loadedDork]);

  // Sync URL
  useEffect(() => { syncUrl(fields, engine); }, [fields, engine, syncUrl]);

  // Dynamic page title for shared URLs
  useEffect(() => {
    document.title = dork ? `Dorkbase — ${dork}` : 'Dorkbase';
    return () => { document.title = 'Dorkbase'; };
  }, [dork]);

  const handleChange = e => setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleClear = () => setFields(DEFAULT_FIELDS);

  const handleSubmit = useCallback(() => {
    if (!dork) return;
    const sel = searchEngines.find(s => s.value === engine) ?? searchEngines[0];
    window.open(`${sel.url}${encodeURIComponent(dork)}`, '_blank');
    onRunQuery?.(dork, fields, engine);
  }, [dork, engine, fields, onRunQuery]);

  const handleCopy = () => {
    navigator.clipboard.writeText(dork).then(() => onToast?.('Query copied')).catch(() => {});
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => onToast?.('Share link copied')).catch(() => {});
  };

  const fieldDefs = [
    { name: 'site',     placeholder: 'site:' },
    { name: 'filetype', placeholder: 'filetype:' },
    { name: 'inurl',    placeholder: 'inurl:' },
    { name: 'intitle',  placeholder: 'intitle:' },
    { name: 'intext',   placeholder: 'intext:' },
    { name: 'keyword',  placeholder: 'keyword / free text', colSpan: true },
  ];

  const filledCount = Object.values(fields).filter(v => v.trim()).length;

  return (
    <div className="space-y-5">

      {/* Engine selector */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Globe size={12} className="text-text-muted" />
          <span className="label">Target Engine</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {searchEngines.map(se => (
            <label key={se.value}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium cursor-pointer transition-colors
                ${engine === se.value
                  ? 'border-accent bg-accent/10 text-accent-light'
                  : 'border-border-subtle bg-bg-elevated text-text-muted hover:border-accent/50 hover:text-text-primary'
                }`}>
              <input type="radio" name="engine" value={se.value} checked={engine === se.value}
                onChange={e => onEngineChange(e.target.value)} className="sr-only" />
              {se.label}
            </label>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Operator fields */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="label">Search Operators</span>
          <div className="flex items-center gap-3">
            {filledCount > 0 && (
              <span className="text-xs text-text-dim">
                <span className="text-accent-light font-medium">{filledCount}</span> field{filledCount > 1 ? 's' : ''} active
              </span>
            )}
            {filledCount > 0 && (
              <button type="button" onClick={handleClear}
                className="text-xs text-text-dim hover:text-danger transition-colors">
                Clear all
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fieldDefs.map(f => (
            <InputField
              key={f.name}
              name={f.name}
              value={fields[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              colSpan={f.colSpan}
              tooltip={tooltips[f.name]}
              activeTooltip={activeTooltip}
              onShow={setActiveTooltip}
              onHide={() => setActiveTooltip(null)}
            />
          ))}
        </div>
      </div>

      {/* Query preview */}
      <DorkPreview dork={dork} />

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button type="button" onClick={handleSubmit} disabled={!dork} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
          <Search size={15} />
          Run Query
        </button>
        <button type="button" onClick={handleCopy} disabled={!dork}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed">
          <Copy size={15} />
          Copy
        </button>
        <button type="button" onClick={handleShare} disabled={!dork}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed" title="Copy shareable URL">
          <Link size={15} />
          Share
        </button>
      </div>
    </div>
  );
}
