import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-emerald-500/15",
    "text-emerald-500",
    "bg-amber-500/15",
    "text-amber-500",
    "bg-red-500/15",
    "text-red-500",
    "bg-violet-500/15",
    "text-violet-500",
    "bg-gray-500/15",
    "text-gray-400",
    "border-emerald-500/20",
    "border-amber-500/20",
    "border-red-500/20",
    "border-violet-500/20",
    "border-gray-500/20",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-red-500",
    "text-emerald-400",
    "text-red-400",
    "text-amber-400",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7c3bed",
        "th-bg": "var(--bg-main)",
        "th-surface": "var(--bg-surface)",
        "th-surface-hover": "var(--bg-surface-hover)",
        "th-border": "var(--border-subtle)",
        "th-text": "var(--text-primary)",
        "th-text-secondary": "var(--text-secondary)",
        "th-text-muted": "var(--text-muted)",
        "background-light": "#f7f6f8",
        "background-dark": "var(--bg-main)",
        surface: "var(--bg-surface)",
        "border-subtle": "var(--border-subtle)",
        brand: {
          primary: "#7C3AED",
          primaryHover: "#6D28D9",
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          info: "#3B82F6",
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
