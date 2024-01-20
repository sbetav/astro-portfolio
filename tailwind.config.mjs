/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Vollkorn Variable"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        "gray-bg": "#111",
      },
      minHeight: {
        hero: "calc(100vh - 90px)",
        'custom-screen': 'calc(100vh - 141px)'
      },
    },
  },
  plugins: [],
};
