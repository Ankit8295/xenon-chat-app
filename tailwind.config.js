/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hover_dark: "#212529",
        hover_light: "#e9ecef",
        primary_light: "#eae0d5",
        primary_dark: "#2d3142",
        bg_dark: "#171B1D",
        bg_light: "#F9F9F9",
      },
    },
  },
  plugins: [],
};
