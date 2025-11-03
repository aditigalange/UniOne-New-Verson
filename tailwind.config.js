/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#8B4513',
          light: '#D4AF37',
        },
        accent: {
          dark: '#D4AF37',
          light: '#8B4513',
        },
        background: {
          dark: '#1a1a1a',
          light: '#ffffff',
        },
        surface: {
          dark: '#2d2d2d',
          light: '#f5f5f5',
        },
      },
    },
  },
  plugins: [],
}

