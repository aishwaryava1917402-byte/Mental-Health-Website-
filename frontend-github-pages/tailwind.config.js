/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#F9F7F2',
        foreground: '#2D3436',
        primary: {
          DEFAULT: '#4A6741',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#E07A5F',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#E8E6E1',
          foreground: '#636E72',
        },
        accent: {
          DEFAULT: '#D4A373',
          foreground: '#2D3436',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2D3436',
        },
        border: '#E2E8F0',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};