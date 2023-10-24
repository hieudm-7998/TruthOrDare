/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "1rem",

      // default breakpoints but with 40px removed
      screens: {
        lg: "798px",
        xl: "798px",
      },
    },
  },
  plugins: [],
};
