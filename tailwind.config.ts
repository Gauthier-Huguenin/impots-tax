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
        danger: "#ED2939",
        "tricolore-red": "#ED2939",
        warning: "#c53848",
        info: "#e2e8f0",
        favorable: "#3b82f6",
        blanc: "#e2e8f0",
      },
      fontFamily: {
        mono: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
