/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: [
        'ui-sans-serif',
        'Segoe UI',
        'Roboto',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
      ],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
