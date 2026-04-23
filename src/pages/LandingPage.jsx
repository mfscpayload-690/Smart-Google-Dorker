import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Terminal, BookOpen, ScanSearch,
  Clock, Link, Download, ArrowRight, Star, Coffee,
  ChevronRight, Globe, FileSearch, Lock,
} from 'lucide-react';
import GridBackground from '../components/GridBackground';
import GitHubIcon from '../components/GitHubIcon';
import Footer from '../components/Footer';

const GITHUB_REPO = 'https://github.com/mfscpayload-690/dorkbase';
const BMC_URL     = 'https://buymeacoffee.com/mfscpayload690';

// ── Typewriter ──────────────────────────────────────────────────────────────
const DORK_LINES = [
  'site:example.com filetype:env',
  'site:example.com inurl:admin intitle:login',
  'site:example.com intext:"DB_PASSWORD"',
  'site:example.com intitle:"index of /"',
  'site:s3.amazonaws.com "example.com"',
  'site:example.com filetype:sql intext:password',
];

function Typewriter() {
  const [lineIdx, setLineIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase]       = useState('typing'); // typing | pause | erasing

  useEffect(() => {
    const line = DORK_LINES[lineIdx];
    let timeout;

    if (phase === 'typing') {
      if (displayed.length < line.length) {
        timeout = setTimeout(() => setDisplayed(line.slice(0, displayed.length + 1)), 45);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1400);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('erasing'), 300);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 22);
      } else {
        setLineIdx(i => (i + 1) % DORK_LINES.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, lineIdx]);

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-secondary overflow-hidden shadow-card">
      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border-subtle bg-bg-elevated">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-3 text-xs text-text-dim font-mono">dorkbase — query builder</span>
      </div>
      {/* Terminal body */}
      <div className="px-5 py-5 font-mono text-sm space-y-3 min-h-[180px]">
        <div className="flex items-center gap-2 text-text-dim text-xs">
          <span className="text-success">✓</span>
          <span>target: <span className="text-accent-light">example.com</span></span>
        </div>
        <div className="flex items-center gap-2 text-text-dim text-xs">
          <span className="text-success">✓</span>
          <span>engine: <span className="text-accent-light">Google</span></span>
        </div>
        <div className="mt-4">
          <span className="text-text-dim text-xs">query</span>
          <div className="mt-1.5 text-accent-light text-sm break-all">
            {displayed}
            <span className="inline-block w-0.5 h-4 bg-accent-light ml-0.5 animate-pulse align-middle" />
          </div>
        </div>
        <div className="pt-2 flex gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent-light">Run Query</span>
          <span className="text-xs px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-text-dim">Copy</span>
          <span className="text-xs px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-text-dim">Share</span>
        </div>
      </div>
    </div>
  );
}

// ── Feature cards ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Terminal,
    title: 'Query Builder',
    desc: 'Compose dorks field by field — site, filetype, inurl, intitle, intext — with a live preview that updates as you type.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: BookOpen,
    title: 'Template Library',
    desc: '275+ pre-built dorks across 10 attack surface categories. Search, browse, and load any template into the builder instantly.',
    color: 'text-sec',
    bg: 'bg-sec/10',
  },
  {
    icon: ScanSearch,
    title: 'Recon Analyzer',
    desc: 'Enter a domain and generate a full recon dork set — categorized by attack surface with Critical / High / Medium risk ratings.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    icon: Clock,
    title: 'Query History',
    desc: 'Every query you run is saved locally. Browse, search, and restore past queries with one click.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Link,
    title: 'Share via URL',
    desc: 'Every query state is encoded in the URL. Copy a shareable link and send it to a teammate — they open it pre-filled.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Download,
    title: 'Export',
    desc: 'Download your recon dork sets as annotated .txt files — ready to drop into your notes or feed into other tools.',
    color: 'text-sec',
    bg: 'bg-sec/10',
  },
];

// ── Steps ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: '01',
    icon: Globe,
    title: 'Pick your engine',
    desc: 'Choose from Google, DuckDuckGo, Startpage, or Shodan.',
  },
  {
    n: '02',
    icon: FileSearch,
    title: 'Build your query',
    desc: 'Fill in operator fields or load a template. Preview updates in real time.',
  },
  {
    n: '03',
    icon: Lock,
    title: 'Run & analyze',
    desc: 'Launch the query, export results, or load into the Recon Analyzer for a full domain sweep.',
  },
];

