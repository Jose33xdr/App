/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        danger: '#c0392b',
        success: '#1a7f4b',
      },
    },
  },
  plugins: [],
};