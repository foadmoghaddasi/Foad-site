/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { Kook: ["Kook"] },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
