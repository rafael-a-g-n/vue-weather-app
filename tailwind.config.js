/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-primary': '#1A202C',
        'dark-secondary': '#2D3748',
        'orange-accent': '#ED8936',
      },
    },
  },
  plugins: [],
}
