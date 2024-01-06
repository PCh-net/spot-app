/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Szuka klas Tailwind we wszystkich plikach JavaScript/TypeScript w katalogu src
    "./public/index.html",        // Możesz także dodać pliki HTML, jeśli używasz Tailwind w nich
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
