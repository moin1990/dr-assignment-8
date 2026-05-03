// @ts-nocheck
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: "#8b4513",
        terracotta: "#c2622d",
        "terracotta-light": "#e8845a",
        cream: "#f5f0e8",
        parchment: "#ede8dc",
        stone: "#9e9789",
        charcoal: "#2c2a27",
        dark: "#1a1814",
        brass: "#b5a050",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        tilegallery: {
          primary: "#c2622d",
          "primary-content": "#f5f0e8",
          secondary: "#b5a050",
          "secondary-content": "#1a1814",
          accent: "#7d9a7d",
          "accent-content": "#f5f0e8",
          neutral: "#2c2a27",
          "neutral-content": "#f5f0e8",
          "base-100": "#f5f0e8",
          "base-200": "#ede8dc",
          "base-300": "#e0d9cc",
          "base-content": "#2c2a27",
          info: "#60a5fa",
          success: "#7d9a7d",
          warning: "#b5a050",
          error: "#c2622d",
        },
      },
    ],
    darkTheme: "tilegallery",
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};

export default config;
