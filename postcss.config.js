module.exports = {
  plugins: [
    "tailwindcss",
    "autoprefixer",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}",
          "./app/**/*.{js,jsx,ts,tsx}",
          "./layouts/**/*.{js,ts,jsx,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          "html",
          "body",
          /^border*/,
          /^w*/,
          /^text*/,
          /^h*/,
          /^rounded*/,
          /^shadow*/,
          /^bg/,
          /^min/,
        ],
      },
    ],
  ],
};
