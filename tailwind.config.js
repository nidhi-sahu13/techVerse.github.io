/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "NavShadow": 'rgba(24, 39, 75, 0.08) 0px 8px 24px -4px, rgba(24, 39, 75, 0.12) 0px 6px 12px -6px'
      },
      animation: {
        'custom': 'customAnimation 10s linear infinite',
      },
      fontFamily: {
        'salar': 'sans-serif'
      }, 
      screens: {
        'vsm': {'max':'650px'},
      },
    },
  },
  plugins: [],
}