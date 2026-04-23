import React, { useState, useCallback } from 'react';
import {
  ShieldCheck, Star, Coffee,
  Terminal, BookOpen, Clock, ScanSearch, Info,
} from 'lucide-react';
import GridBackground from '../components/GridBackground';
import DorkForm from '../components/DorkForm';
import DorkTemplates from '../components/DorkTemplates';
import DorkHistory from '../components/DorkHistory';
import ReconAnalyzer from '../components/ReconAnalyzer';
import Footer from '../components/Footer';
import GitHubIcon from '../components/GitHubIcon';
import ToastContainer from '../components/ToastContainer';
import { useHistory } from '../hooks/useHistory';
import { useToast } from '../hooks/useToast';

const GITHUB_REPO = 'https://github.com/mfscpayload-690/Smart-Google-Dorker';
const BMC_URL     = 'https://buymeacoffee.com/mfscpayload690';

const searchEngines = [
  { label: 'Google',     value: 'google',     url: 'https://www.google.com/search?q=' },
  { label: 'DuckDuckGo', value: 'duckduckgo', url: 'https://duckduckgo.com/?q=' },
  { label: 'Startpage',  value: 'startpage',  url: 'https://www.startpage.com/do/dsearch?query=' },
  { label: 'Shodan',     value: 'shodan',     url: 'https://www.shodan.io/search?query=' },
];

const NAV = [
  { id: 'builder',   label: 'Query Builder',   icon: Terminal,    desc: 'Build & run dork queries' },
  { id: 'templates', label: 'Templates',        icon: BookOpen,    desc: 'Browse 50+ dork templates' },
  { id: 'recon',     label: 'Recon Analyzer',   icon: ScanSearch,  desc: 'Domain recon dork set' },
  { id: 'history',   label: 'History',          icon: Clock,       desc: 'Past queries' },
  { id: 'about',     label: 'About',            icon: Info,        desc: 'How to use this tool' },
];

