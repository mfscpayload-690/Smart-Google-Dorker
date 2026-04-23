module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base
        'bg-primary':   '#080c14',
        'bg-secondary': '#0d1117',
        'bg-card':      '#111827',   // was #0f1623 — slightly lighter card
        'bg-elevated':  '#1a2540',   // was #151d2e — more contrast on inputs
        // Accent — electric blue
        'accent':       '#3b82f6',
        'accent-light': '#60a5fa',
        'accent-dim':   '#1d4ed8',
        // Cyan secondary
        'sec':          '#06b6d4',
        'sec-dim':      '#0e7490',
        // Text — significantly brighter hierarchy
        'text-primary': '#f1f5f9',   // was #e2e8f0 — near white
        'text-muted':   '#94a3b8',   // was #64748b — much more readable
        'text-dim':     '#475569',   // was #334155 — visible instead of invisible
        // Border — more visible
        'border-subtle':'#1e3a5f',   // was #1e2d45 — bluer, more contrast
        'border-active':'#3b82f6',
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59,130,246,0.15), 0 0 40px rgba(59,130,246,0.05)',
        'glow-cyan': '0 0 20px rgba(6,182,212,0.12)',
        'card':      '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
  safelist: ['fill-warn'],
}
