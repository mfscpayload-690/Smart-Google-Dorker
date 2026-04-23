import React, { useState, useEffect, useCallback } from 'react';
import {
  Info, Search, Copy, Check, Globe, Link,
  ShieldAlert, ChevronDown, ChevronUp,
  BookOpen, Clock,
} from 'lucide-react';
import DorkPreview from './DorkPreview';
import DorkTemplates from './DorkTemplates';
import DorkHistory from './DorkHistory';
import ReconAnalyzer from './ReconAnalyzer';
import { readUrlState, useUrlSync } from '../hooks/useUrlState';
import { useHistory } from '../hooks/useHistory';

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

const analyzerTemplates = [
  'site:{domain} filetype:pdf',
  'site:{domain} filetype:xls',
  'site:{domain} inurl:admin',
  'site:{domain} intitle:index.of',
  'site:{domain} intext:password',
  'site:{domain} confidential',
  'site:{domain} backup',
  'site:{domain} database',
];

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

/** Parse a raw dork string back into fields (best-effort) */
function parseDork(raw) {
  const fields = { ...DEFAULT_FIELDS };
  const remaining = [];
  raw.trim().split(/\s+/).forEach(token => {
    if (token.startsWith('site:'))     fields.site     = token.slice(5);
    else if (token.startsWith('filetype:')) fields.filetype = token.slice(9);
    else if (token.startsWith('inurl:'))   fields.inurl    = token.slice(6);
    else if (token.startsWith('intitle:')) fields.intitle  = token.slice(8);
    else if (token.startsWith('intext:'))  fields.intext   = token.slice(7);
    else remaining.push(token);
  });
  fields.keyword = remaining.join(' ');
  return fields;
}

