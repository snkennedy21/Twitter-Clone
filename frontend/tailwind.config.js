/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#1d9bf0",
        blackText: "#0f1319",
        greyBorder: "#e5e8e8",
      },
    },
  },
  plugins: [],
};
