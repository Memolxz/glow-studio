/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter'],
        poppins: ['poppins'],
        nunito: ['nunito'],
      },
      colors: {
        rectangles: '#C4DFDF',
        hovertext: '#182225',
        darkblue: '#375358',
        defaultbg: '#FFFFFF',
      }
    },
  },
  plugins: [],
}
