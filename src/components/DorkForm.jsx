import React, { useState } from 'react';
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
  { label: 'Google', value: 'google', url: 'https://www.google.com/search?q=' },
  { label: 'DuckDuckGo', value: 'duckduckgo', url: 'https://duckduckgo.com/?q=' },
  { label: 'Startpage', value: 'startpage', url: 'https://www.startpage.com/do/dsearch?query=' },
  { label: 'Shodan', value: 'shodan', url: 'https://www.shodan.io/search?query=' },
];

const tooltips = {
  site: 'Limit your search to a specific website (e.g., example.com).',
  filetype: 'Find only certain types of files (e.g., pdf, docx, xls).',
  inurl: 'Look for pages with these words in the web address (URL).',
  intitle: 'Find pages with these words in the title.',
  intext: 'Search for pages containing these words in the main text.',
  keyword: 'Any other words you want to search for.',
};

function buildDork({ site, keyword, filetype, inurl, intitle, intext }) {
  let parts = [];
  if (site) parts.push(`site:${site}`);
  if (filetype) parts.push(`filetype:${filetype}`);
  if (inurl) parts.push(`inurl:${inurl}`);
  if (intitle) parts.push(`intitle:${intitle}`);
  if (intext) parts.push(`intext:${intext}`);
  if (keyword) parts.push(keyword);
  return parts.join(' ');
}

