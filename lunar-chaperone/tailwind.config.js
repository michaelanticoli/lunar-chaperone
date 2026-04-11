/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F4F1EA',
          dark: '#EAE5DB',
        },
        ink: {
          DEFAULT: '#1A1A18',
          light: '#4A4A46',
          muted: '#8C8C85',
        },
        gold: {
          DEFAULT: '#C4A77D',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.25em',
      }
    },
  },
  plugins: [],
}