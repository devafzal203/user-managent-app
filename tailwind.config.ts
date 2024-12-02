import type { Config } from "tailwindcss";
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      sm: { min: "320px", max: "480px" },
      md: { min: "481px", max: "768px" },
      lg: { min: "769px", max: "1067px" },
      xl: { min: "1068px", max: "1200px" },
      "2xl": { min: "1201px" },
    },
    extend: {
      colors: {
        primary: "#a664e8",
        secondary: "#140227",
      },
      fontFamily: {
        rubik: ["Rubik"],
      },
      backgroundImage: {
        box: "linear-gradient(45deg, rgb(140, 56, 225), rgb(191, 144, 239))",
      },
    },
  },
  plugins: [tailwindScrollbar],
} satisfies Config;