export default function DorkForm() {
  const [fields, setFields] = useState(initialState);
  const [copied, setCopied] = useState(false);
  const [engine, setEngine] = useState('google');
  const [showDorkingInfo, setShowDorkingInfo] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [analyzeDomain, setAnalyzeDomain] = useState('');
  const [analyzerDorks, setAnalyzerDorks] = useState([]);

  const dork = buildDork(fields);

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setCopied(false);
  };

  const handleEngineChange = e => {
    setEngine(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (dork) {
      const selected = searchEngines.find(se => se.value === engine);
      const url = selected ? selected.url : searchEngines[0].url;
      window.open(`${url}${encodeURIComponent(dork)}`, '_blank');
    }
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(dork);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // Optionally, you could show an error message here
      setCopied(false);
    }
  };

  // Tooltip handlers
  const showTooltip = (field) => setActiveTooltip(field);
  const hideTooltip = () => setActiveTooltip(null);

  // Security Analyzer logic
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

  const handleAnalyzerSubmit = (e) => {
    e.preventDefault();
    if (!analyzeDomain.trim()) return;
    const dorks = analyzerTemplates.map(t => t.replace('{domain}', analyzeDomain.trim()));
    setAnalyzerDorks(dorks);
  };

  const handleAnalyzerCopy = (dork) => {
    try {
      navigator.clipboard.writeText(dork);
    } catch {}
  };

  const handleAnalyzerSearch = (dork) => {
    const selected = searchEngines.find(se => se.value === engine);
    const url = selected ? selected.url : searchEngines[0].url;
    window.open(`${url}${encodeURIComponent(dork)}`, '_blank');
  };

  return (
    <>
      <div className="mb-4">
        <button
          type="button"
          className="font-orbitron text-cyberaccent underline text-lg mr-4"
          onClick={() => setShowDorkingInfo((v) => !v)}
        >
          {showDorkingInfo ? 'Hide' : 'What is Google Dorking?'}
        </button>
        <button
          type="button"
          className="font-orbitron text-cyberaccent underline text-lg"
          onClick={() => setShowAnalyzer((v) => !v)}
        >
          {showAnalyzer ? 'Hide' : 'Security Analyzer'}
        </button>
      </div>
      {showDorkingInfo && (
        <div className="bg-black bg-opacity-70 border border-cyberaccent rounded-md p-4 mb-4 text-matrix text-base font-sharetech">
          <b>Google dorking</b> means using special search tricks on Google to find information that's hard to find with normal searches. For example, you can search for only PDF files on a government website, or look for pages with certain words in the title. <br /><br />
          <b>How to use this tool:</b> Fill in any boxes you want, and your special Google search will appear below. Click DORK to search, or COPY to copy the search. <br /><br />
          <b>Reminder:</b> Use this tool for learning and research only. Always respect privacy and the law.
        </div>
      )}
      {showAnalyzer && (
        <div className="bg-black bg-opacity-70 border border-cyberaccent rounded-md p-4 mb-4 text-matrix text-base font-sharetech">
          <form onSubmit={handleAnalyzerSubmit} className="flex flex-col md:flex-row gap-2 mb-2">
            <input
              type="text"
              value={analyzeDomain}
              onChange={e => setAnalyzeDomain(e.target.value)}
              placeholder="Enter a domain (e.g., example.com)"
              className="input-cyber flex-1"
              autoComplete="off"
            />
            <button type="submit" className="btn-cyber px-4 py-2 font-orbitron">Analyze</button>
          </form>
          {analyzerDorks.length > 0 && (
            <div className="space-y-2 mt-2">
              {analyzerDorks.map((dork, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-black bg-opacity-60 border border-cyberaccent rounded px-3 py-2">
                  <span className="font-sharetech text-matrix text-sm select-all flex-1">{dork}</span>
                  <button
                    type="button"
                    className="btn-cyber px-2 py-1 text-xs font-orbitron"
                    onClick={() => handleAnalyzerSearch(dork)}
                  >Search</button>
                  <button
                    type="button"
                    className="btn-cyber px-2 py-1 text-xs font-orbitron"
                    onClick={() => handleAnalyzerCopy(dork)}
                  >Copy</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-orbitron text-matrix">Search Engine:</span>
          {searchEngines.map(se => (
            <label key={se.value} className="flex items-center gap-1 font-sharetech text-cyberaccent">
              <input
                type="radio"
                name="engine"
                value={se.value}
                checked={engine === se.value}
                onChange={handleEngineChange}
                className="accent-cyberaccent"
              />
              {se.label}
            </label>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input name="site" value={fields.site} onChange={handleChange} placeholder="Site (example.com)" className="input-cyber w-full" autoComplete="off" />
            <span
              className="absolute right-2 top-2 cursor-pointer text-cyberaccent"
              onMouseEnter={() => showTooltip('site')}
              onMouseLeave={hideTooltip}
              onClick={() => showTooltip('site')}
              tabIndex={0}
            >ℹ️</span>
            {activeTooltip === 'site' && (
              <div className="absolute z-20 right-0 mt-6 w-64 bg-black bg-opacity-90 text-cyberaccent text-xs rounded p-2 shadow-xl">
                {tooltips.site}
              </div>
            )}
          </div>
          <div className="relative">
            <input name="filetype" value={fields.filetype} onChange={handleChange} placeholder="Filetype (pdf, txt, etc)" className="input-cyber w-full" autoComplete="off" />
            <span
              className="absolute right-2 top-2 cursor-pointer text-cyberaccent"
              onMouseEnter={() => showTooltip('filetype')}
              onMouseLeave={hideTooltip}
              onClick={() => showTooltip('filetype')}
              tabIndex={0}
            >ℹ️</span>
            {activeTooltip === 'filetype' && (
              <div className="absolute z-20 right-0 mt-6 w-64 bg-black bg-opacity-90 text-cyberaccent text-xs rounded p-2 shadow-xl">
                {tooltips.filetype}
              </div>
            )}
          </div>
          <div className="relative">
            <input name="inurl" value={fields.inurl} onChange={handleChange} placeholder="In URL" className="input-cyber w-full" autoComplete="off" />
            <span
              className="absolute right-2 top-2 cursor-pointer text-cyberaccent"
              onMouseEnter={() => showTooltip('inurl')}
              onMouseLeave={hideTooltip}
              onClick={() => showTooltip('inurl')}
              tabIndex={0}
            >ℹ️</span>
            {activeTooltip === 'inurl' && (
              <div className="absolute z-20 right-0 mt-6 w-64 bg-black bg-opacity-90 text-cyberaccent text-xs rounded p-2 shadow-xl">
                {tooltips.inurl}
              </div>
            )}
          </div>
          <div className="relative">
            <input name="intitle" value={fields.intitle} onChange={handleChange} placeholder="In Title" className="input-cyber w-full" autoComplete="off" />
            <span
              className="absolute right-2 top-2 cursor-pointer text-cyberaccent"
              onMouseEnter={() => showTooltip('intitle')}
              onMouseLeave={hideTooltip}
              onClick={() => showTooltip('intitle')}
              tabIndex={0}
            >ℹ️</span>
            {activeTooltip === 'intitle' && (
              <div className="absolute z-20 right-0 mt-6 w-64 bg-black bg-opacity-90 text-cyberaccent text-xs rounded p-2 shadow-xl">
                {tooltips.intitle}
              </div>
            )}
          </div>
          <div className="relative">
            <input name="intext" value={fields.intext} onChange={handleChange} placeholder="In Text" className="input-cyber w-full" autoComplete="off" />
            <span
              className="absolute right-2 top-2 cursor-pointer text-cyberaccent"
              onMouseEnter={() => showTooltip('intext')}
              onMouseLeave={hideTooltip}
              onClick={() => showTooltip('intext')}
              tabIndex={0}
            >ℹ️</span>
            {activeTooltip === 'intext' && (
              <div className="absolute z-20 right-0 mt-6 w-64 bg-black bg-opacity-90 text-cyberaccent text-xs rounded p-2 shadow-xl">
                {tooltips.intext}
              </div>
            )}
          </div>
          <div className="relative md:col-span-2">
            <input name="keyword" value={fields.keyword} onChange={handleChange} placeholder="Keyword/Content" className="input-cyber w-full" autoComplete="off" />
            <span
              className="absolute right-2 top-2 cursor-pointer text-cyberaccent"
              onMouseEnter={() => showTooltip('keyword')}
              onMouseLeave={hideTooltip}
              onClick={() => showTooltip('keyword')}
              tabIndex={0}
            >ℹ️</span>
            {activeTooltip === 'keyword' && (
              <div className="absolute z-20 right-0 mt-6 w-64 bg-black bg-opacity-90 text-cyberaccent text-xs rounded p-2 shadow-xl">
                {tooltips.keyword}
              </div>
            )}
          </div>
        </div>
        <DorkPreview dork={dork} />
        <div className="flex items-center gap-4 mt-2">
          <button type="submit" className="btn-cyber px-6 py-2 text-lg font-orbitron tracking-widest">DORK</button>
          <button type="button" onClick={handleCopy} className="btn-cyber px-4 py-2 text-base font-orbitron">
            {copied ? 'COPIED!' : 'COPY'}
          </button>
        </div>
      </form>
    </>
  );
}

// Tailwind custom classes (add to index.css or as global styles):
// .input-cyber { @apply bg-black bg-opacity-60 border-2 border-matrix text-matrix font-sharetech px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyberaccent transition; }
// .btn-cyber { @apply bg-black bg-opacity-80 border-2 border-cyberaccent text-cyberaccent hover:bg-cyberaccent hover:text-black shadow-lg transition font-orbitron rounded-lg; } 