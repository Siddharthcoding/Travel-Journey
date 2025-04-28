/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorph: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'neumorph-inset': 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 