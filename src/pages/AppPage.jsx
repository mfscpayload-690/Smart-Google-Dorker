import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Star, Coffee,
  Terminal, BookOpen, Clock, ScanSearch, Info,
  Search, Globe, FileText, Link2, AlignLeft,
  MousePointerClick, Layers, Share2, AlertTriangle,
  CheckCircle2,
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
  { id: 'templates', label: 'Templates',        icon: BookOpen,    desc: 'Browse 275+ dork templates' },
  { id: 'recon',     label: 'Recon Analyzer',   icon: ScanSearch,  desc: 'Domain recon dork set' },
  { id: 'history',   label: 'History',          icon: Clock,       desc: 'Past queries' },
  { id: 'about',     label: 'About',            icon: Info,        desc: 'How to use this tool' },
];

export default function App() {
  const [activeNav, setActiveNav]   = useState('builder');
  const [engine, setEngine]         = useState('google');
  const [loadedDork, setLoadedDork] = useState(null); // signal to DorkForm to load a dork

  const navigate = useNavigate();
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
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ShieldCheck size={18} className="text-accent shrink-0" />
            <span className="font-semibold text-text-primary text-sm tracking-wide">Dorkbase</span>
          </button>
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
          <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 pb-24 md:pb-8">
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
                  desc="275+ categorized templates. Click Use to load any template into the builder."
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

          {activeNav === 'about' && <Footer />}
        </main>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 border-t border-border-subtle bg-bg-secondary/95 backdrop-blur-sm flex">
        {NAV.map(item => {
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
  const operators = [
    { op: 'site:',     icon: Globe,      color: 'text-blue-400',   border: 'border-blue-500/50',   bg: 'bg-blue-500/10',   desc: 'Restrict results to a specific domain',          ex: 'site:example.com' },
    { op: 'filetype:', icon: FileText,   color: 'text-purple-400', border: 'border-purple-500/50', bg: 'bg-purple-500/10', desc: 'Filter by file extension',                        ex: 'filetype:pdf' },
    { op: 'inurl:',    icon: Link2,      color: 'text-cyan-400',   border: 'border-cyan-500/50',   bg: 'bg-cyan-500/10',   desc: 'Match pages with this string in the URL',         ex: 'inurl:admin' },
    { op: 'intitle:',  icon: Search,     color: 'text-green-400',  border: 'border-green-500/50',  bg: 'bg-green-500/10',  desc: 'Match pages with this string in the title',       ex: 'intitle:login' },
    { op: 'intext:',   icon: AlignLeft,  color: 'text-orange-400', border: 'border-orange-500/50', bg: 'bg-orange-500/10', desc: 'Match pages containing this string in body text', ex: 'intext:password' },
  ];

  const features = [
    { id: 'builder',   icon: Terminal,   label: 'Query Builder',   desc: 'Compose queries field by field with live preview' },
    { id: 'templates', icon: BookOpen,   label: 'Templates',       desc: '275+ pre-built dorks organized by attack surface' },
    { id: 'recon',     icon: ScanSearch, label: 'Recon Analyzer',  desc: 'Full dork set for a target domain with risk ratings' },
    { id: 'history',   icon: Clock,      label: 'History',         desc: 'Last 50 queries saved locally, one-click restore' },
    { id: 'share',     icon: Share2,     label: 'Share URL',       desc: 'Every query is shareable via a permalink in the URL' },
  ];

  const steps = [
    { n: '1', title: 'Pick an engine', body: 'Choose Google, DuckDuckGo, Startpage, or Shodan from the engine selector in the Query Builder.' },
    { n: '2', title: 'Build your query', body: 'Add operators one by one in the builder, or load a ready-made template from the Templates tab.' },
    { n: '3', title: 'Run it', body: 'Hit Search — the query opens in a new tab. It\'s also saved to History automatically.' },
  ];

  return (
    <div className="space-y-6">

      {/* Quick Start */}
      <div className="panel card-accent-top overflow-hidden">
        <div className="px-5 py-3 border-b border-border-subtle">
          <span className="label">Quick Start</span>
        </div>
        <div className="p-5 grid sm:grid-cols-3 gap-4">
          {steps.map(step => (
            <div key={step.n} className="flex gap-3">
              <div className="shrink-0 w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                <span className="text-xs font-bold text-accent-light">{step.n}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary mb-0.5">{step.title}</p>
                <p className="text-xs text-text-muted leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features at a glance */}
      <div>
        <p className="label mb-3">Features at a glance</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.id} className={`panel p-4 flex gap-3 items-start hover:border-accent/40 transition-colors${i < 3 ? ' lg:col-span-2' : ' lg:col-span-3'}`}>
                <div className="shrink-0 w-8 h-8 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon size={15} className="text-accent-light" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary leading-tight">{f.label}</p>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operator Reference */}
      <div className="panel overflow-hidden">
        <div className="px-5 py-3 border-b border-border-subtle">
          <span className="label">Operator Reference</span>
        </div>
        <div className="divide-y divide-border-subtle">
          {operators.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.op} className={`flex items-start gap-4 px-5 py-3.5 border-l-2 ${item.border}`}>
                <div className={`shrink-0 w-7 h-7 rounded-md ${item.bg} flex items-center justify-center mt-0.5`}>
                  <Icon size={13} className={item.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <code className={`text-xs font-mono font-semibold ${item.color}`}>{item.op}</code>
                    <span className="text-xs text-text-primary">{item.desc}</span>
                  </div>
                  <p className="text-xs font-mono text-text-dim">{item.ex}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3.5">
        <AlertTriangle size={15} className="text-yellow-400 shrink-0 mt-0.5" />
        <p className="text-xs text-yellow-300/80 leading-relaxed">
          <span className="font-semibold text-yellow-300">Authorized use only.</span>{' '}
          For security research and educational purposes. Do not use against systems you do not own or have explicit written permission to test.
        </p>
      </div>

    </div>
  );
}
