import React, { useState } from 'react';
import { Info, Search, Copy, Check, Globe, ShieldAlert, ChevronDown, ChevronUp, ScanSearch } from 'lucide-react';
import DorkPreview from './DorkPreview';

const initialState = {
  site: '',
  keyword: '',
  filetype: '',
  inurl: '',
  intitle: '',
  intext: '',
};

const searchEngines = [
  { label: 'Google',     value: 'google',     url: 'https://www.google.com/search?q=' },
  { label: 'DuckDuckGo', value: 'duckduckgo', url: 'https://duckduckgo.com/?q=' },
  { label: 'Startpage',  value: 'startpage',  url: 'https://www.startpage.com/do/dsearch?query=' },
  { label: 'Shodan',     value: 'shodan',     url: 'https://www.shodan.io/search?query=' },
];

const tooltips = {
  site:     'Limit your search to a specific website (e.g., example.com).',
  filetype: 'Find only certain types of files (e.g., pdf, docx, xls).',
  inurl:    'Look for pages with these words in the web address (URL).',
  intitle:  'Find pages with these words in the title.',
  intext:   'Search for pages containing these words in the main text.',
  keyword:  'Any other words you want to search for.',
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

function TooltipField({ name, value, onChange, placeholder, colSpan, tooltip, activeTooltip, onShow, onHide }) {
  return (
    <div className={`relative${colSpan ? ' md:col-span-2' : ''}`}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-cyber w-full pr-9"
        autoComplete="off"
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-cyberaccent opacity-60 hover:opacity-100 transition"
        onMouseEnter={() => onShow(name)}
        onMouseLeave={onHide}
        onClick={() => onShow(name)}
        tabIndex={0}
        aria-label={`Info for ${name}`}
      >
        <Info size={15} />
      </button>
      {activeTooltip === name && (
        <div className="absolute z-20 right-0 top-full mt-1 w-64 bg-black bg-opacity-95 border border-cyberaccent text-cyberaccent text-xs rounded p-2 shadow-xl">
          {tooltip}
        </div>
      )}
    </div>
  );
}

export default function DorkForm() {
  const [fields, setFields]                   = useState(initialState);
  const [copied, setCopied]                   = useState(false);
  const [engine, setEngine]                   = useState('google');
  const [showDorkingInfo, setShowDorkingInfo] = useState(false);
  const [activeTooltip, setActiveTooltip]     = useState(null);
  const [showAnalyzer, setShowAnalyzer]       = useState(false);
  const [analyzeDomain, setAnalyzeDomain]     = useState('');
  const [analyzerDorks, setAnalyzerDorks]     = useState([]);
  const [copiedAnalyzerIdx, setCopiedAnalyzerIdx] = useState(null);

  const dork = buildDork(fields);

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setCopied(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!dork) return;
    const selected = searchEngines.find(se => se.value === engine);
    const url = selected ? selected.url : searchEngines[0].url;
    window.open(`${url}${encodeURIComponent(dork)}`, '_blank');
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(dork);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
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

  const handleAnalyzerSubmit = e => {
    e.preventDefault();
    if (!analyzeDomain.trim()) return;
    setAnalyzerDorks(analyzerTemplates.map(t => t.replace('{domain}', analyzeDomain.trim())));
  };

  const handleAnalyzerCopy = (text, idx) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedAnalyzerIdx(idx);
      setTimeout(() => setCopiedAnalyzerIdx(null), 1200);
    } catch {}
  };

  const handleAnalyzerSearch = (q) => {
    const selected = searchEngines.find(se => se.value === engine);
    const url = selected ? selected.url : searchEngines[0].url;
    window.open(`${url}${encodeURIComponent(q)}`, '_blank');
  };

  const fieldDefs = [
    { name: 'site',     placeholder: 'Site (example.com)' },
    { name: 'filetype', placeholder: 'Filetype (pdf, txt, xls…)' },
    { name: 'inurl',    placeholder: 'In URL' },
    { name: 'intitle',  placeholder: 'In Title' },
    { name: 'intext',   placeholder: 'In Text' },
    { name: 'keyword',  placeholder: 'Keyword / Content', colSpan: true },
  ];

  return (
    <>
      {/* Toggle buttons */}
      <div className="flex gap-3 mb-4">
        <button
          type="button"
          className="flex items-center gap-1.5 font-orbitron text-cyberaccent text-sm border border-cyberaccent rounded px-3 py-1.5 hover:bg-cyberaccent hover:text-black transition"
          onClick={() => setShowDorkingInfo(v => !v)}
        >
          <Info size={14} />
          {showDorkingInfo ? 'Hide Info' : 'What is Dorking?'}
          {showDorkingInfo ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 font-orbitron text-cyberaccent text-sm border border-cyberaccent rounded px-3 py-1.5 hover:bg-cyberaccent hover:text-black transition"
          onClick={() => setShowAnalyzer(v => !v)}
        >
          <ShieldAlert size={14} />
          {showAnalyzer ? 'Hide Analyzer' : 'Security Analyzer'}
          {showAnalyzer ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Info panel */}
      {showDorkingInfo && (
        <div className="bg-black bg-opacity-70 border border-cyberaccent rounded-md p-4 mb-4 text-matrix text-sm font-sharetech leading-relaxed">
          <strong>Google dorking</strong> uses advanced search operators to surface information that standard queries miss — specific file types, exposed directories, admin panels, and more.<br /><br />
          <strong>How to use:</strong> Fill in any combination of fields. Only non-empty fields are included in the query. Click <strong>DORK</strong> to search or <strong>COPY</strong> to grab the raw query string.<br /><br />
          <strong>Note:</strong> Use this tool for authorized research only. Always respect applicable laws and terms of service.
        </div>
      )}

      {/* Security Analyzer panel */}
      {showAnalyzer && (
        <div className="bg-black bg-opacity-70 border border-cyberaccent rounded-md p-4 mb-4 text-matrix text-sm font-sharetech">
          <form onSubmit={handleAnalyzerSubmit} className="flex flex-col md:flex-row gap-2 mb-3">
            <input
              type="text"
              value={analyzeDomain}
              onChange={e => setAnalyzeDomain(e.target.value)}
              placeholder="Target domain (e.g., example.com)"
              className="input-cyber flex-1"
              autoComplete="off"
            />
            <button type="submit" className="btn-cyber flex items-center gap-2 px-4 py-2 font-orbitron text-sm">
              <ScanSearch size={15} />
              Analyze
            </button>
          </form>
          {analyzerDorks.length > 0 && (
            <div className="space-y-2">
              {analyzerDorks.map((analyzerDork, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-black bg-opacity-60 border border-cyberaccent rounded px-3 py-2">
                  <span className="font-sharetech text-matrix text-xs select-all flex-1">{analyzerDork}</span>
                  <button
                    type="button"
                    className="btn-cyber flex items-center gap-1 px-2 py-1 text-xs font-orbitron"
                    onClick={() => handleAnalyzerSearch(analyzerDork)}
                  >
                    <Search size={11} /> Search
                  </button>
                  <button
                    type="button"
                    className="btn-cyber flex items-center gap-1 px-2 py-1 text-xs font-orbitron"
                    onClick={() => handleAnalyzerCopy(analyzerDork, idx)}
                  >
                    {copiedAnalyzerIdx === idx ? <Check size={11} /> : <Copy size={11} />}
                    {copiedAnalyzerIdx === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search engine selector */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5 font-orbitron text-matrix text-sm">
            <Globe size={14} /> Engine
          </span>
          {searchEngines.map(se => (
            <label key={se.value} className="flex items-center gap-1.5 font-sharetech text-cyberaccent text-sm cursor-pointer">
              <input
                type="radio"
                name="engine"
                value={se.value}
                checked={engine === se.value}
                onChange={e => setEngine(e.target.value)}
                className="accent-cyberaccent"
              />
              {se.label}
            </label>
          ))}
        </div>

        {/* Input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fieldDefs.map(f => (
            <TooltipField
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

        <DorkPreview dork={dork} />

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="submit"
            className="btn-cyber flex items-center gap-2 px-6 py-2 text-base font-orbitron tracking-widest"
          >
            <Search size={16} />
            DORK
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-cyber flex items-center gap-2 px-4 py-2 text-base font-orbitron"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
      </form>
    </>
  );
}
