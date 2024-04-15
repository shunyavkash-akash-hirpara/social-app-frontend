/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "calc-screen-minus-nav": "calc(100vh - 80px)",
        "calc-for-chatList": "calc(100vh - 100px)",
        "calc-for-chats": "calc(100vh - 228px)",
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
