/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': "url('/src/imgs/mainsection.svg')",
      },
      fontFamily: {
        helvetica: ['Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

