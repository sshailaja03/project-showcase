/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0a0f',
          card: '#13131c',
          border: '#2a2a3b',
          glow: '#5e43f3',
        }
      },
      boxShadow: {
        glow: '0 0 15px rgba(94, 67, 243, 0.4)',
        'glow-strong': '0 0 25px rgba(94, 67, 243, 0.7)',
      }
    },
  },
  plugins: [],
}
