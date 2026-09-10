/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          accent: '#5850ec',
        },
        feed: {
          bg: '#f3f4f8',
          card: '#ffffff',
        }
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 1px 4px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.07), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
        'float': '0 12px 28px -4px rgba(15, 23, 42, 0.12)',
      }
    },
  },
  plugins: [],
};
