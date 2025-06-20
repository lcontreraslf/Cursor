/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem', // px-6 (móvil)
        sm: '2rem',        // px-8
        xl: '3rem',        // px-12
        '2xl': '5rem',     // px-20 (extra márgenes en pantallas grandes)
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px', // 🔒 máximo 1280px incluso en 2xl
      },
    },
    extend: {},
  },
  plugins: [],
};
