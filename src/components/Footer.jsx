import React from 'react';
import { GitBranch, GitFork, Bug, MessageSquare, Star, ExternalLink, ShieldCheck } from 'lucide-react';

const GITHUB_REPO = 'https://github.com/mfscpayload-690/Smart-Google-Dorker';
const GITHUB_USER = 'https://github.com/mfscpayload-690';

const links = [
  {
    icon: <GitFork size={14} />,
    label: 'Fork',
    href: `${GITHUB_REPO}/fork`,
    description: 'Fork this repo',
  },
  {
    icon: <Star size={14} />,
    label: 'Star',
    href: GITHUB_REPO,
    description: 'Star on GitHub',
  },
  {
    icon: <Bug size={14} />,
    label: 'Issues',
    href: `${GITHUB_REPO}/issues`,
    description: 'Report a bug',
  },
  {
    icon: <MessageSquare size={14} />,
    label: 'Discussions',
    href: `${GITHUB_REPO}/discussions`,
    description: 'Join the discussion',
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle bg-bg-secondary/60 backdrop-blur-sm mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">

          {/* Brand / author */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-accent shrink-0" />
              <span className="font-semibold text-text-primary text-sm">Smart Google Dorker</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed max-w-xs">
              An open-source OSINT query builder for security researchers and penetration testers.
              Built with React, Vite, and Tailwind CSS.
            </p>
            <a
              href={GITHUB_USER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs text-text-muted hover:text-accent-light transition-colors group"
            >
              <GitBranch size={13} />
              <span>mfscpayload-690</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
            </a>
          </div>

          {/* Contribute links */}
          <div>
            <p className="label mb-3">Contribute</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-text-muted hover:text-accent-light transition-colors group"
                >
                  <span className="text-text-dim group-hover:text-accent transition-colors">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="label mb-3">Resources</p>
            <div className="flex flex-col gap-2">
              <a
                href={`${GITHUB_REPO}/blob/main/README.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-text-muted hover:text-accent-light transition-colors"
              >
                Documentation
              </a>
              <a
                href={`${GITHUB_REPO}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-text-muted hover:text-accent-light transition-colors"
              >
                MIT License
              </a>
              <a
                href={`${GITHUB_REPO}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-text-muted hover:text-accent-light transition-colors"
              >
                Changelog
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="divider pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-text-dim">
            © {new Date().getFullYear()} Aravind Lal. Released under the{' '}
            <a
              href={`${GITHUB_REPO}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-muted transition-colors underline underline-offset-2"
            >
              MIT License
            </a>.
          </p>
          <p className="text-xs text-text-dim">
            For authorized security research and educational use only.
          </p>
        </div>
      </div>
    </footer>
  );
}
