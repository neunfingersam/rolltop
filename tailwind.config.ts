import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A7C59',
        'primary-dark': '#2E5C3E',
        'primary-light': '#EAF2EC',
        background: '#F8F5F0',
        surface: '#FFFFFF',
        'text-main': '#1C1C1C',
        'text-muted': '#6B6B6B',
        border: '#E5E0D8',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
