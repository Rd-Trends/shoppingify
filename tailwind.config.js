const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-quicksand)", ...fontFamily.sans],
      },
      colors: {
        "font-color": "#34333A",
        yellow: "#F9A109",
        purple: "#80485B",
        "light-purple": "#FFF0DE",
        red: "#EB5757",
        cyan: "#56CCF2",
        "bg-body": "#FAFAFE",
        "grey": "#C1C1C4"
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),

    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
  ],
};
