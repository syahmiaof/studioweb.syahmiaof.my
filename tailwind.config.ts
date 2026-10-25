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
        ink: {
          DEFAULT: "#09090B",
          50: "#18181B",
          100: "#121216",
          200: "#1A1A20",
          border: "#27272A",
          muted: "#3F3F46",
        },
        surface: {
          DEFAULT: "#121216",
          elevated: "#18181E",
          hover: "#22222A",
        },
        acid: {
          DEFAULT: "#F3FF00",
          hover: "#D9E500",
          muted: "rgba(243, 255, 0, 0.12)",
          border: "rgba(243, 255, 0, 0.4)",
        },
        cobalt: {
          DEFAULT: "#103BFF",
          hover: "#0D30D9",
          light: "#3B62FF",
          muted: "rgba(16, 59, 255, 0.15)",
          border: "rgba(16, 59, 255, 0.4)",
        },
        concrete: {
          DEFAULT: "#EEEDE8",
          muted: "#D8D6CE",
          dark: "#1A1A1E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #F3FF00",
        "brutal-cobalt": "4px 4px 0px 0px #103BFF",
        "brutal-white": "4px 4px 0px 0px #FFFFFF",
        "brutal-dark": "6px 6px 0px 0px #09090B",
        "brutal-lg": "8px 8px 0px 0px #F3FF00",
      },
      transformOrigin: {
        "perspective-center": "center center",
      },
    },
  },
  plugins: [],
};
export default config;
