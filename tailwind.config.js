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
        'bg-card':      '#0f1623',
        'bg-elevated':  '#151d2e',
        // Accent — electric blue
        'accent':       '#3b82f6',
        'accent-light': '#60a5fa',
        'accent-dim':   '#1d4ed8',
        // Cyan secondary
        'sec':          '#06b6d4',
        'sec-dim':      '#0e7490',
        // Text
        'text-primary': '#e2e8f0',
        'text-muted':   '#64748b',
        'text-dim':     '#334155',
        // Status
        'danger':       '#ef4444',
        'warn':         '#f59e0b',
        'success':      '#10b981',
        // Border
        'border-subtle':'#1e2d45',
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
}
