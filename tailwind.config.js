/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,tx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss'),
  require('autoprefixer')],
}

