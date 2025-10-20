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
        geist: ['"Geist"', 'sans-serif'],
        geistmono: ['"Geist Mono"', 'monospace'],
      },
      colors: {
        rectangles: '#C4DFDF',
        hovertext: '#182225',
        darkblue: '#375358',
        background: '#F8FFFF',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
