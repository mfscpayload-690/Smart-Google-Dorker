import { ShieldCheck, Terminal } from 'lucide-react';
import GridBackground from './components/GridBackground';
import DorkForm from './components/DorkForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <GridBackground />

      {/* Top nav bar */}
      <header className="relative z-10 border-b border-border-subtle bg-bg-secondary/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
          <ShieldCheck size={20} className="text-accent" />
          <span className="font-semibold text-text-primary text-sm tracking-wide">Smart Google Dorker</span>
          <span className="ml-auto text-xs text-text-muted font-mono">OSINT / Recon</span>
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
