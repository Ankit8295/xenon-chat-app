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
      animation: {
        from_top: "from_top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        from_top: {
          "0%": {
            transform: translateY(0),
          },
          "100%": { transform: translateY("-100px") },
        },
      },
    },
  },
  plugins: [],
};
