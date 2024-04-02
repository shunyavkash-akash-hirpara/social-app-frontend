/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "calc-screen-minus-nav": "calc(100vh - 80px)",
        "calc-for-chat": "calc(100vh - 100px)",
      },
      backgroundColor: {
        "input-primary": "#F6F5F7",
      },
      colors: {
        primary: "#DE2C70",
      },
    },
  },
  plugins: [],
};
