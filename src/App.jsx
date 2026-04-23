import { ShieldCheck, Terminal, Star } from 'lucide-react';
import GridBackground from './components/GridBackground';
import DorkForm from './components/DorkForm';
import Footer from './components/Footer';
import GitHubIcon from './components/GitHubIcon';

const GITHUB_REPO = 'https://github.com/mfscpayload-690/Smart-Google-Dorker';

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <GridBackground />

      {/* Top nav bar */}
      <header className="relative z-10 border-b border-border-subtle bg-bg-secondary/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
          <ShieldCheck size={20} className="text-accent" />
          <span className="font-semibold text-text-primary text-sm tracking-wide">Smart Google Dorker</span>

          <div className="ml-auto flex items-center gap-3">
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-bg-elevated hover:border-warn/60 hover:bg-warn/5 text-text-muted hover:text-warn transition-colors text-xs font-medium group"
            >
              <GitHubIcon size={13} className="shrink-0" />
              <Star size={12} className="group-hover:fill-warn group-hover:text-warn transition-all" />
              Star on GitHub
            </a>
            <span className="text-xs text-text-muted font-mono hidden sm:block">OSINT / Recon</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">

          {/* Page heading */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} className="text-accent" />
              <span className="label text-accent">Query Builder</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Google Dork Query Builder
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              Compose advanced search operators and launch queries across multiple engines.
            </p>
          </div>

          {/* Card */}
          <div className="panel card-accent-top p-6">
            <DorkForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
