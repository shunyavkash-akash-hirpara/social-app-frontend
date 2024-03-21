/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "calc-screen-minus-nav": "calc(100vh - 80px)",
      },
      backgroundColor: {
        "input-primary": "#F6F5F7",
      },
    },
  },
  plugins: [],
};
