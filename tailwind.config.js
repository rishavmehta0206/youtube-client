/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cusdarkbg: "#181818",
        cusdarkbgLighter: "#202020",
        cusdarktext: "white",
        cusdarktextSoft: "#aaaaaa",
        cusdarksoft: "#373737",
        cuslightbg: "#f9f9f9",
        cuslightbgLighter: "white",
        cuslighttext: "black",
        cuslighttextSoft: "#606060",
        cuslightsoft: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
