/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fy: {
          amber: "#FFD166",
          "amber-dim": "#B8962E",
          dark: "#1A1D1B",
          panel: "#222826",
          surface: "#2A302C",
          green: "#5A7D5E",
          "green-dim": "#3D4F40",
          orange: "#F26419",
          red: "#C62828",
          steel: "#A0B0A4",
        },
      },
      fontFamily: {
        hud: ["'Rajdhani'", "sans-serif"],
        body: ["'Noto Sans SC'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "marquee": "marquee 40s linear infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
