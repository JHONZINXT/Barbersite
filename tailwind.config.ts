import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14100C",
        brick: "#241810",
        brickdark: "#1C130D",
        card: "#2A1E16",
        card2: "#221811",
        amber: "#E8942C",
        amber2: "#F5B45C",
        cream: "#F3EADE",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        body: ["var(--font-barlow)"],
        mono: ["var(--font-jbmono)"],
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
