import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0c10",
        panel: "#0f1218",
        danger: "#ff2d2d",
        warning: "#ffb020",
        info: "#00d4ff",
        favorable: "#00ff88",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Share Tech Mono", "monospace"],
        display: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
