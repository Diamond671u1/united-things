/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0D47A1',
        'brand-blue-dark': '#0A3A82',
        'brand-gray': '#F5F7FA',
        'brand-text': '#334155',
        'brand-accent': '#FFC107',
      },
    },
  },
  plugins: [],
}
