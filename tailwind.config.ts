import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kawaii: {
          rose: "#FFB3BA",
          lavender: "#C9B1FF",
          mint: "#A8E6CF",
          peach: "#FFDAC1",
          sky: "#B5E8F7",
          lemon: "#FFF5BA",
          cream: "#FFF8F0",
          dark: "#4A3F5C",
          pink: "#FF8FAB",
        },
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        fredoka: ["var(--font-fredoka)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        kawaii: "0 4px 20px rgba(201, 177, 255, 0.4)",
        "kawaii-lg": "0 8px 40px rgba(201, 177, 255, 0.5)",
        "kawaii-pink": "0 4px 20px rgba(255, 179, 186, 0.5)",
      },
      animation: {
        "bounce-in": "bounceIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
        "fade-slide-in": "fadeslide 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "60%": { transform: "scale(1.15)" },
          "80%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeslide: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
