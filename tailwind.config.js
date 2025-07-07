module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matrix: '#00FF41',
        cyberbg: '#0F111A',
        cyberaccent: '#39FF14',
        cyberpink: '#FF00A0',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        sharetech: ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} 