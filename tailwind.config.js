/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'imagel': "url('./media/weather.png')",  
      },
    },
  },
  plugins: [],
};
