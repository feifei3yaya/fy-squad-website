/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fy: {
          amber: "#D6A449",
          "amber-dim": "#9B772F",
          "amber-hc": "#F4C46A", // 高对比度 (WCAG 2.1 AA)
          dark: "#1a1f26",
          panel: "#1f252d",
          surface: "#2a323c",
          green: "#6A88A6",
          "green-dim": "#5B4E36",
          "green-hc": "#8CB0D4", // 高对比度 (WCAG 2.1 AA)
          edge: "#7a6338",
          orange: "#B96F2D",
          "orange-hc": "#D98841", // 高对比度 (WCAG 2.1 AA)
          red: "#B4493A",
          "red-hc": "#D66655", // 高对比度 (WCAG 2.1 AA)
          steel: "#AEB5BB",
          silver: "#D5DBE0",
          info: "#6A88A6",
          warning: "#B96F2D",
          neutral: "#A87A39",
        },
      },
      spacing: {
        '4xs': '0.125rem', // 2px
        '3xs': '0.25rem',  // 4px
        '2xs': '0.375rem', // 6px
        'xs': '0.5rem',    // 8px
        'sm': '0.75rem',   // 12px
        'md': '1rem',      // 16px
        'lg': '1.25rem',   // 20px
        'xl': '1.5rem',    // 24px
        '2xl': '2rem',     // 32px
        '3xl': '2.5rem',   // 40px
        '4xl': '3rem',     // 48px
        '5xl': '4rem',     // 64px
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
      },
      fontFamily: {
        hud: ["'Rajdhani'", "sans-serif"],
        body: ["system-ui", "-apple-system", "'PingFang SC'", "'Microsoft YaHei'", "'Hiragino Sans GB'", "'WenQuanYi Micro Hei'", "sans-serif"],
        mono: ["'Cascadia Code'", "'Fira Code'", "'Consolas'", "'Source Code Pro'", "monospace"],
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
