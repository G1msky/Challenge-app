/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flyonui/flyonui.js",
    "./node_modules/flyonui/dist/js/*.js",
    "./node_modules/flatpickr/dist/flatpickr.js",
    "./src/**/*.{vue,js,ts}",
    "*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
        ],
      },
      container: {
        padding: {
          DEFAULT: "0.5rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [require("flyonui"), require("flyonui/plugin")],
  flyonui: {
    themes: ["light", "dark", "gourmet", "corporate", "luxury", "soft"],
  },
};
