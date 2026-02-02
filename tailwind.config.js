/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'starwars': {
          yellow: '#FFE81F',
          black: '#000000',
          darkgray: '#1a1a1a',
          gray: '#2a2a2a',
        }
      },
      fontFamily: {
        'starwars': ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}