// ── Use cases ────────────────────────────────────────────────────────────────
const USE_CASES = [
  { label: 'Penetration testers',        desc: 'Map attack surface before an engagement' },
  { label: 'Bug bounty hunters',         desc: 'Find exposed assets and misconfigurations' },
  { label: 'OSINT researchers',          desc: 'Surface publicly accessible sensitive data' },
  { label: 'Security engineers',         desc: 'Audit your own organization\'s exposure' },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <GridBackground />

      {/* ── Nav ── */}
      <header className="relative z-20 border-b border-border-subtle bg-bg-secondary/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">
          <ShieldCheck size={18} className="text-accent shrink-0" />
          <span className="font-semibold text-text-primary text-sm tracking-wide">Dorkbase</span>
          <span className="hidden md:block text-xs text-text-dim font-mono ml-1">/ OSINT Recon</span>
          <div className="ml-auto flex items-center gap-2">
            <a href={BMC_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/15 text-yellow-400 hover:text-yellow-300 transition-colors text-xs font-medium">
              <Coffee size={13} />
              <span className="hidden sm:inline">Support</span>
            </a>
            <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-bg-elevated hover:border-warn/60 hover:bg-warn/5 text-text-muted hover:text-warn transition-colors text-xs font-medium group">
              <GitHubIcon size={13} />
              <Star size={12} className="group-hover:fill-warn group-hover:text-warn transition-all" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">

        {/* ── Hero ── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent-light text-xs font-medium mb-6">
              <ShieldCheck size={12} />
              Open-source OSINT toolkit
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">
              <span className="text-text-primary">Surface what</span>
              <br />
              <span className="bg-gradient-to-r from-accent-light to-sec bg-clip-text text-transparent">
                shouldn't be visible.
              </span>
            </h1>
            <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-md">
              Dorkbase is a professional Google dork query builder for penetration testers and OSINT researchers.
              Templates, recon analysis, history, and shareable links — all in one tool.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/app')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-light text-white font-semibold text-sm transition-colors shadow-glow-blue"
              >
                Start Dorking
                <ArrowRight size={16} />
              </button>
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border-subtle bg-bg-elevated hover:border-accent/50 text-text-muted hover:text-text-primary text-sm font-medium transition-colors">
                <GitHubIcon size={14} />
                View on GitHub
              </a>
            </div>
          </div>

          {/* Right — animated terminal */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            <Typewriter />
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="border-y border-border-subtle bg-bg-secondary/40">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-x-10 gap-y-3">
            {[
              { value: '275+', label: 'Dork Templates' },
              { value: '10',   label: 'Template Categories' },
              { value: '4',    label: 'Search Engines' },
              { value: '100%', label: 'Open Source' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="text-xl font-bold text-accent-light">{s.value}</span>
                <span className="text-sm text-text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="label text-accent block mb-2">Features</span>
            <h2 className="text-2xl font-bold text-text-primary">Everything you need for recon</h2>
            <p className="text-text-muted text-sm mt-2 max-w-lg mx-auto">
              Built around the actual workflow of a security researcher — not just a form with a search button.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="panel card-accent-top p-5 hover:border-accent/30 transition-colors">
                  <div className={`inline-flex p-2 rounded-md ${f.bg} mb-3`}>
                    <Icon size={16} className={f.color} />
                  </div>
                  <h3 className="font-semibold text-text-primary text-sm mb-1.5">{f.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="border-y border-border-subtle bg-bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <span className="label text-accent block mb-2">How it works</span>
              <h2 className="text-2xl font-bold text-text-primary">Three steps to recon</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.n} className="flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-text-dim">{step.n}</span>
                      <div className="p-2 rounded-md bg-accent/10 border border-accent/20">
                        <Icon size={15} className="text-accent-light" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-text-primary text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Use cases ── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="label text-accent block mb-2">Use Cases</span>
            <h2 className="text-2xl font-bold text-text-primary">Built for security professionals</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {USE_CASES.map(u => (
              <div key={u.label} className="flex items-start gap-3 p-4 rounded-lg border border-border-subtle bg-bg-card hover:border-accent/30 transition-colors">
                <ChevronRight size={14} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{u.label}</p>
                  <p className="text-xs text-text-muted mt-0.5">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-border-subtle bg-bg-secondary/40">
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Ready to start?</h2>
            <p className="text-text-muted text-sm mb-8 max-w-sm mx-auto">
              No sign-up. No install. Open the tool and start building queries immediately.
            </p>
            <button
              onClick={() => navigate('/app')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent hover:bg-accent-light text-white font-semibold text-base transition-colors shadow-glow-blue"
            >
              Start Dorking
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
