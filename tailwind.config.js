/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Tailles personnalisées
      'xg': '1080px',
      'gd': '880px',
      'sc': '630px',
      'sl': '600px', 
      'xs': '480px', 
      'tiny': '360px',
      'micro': '320px', 
      'nano': '280px',
    },
    extend: {
      width:{
        '30':'30%',
        '50':'50%',
        '70':'70%',
        '80':'80%',
        '90':'90%',
      },
      height:{
        '30':'50vh',
        '50':'50%',
        '70':'70%',
        '90':'90%',
      },
    },
    
  },
  plugins: [],
}

