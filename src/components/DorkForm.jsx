import React, { useState } from 'react';
import {
  Info, Search, Copy, Check, Globe,
  ShieldAlert, ChevronDown, ChevronUp, ScanSearch,
} from 'lucide-react';
import DorkPreview from './DorkPreview';

const initialState = { site: '', keyword: '', filetype: '', inurl: '', intitle: '', intext: '' };

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
  const [fields, setFields]               = useState(initialState);
  const [copied, setCopied]               = useState(false);
  const [engine, setEngine]               = useState('google');
  const [showInfo, setShowInfo]           = useState(false);
  const [showAnalyzer, setShowAnalyzer]   = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [analyzeDomain, setAnalyzeDomain] = useState('');
  const [analyzerDorks, setAnalyzerDorks] = useState([]);
  const [copiedIdx, setCopiedIdx]         = useState(null);

  const dork = buildDork(fields);

  const handleChange = e => { setFields({ ...fields, [e.target.name]: e.target.value }); setCopied(false); };

  const handleSubmit = e => {
    e.preventDefault();
    if (!dork) return;
    const sel = searchEngines.find(s => s.value === engine) ?? searchEngines[0];
    window.open(`${sel.url}${encodeURIComponent(dork)}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dork).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }).catch(() => {});
  };

  const handleAnalyzerSubmit = e => {
    e.preventDefault();
    if (!analyzeDomain.trim()) return;
    setAnalyzerDorks(analyzerTemplates.map(t => t.replace('{domain}', analyzeDomain.trim())));
  };

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
              <input
                type="radio"
                name="engine"
                value={se.value}
                checked={engine === se.value}
                onChange={e => setEngine(e.target.value)}
                className="sr-only"
              />
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
      <div className="flex items-center gap-2 pt-1">
        <button type="button" onClick={handleSubmit} className="btn-primary">
          <Search size={15} />
          Run Query
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!dork}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="divider" />

      {/* Collapsible panels */}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-pill" onClick={() => setShowInfo(v => !v)}>
          <Info size={12} />
          About Dorking
          {showInfo ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
        <button type="button" className="btn-pill" onClick={() => setShowAnalyzer(v => !v)}>
          <ShieldAlert size={12} />
          Recon Analyzer
          {showAnalyzer ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
      </div>

      {/* Info panel */}
      {showInfo && (
        <div className="bg-bg-elevated border border-border-subtle rounded-md px-4 py-3 text-sm text-text-muted leading-relaxed space-y-2">
          <p>
            Google dorking uses advanced search operators to surface information that standard queries miss —
            exposed directories, specific file types, admin interfaces, and misconfigured servers.
          </p>
          <p>
            Fill in any combination of operator fields. Only non-empty fields are included in the final query.
            Use <strong className="text-text-primary font-semibold">Run Query</strong> to open results in a new tab,
            or <strong className="text-text-primary font-semibold">Copy</strong> to grab the raw string.
          </p>
          <p className="text-xs text-text-dim border-t border-border-subtle pt-2 mt-2">
            For authorized security research and educational use only.
          </p>
        </div>
      )}

      {/* Security Analyzer panel */}
      {showAnalyzer && (
        <div className="bg-bg-elevated border border-border-subtle rounded-md px-4 py-3 space-y-3">
          <p className="text-xs text-text-muted">
            Generate a standard recon dork set for a target domain.
          </p>
          <form onSubmit={handleAnalyzerSubmit} className="flex gap-2">
            <input
              type="text"
              value={analyzeDomain}
              onChange={e => setAnalyzeDomain(e.target.value)}
              placeholder="target domain (e.g., example.com)"
              className="input-field flex-1"
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" className="btn-primary shrink-0">
              <ScanSearch size={14} />
              Analyze
            </button>
          </form>

          {analyzerDorks.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {analyzerDorks.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-bg-secondary border border-border-subtle rounded px-3 py-2"
                >
                  <span className="font-mono text-xs text-accent-light select-all flex-1 truncate">{q}</span>
                  <button
                    type="button"
                    className="btn-ghost py-1 px-2 text-xs shrink-0"
                    onClick={() => handleAnalyzerSearch(q)}
                  >
                    <Search size={11} /> Search
                  </button>
                  <button
                    type="button"
                    className="btn-ghost py-1 px-2 text-xs shrink-0"
                    onClick={() => handleAnalyzerCopy(q, idx)}
                  >
                    {copiedIdx === idx ? <Check size={11} className="text-success" /> : <Copy size={11} />}
                    {copiedIdx === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
