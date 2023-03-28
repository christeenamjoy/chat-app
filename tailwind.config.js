/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*[.tsx,.ts]"],
  theme: {
    extend: {
      maxWidth: {
        "1/2": "50%",
        "3/4": "70%",
      },
    },
  },
  plugins: [],
};
