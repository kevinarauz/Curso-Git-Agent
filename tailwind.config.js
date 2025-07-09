/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'git-orange': '#F05032',
        'git-dark': '#2F1B0C',
        'gitlab-orange': '#FC6D26',
        'github-dark': '#24292F',
        'primary': '#6366F1',
        'secondary': '#8B5CF6',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