function InputField({ name, value, onChange, placeholder, colSpan, tooltip, activeTooltip, onShow, onHide }) {
  return (
    <div className={`relative${colSpan ? ' md:col-span-2' : ''}`}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field pr-8"
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

export default function DorkForm() {
  // Boot state from URL params if present
  const initial = readUrlState({ ...DEFAULT_FIELDS, engine: 'google' });

  const [fields, setFields]               = useState({ site: initial.site, keyword: initial.keyword, filetype: initial.filetype, inurl: initial.inurl, intitle: initial.intitle, intext: initial.intext });
  const [engine, setEngine]               = useState(initial.engine);
  const [copied, setCopied]               = useState(false);
  const [sharedCopied, setSharedCopied]   = useState(false);
  const [showInfo, setShowInfo]           = useState(false);
  const [showAnalyzer, setShowAnalyzer]   = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [copiedIdx, setCopiedIdx]         = useState(null);
  const [activeTab, setActiveTab]         = useState(null); // 'templates' | 'history' | 'recon' | null

  const syncUrl  = useUrlSync();
  const { history, push: pushHistory, remove: removeHistory, clear: clearHistory } = useHistory();

  const dork = buildDork(fields);

  // Keep URL in sync whenever fields or engine change
  useEffect(() => {
    syncUrl(fields, engine);
  }, [fields, engine, syncUrl]);

  const handleChange = e => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setCopied(false);
  };

  const handleSubmit = useCallback(() => {
    if (!dork) return;
    const sel = searchEngines.find(s => s.value === engine) ?? searchEngines[0];
    window.open(`${sel.url}${encodeURIComponent(dork)}`, '_blank');
    pushHistory(dork, fields, engine);
  }, [dork, engine, fields, pushHistory]);

  const handleCopy = () => {
    navigator.clipboard.writeText(dork).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }).catch(() => {});
  };

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setSharedCopied(true);
      setTimeout(() => setSharedCopied(false), 1800);
    }).catch(() => {});
  };

  // Load a template dork into the form fields
  const handleUseTemplate = useCallback((rawDork) => {
    setFields(parseDork(rawDork));
    setCopied(false);
    setActiveTab(null); // collapse panel after selecting
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Restore a history entry
  const handleRestoreHistory = useCallback((item) => {
    setFields(item.fields);
    setEngine(item.engine);
    setCopied(false);
    setActiveTab(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAnalyzerCopy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    }).catch(() => {});
  };

  const handleAnalyzerSearch = q => {
    const sel = searchEngines.find(s => s.value === engine) ?? searchEngines[0];
    window.open(`${sel.url}${encodeURIComponent(q)}`, '_blank');
  };

  const fieldDefs = [
    { name: 'site',     placeholder: 'site:' },
    { name: 'filetype', placeholder: 'filetype:' },
    { name: 'inurl',    placeholder: 'inurl:' },
    { name: 'intitle',  placeholder: 'intitle:' },
    { name: 'intext',   placeholder: 'intext:' },
    { name: 'keyword',  placeholder: 'keyword / free text', colSpan: true },
  ];

  const tabs = [
    { id: 'templates', label: 'Templates',       icon: <BookOpen size={12} />,  count: null },
    { id: 'history',   label: 'History',         icon: <Clock size={12} />,     count: history.length || null },
    { id: 'recon',     label: 'Recon Analyzer',  icon: <ShieldAlert size={12} />, count: null },
  ];

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
            <label
              key={se.value}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium cursor-pointer transition-colors
                ${engine === se.value
                  ? 'border-accent bg-accent/10 text-accent-light'
                  : 'border-border-subtle bg-bg-elevated text-text-muted hover:border-accent/50 hover:text-text-primary'
                }`}
            >
              <input type="radio" name="engine" value={se.value} checked={engine === se.value}
                onChange={e => setEngine(e.target.value)} className="sr-only" />
              {se.label}
            </label>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Operator fields */}
      <div>
        <span className="label block mb-2">Search Operators</span>
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

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button type="button" onClick={handleSubmit} className="btn-primary">
          <Search size={15} />
          Run Query
        </button>
        <button type="button" onClick={handleCopy} disabled={!dork}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed">
          {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button type="button" onClick={handleShareCopy} disabled={!dork}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
          title="Copy shareable URL with current query pre-filled">
          {sharedCopied ? <Check size={15} className="text-success" /> : <Link size={15} />}
          {sharedCopied ? 'Link Copied!' : 'Share'}
        </button>
      </div>

      <div className="divider" />

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(prev => prev === tab.id ? null : tab.id)}
            className={`btn-pill ${activeTab === tab.id ? 'border-accent/60 text-accent-light bg-accent/10' : ''}`}
          >
            {tab.icon}
            {tab.label}
            {tab.count ? (
              <span className="ml-0.5 bg-accent/20 text-accent-light text-xs px-1.5 py-0.5 rounded-full leading-none">
                {tab.count}
              </span>
            ) : null}
            {activeTab === tab.id ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        ))}
        <button type="button" className={`btn-pill ${showInfo ? 'border-accent/60 text-accent-light bg-accent/10' : ''}`}
          onClick={() => setShowInfo(v => !v)}>
          <Info size={12} />
          About
          {showInfo ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
      </div>

      {/* Templates panel */}
      {activeTab === 'templates' && (
        <div className="bg-bg-elevated border border-border-subtle rounded-md p-3">
          <p className="text-xs text-text-muted mb-3">
            Click <strong className="text-text-primary">Use</strong> on any template to load it into the builder.
            Templates with <code className="text-accent-light">{'{domain}'}</code> are placeholders — edit the site field after loading.
          </p>
          <DorkTemplates onUse={handleUseTemplate} />
        </div>
      )}

      {/* History panel */}
      {activeTab === 'history' && (
        <div className="bg-bg-elevated border border-border-subtle rounded-md p-3">
          <DorkHistory
            history={history}
            onRestore={handleRestoreHistory}
            onRemove={removeHistory}
            onClear={clearHistory}
          />
        </div>
      )}

      {/* Recon Analyzer panel */}
      {activeTab === 'recon' && (
        <div className="bg-bg-elevated border border-border-subtle rounded-md p-4">
          <ReconAnalyzer
            onLoadIntoBuilder={q => { handleUseTemplate(q); setActiveTab(null); }}
            engine={engine}
            engineUrl={(searchEngines.find(s => s.value === engine) ?? searchEngines[0]).url}
          />
        </div>
      )}

      {/* Info panel */}
      {showInfo && (
        <div className="bg-bg-elevated border border-border-subtle rounded-md px-4 py-3 text-sm text-text-muted leading-relaxed space-y-2">
          <p>Google dorking uses advanced search operators to surface information that standard queries miss —
            exposed directories, specific file types, admin interfaces, and misconfigured servers.</p>
          <p>Fill in any combination of operator fields. Only non-empty fields are included in the final query.
            Use <strong className="text-text-primary font-semibold">Run Query</strong> to open results in a new tab,
            or <strong className="text-text-primary font-semibold">Share</strong> to copy a URL with the current query pre-filled.</p>
          <p className="text-xs text-text-dim border-t border-border-subtle pt-2 mt-2">
            For authorized security research and educational use only.
          </p>
        </div>
      )}
    </div>
  );
}
