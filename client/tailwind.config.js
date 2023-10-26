/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
     fontFamily: {
      Ubuntu: ['Ubuntu', 'sans-serif'],
      Merriweather: ['Merriweather', 'serif'],
      Lato: ['Lato', 'sans-serif'],
      Montserrat: ['Montserrat Alternates', 'sans-serif']
    },
  },

   plugins: [
     require('preline/plugin'),
   ],
    preline: {
    themes: [],
   },
}