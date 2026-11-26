/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#071A2B',
        deepblue: '#0B3155',
        royal: '#0B5CAD',
        sky: '#4DA3D9',
        champagne: '#C9A96E',
        ink: '#0F172A',
        mist: '#F8FAFC',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        arabic: ['Noto Kufi Arabic', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 24px 70px rgba(7, 26, 43, 0.12)',
      },
    },
  },
  plugins: [],
};
