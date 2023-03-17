const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "html",
    "body",
    { pattern: /^border*/ },
    { pattern: /^w*/ },
    { pattern: /^text*/ },
    { pattern: /^h*/ },
    { pattern: /^rounded*/ },
    { pattern: /^shadow*/ },
    { pattern: /^bg*/ },
    { pattern: /^min*/ },
    { pattern: /^p*/ },
    { pattern: /^b*/ },
    { pattern: /^translate*/ },
    { pattern: /^transition*/ },
    { pattern: /^duration*/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-quicksand)", ...fontFamily.sans],
      },
      colors: {
        font_color: "#34333A",
        yellow: "#F9A109",
        purple: "#80485B",
        light_purple: "#FFF0DE",
        red: "#EB5757",
        cyan: "#56CCF2",
        body_bg: "#FAFAFE",
        grey: "#C1C1C4",
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),

    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
  ],
};
