/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  // plugins: [require('daisyui')],
  // daisyui: {
  //   themes: [],
  // },
   plugins: [
     require('preline/plugin'),
   ],
    preline: {
    themes: [],
   },
}