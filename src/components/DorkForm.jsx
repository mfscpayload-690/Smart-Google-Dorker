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

  const dork = buildDork(fields);

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setCopied(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (dork) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(dork)}`, '_blank');
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="site" value={fields.site} onChange={handleChange} placeholder="Site (example.com)" className="input-cyber" autoComplete="off" />
        <input name="filetype" value={fields.filetype} onChange={handleChange} placeholder="Filetype (pdf, txt, etc)" className="input-cyber" autoComplete="off" />
        <input name="inurl" value={fields.inurl} onChange={handleChange} placeholder="In URL" className="input-cyber" autoComplete="off" />
        <input name="intitle" value={fields.intitle} onChange={handleChange} placeholder="In Title" className="input-cyber" autoComplete="off" />
        <input name="intext" value={fields.intext} onChange={handleChange} placeholder="In Text" className="input-cyber" autoComplete="off" />
        <input name="keyword" value={fields.keyword} onChange={handleChange} placeholder="Keyword/Content" className="input-cyber md:col-span-2" autoComplete="off" />
      </div>
      <DorkPreview dork={dork} />
      <div className="flex items-center gap-4 mt-2">
        <button type="submit" className="btn-cyber px-6 py-2 text-lg font-orbitron tracking-widest">DORK</button>
        <button type="button" onClick={handleCopy} className="btn-cyber px-4 py-2 text-base font-orbitron">
          {copied ? 'COPIED!' : 'COPY'}
        </button>
      </div>
    </form>
  );
}

// Tailwind custom classes (add to index.css or as global styles):
// .input-cyber { @apply bg-black bg-opacity-60 border-2 border-matrix text-matrix font-sharetech px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyberaccent transition; }
// .btn-cyber { @apply bg-black bg-opacity-80 border-2 border-cyberaccent text-cyberaccent hover:bg-cyberaccent hover:text-black shadow-lg transition font-orbitron rounded-lg; } 