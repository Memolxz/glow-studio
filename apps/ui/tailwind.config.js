/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'sans-serif'],
        poppins: ['poppins', 'sans-serif'],
        nunito: ['nunito', 'sans-serif'],
      },
      colors: {
        warmgray: '#9D9898',
        warmdarkgray: '#6E6969',
        defaultbg: '#F3F3F3',
      }
    },
  },
  plugins: [],
}