export default function App() {
  const [activeNav, setActiveNav]   = useState('builder');
  const [engine, setEngine]         = useState('google');
  const [loadedDork, setLoadedDork] = useState(null); // signal to DorkForm to load a dork

  const { history, push: pushHistory, remove: removeHistory, clear: clearHistory } = useHistory();
  const { toasts, toast, dismiss } = useToast();

  const engineUrl = (searchEngines.find(s => s.value === engine) ?? searchEngines[0]).url;

  const handleLoadIntoBuilder = useCallback((rawDork) => {
    setLoadedDork({ dork: rawDork, ts: Date.now() });
    setActiveNav('builder');
    toast('Loaded into builder');
  }, [toast]);

  const handleRestoreHistory = useCallback((item) => {
    setLoadedDork({ dork: item.dork, ts: Date.now(), engine: item.engine });
    if (item.engine) setEngine(item.engine);
    setActiveNav('builder');
    toast('Query restored');
  }, [toast]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <GridBackground />

      {/* ── Header ── */}
      <header className="relative z-20 border-b border-border-subtle bg-bg-secondary/90 backdrop-blur-sm shrink-0">
        <div className="px-4 sm:px-6 py-3 flex items-center gap-3">
          <ShieldCheck size={18} className="text-accent shrink-0" />
          <span className="font-semibold text-text-primary text-sm tracking-wide">Dorkbase</span>
          <span className="hidden md:block text-xs text-text-dim font-mono ml-1">/ OSINT Recon</span>

          <div className="ml-auto flex items-center gap-2">
            <a href={BMC_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/15 hover:border-yellow-500/60 text-yellow-400 hover:text-yellow-300 transition-colors text-xs font-medium">
              <Coffee size={13} />
              <span className="hidden sm:inline">Support</span>
            </a>
            <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-bg-elevated hover:border-warn/60 hover:bg-warn/5 text-text-muted hover:text-warn transition-colors text-xs font-medium group">
              <GitHubIcon size={13} className="shrink-0" />
              <Star size={12} className="group-hover:fill-warn group-hover:text-warn transition-all" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── App body ── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">

        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border-subtle bg-bg-secondary/60 backdrop-blur-sm">
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {NAV.map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              const badge = item.id === 'history' && history.length > 0 ? history.length : null;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`nav-item${isActive ? ' active' : ''}`}
                >
                  <Icon size={15} className="shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {badge && (
                    <span className="text-xs bg-accent/20 text-accent-light px-1.5 py-0.5 rounded-full leading-none">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── Main panel ── */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">

            {/* Builder */}
            {activeNav === 'builder' && (
              <section>
                <SectionHeader
                  icon={<Terminal size={16} className="text-accent" />}
                  title="Query Builder"
                  desc="Compose advanced search operators and launch queries across multiple engines."
                />
                <div className="panel card-accent-top p-6">
                  <DorkForm
                    engine={engine}
                    onEngineChange={setEngine}
                    loadedDork={loadedDork}
                    onRunQuery={pushHistory}
                    onToast={toast}
                  />
                </div>
              </section>
            )}

            {/* Templates */}
            {activeNav === 'templates' && (
              <section>
                <SectionHeader
                  icon={<BookOpen size={16} className="text-accent" />}
                  title="Dork Templates"
                  desc="50+ categorized templates. Click Use to load any template into the builder."
                />
                <div className="panel p-4">
                  <DorkTemplates onUse={handleLoadIntoBuilder} />
                </div>
              </section>
            )}

            {/* Recon Analyzer */}
            {activeNav === 'recon' && (
              <section>
                <SectionHeader
                  icon={<ScanSearch size={16} className="text-accent" />}
                  title="Recon Analyzer"
                  desc="Enter a target domain to generate a full recon dork set — categorized by attack surface with risk ratings."
                />
                <div className="panel p-5">
                  <ReconAnalyzer
                    onLoadIntoBuilder={handleLoadIntoBuilder}
                    engine={engine}
                    engineUrl={engineUrl}
                  />
                </div>
              </section>
            )}

            {/* History */}
            {activeNav === 'history' && (
              <section>
                <SectionHeader
                  icon={<Clock size={16} className="text-accent" />}
                  title="Query History"
                  desc="Your last 50 queries, saved locally. Click restore to load any entry back into the builder."
                />
                <div className="panel p-4">
                  <DorkHistory
                    history={history}
                    onRestore={handleRestoreHistory}
                    onRemove={removeHistory}
                    onClear={clearHistory}
                  />
                </div>
              </section>
            )}

            {/* About */}
            {activeNav === 'about' && (
              <section>
                <SectionHeader
                  icon={<Info size={16} className="text-accent" />}
                  title="About"
                  desc="How to use Dorkbase."
                />
                <AboutPanel />
              </section>
            )}

          </div>

          <Footer />
        </main>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 border-t border-border-subtle bg-bg-secondary/95 backdrop-blur-sm flex">
        {NAV.filter(n => n.id !== 'about').map(item => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          const badge = item.id === 'history' && history.length > 0 ? history.length : null;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors
                ${isActive ? 'text-accent-light' : 'text-text-dim hover:text-text-muted'}`}
            >
              <div className="relative">
                <Icon size={18} />
                {badge && (
                  <span className="absolute -top-1 -right-2 text-xs bg-accent text-white px-1 rounded-full leading-none">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </div>
              <span className="text-[10px]">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

function SectionHeader({ icon, title, desc }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="label text-accent">{title}</span>
      </div>
      <p className="text-sm text-text-muted">{desc}</p>
    </div>
  );
}

function AboutPanel() {
  const items = [
    { op: 'site:',     desc: 'Restrict results to a specific domain',          ex: 'site:example.com' },
    { op: 'filetype:', desc: 'Filter by file extension',                        ex: 'filetype:pdf' },
    { op: 'inurl:',    desc: 'Match pages with this string in the URL',         ex: 'inurl:admin' },
    { op: 'intitle:',  desc: 'Match pages with this string in the title',       ex: 'intitle:login' },
    { op: 'intext:',   desc: 'Match pages containing this string in body text', ex: 'intext:password' },
  ];
  return (
    <div className="space-y-4">
      <div className="panel p-5 space-y-3 text-sm text-text-muted leading-relaxed">
        <p>
          Google dorking uses advanced search operators to surface information that standard queries miss —
          exposed directories, specific file types, admin interfaces, and misconfigured servers.
        </p>
        <p>
          Use the <strong className="text-text-primary">Query Builder</strong> to compose queries field by field.
          Use <strong className="text-text-primary">Templates</strong> to browse pre-built dorks by attack surface.
          Use <strong className="text-text-primary">Recon Analyzer</strong> to generate a full dork set for a target domain.
          All queries are saved to <strong className="text-text-primary">History</strong> automatically.
        </p>
        <p className="text-xs text-text-dim border-t border-border-subtle pt-3">
          For authorized security research and educational use only. Do not use against systems you do not own or have explicit permission to test.
        </p>
      </div>

      <div className="panel overflow-hidden">
        <div className="px-4 py-3 border-b border-border-subtle">
          <span className="label">Operator Reference</span>
        </div>
        <div className="divide-y divide-border-subtle">
          {items.map(item => (
            <div key={item.op} className="flex items-start gap-4 px-4 py-3">
              <code className="text-xs font-mono text-accent-light bg-accent/10 px-2 py-0.5 rounded shrink-0 mt-0.5">
                {item.op}
              </code>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-primary">{item.desc}</p>
                <p className="text-xs font-mono text-text-dim mt-0.5">{item.ex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
