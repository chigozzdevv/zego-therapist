import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: '#9333ea',
          700: '#7c3aed',
        }
      }
    },
  },
  plugins: [],
} satisfies Config
