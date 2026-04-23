import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Home } from 'lucide-react';
import GridBackground from '../components/GridBackground';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg-primary text-text-primary px-6">
      <GridBackground />
      <div className="relative z-10 text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-elevated border border-border-subtle mb-6">
          <ShieldCheck size={28} className="text-text-dim" />
        </div>
        <p className="text-6xl font-bold text-text-dim font-mono mb-2">404</p>
        <h1 className="text-xl font-semibold text-text-primary mb-2">Page not found</h1>
        <p className="text-sm text-text-muted mb-8 leading-relaxed">
          This URL doesn't exist. You may have followed a broken link or typed the address incorrectly.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate('/app')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-light text-white font-semibold text-sm transition-colors"
          >
            Open Dorkbase
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-bg-elevated hover:border-accent/50 text-text-muted hover:text-text-primary text-sm font-medium transition-colors"
          >
            <Home size={15} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
