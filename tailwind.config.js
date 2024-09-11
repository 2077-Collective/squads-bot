import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx}",
    "index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan2077: "#32DADC",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "i-fucking-hate-this": {
          extend: "dark",
          colors: {
            content1: "#000000",
            content2: "#18181b",
            divider: "#32DADC",
            primary: "#32DADC",
          },
        },
      },
    }),
    typography(),
  ],
};
