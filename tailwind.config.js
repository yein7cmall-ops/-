/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        tight: ['"Inter Tight"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        paper: "#F4ECDC",
        "paper-deep": "#EBE0C8",
        ink: "#0E0E10",
        "ink-soft": "#2A2A2E",
        ember: "#E8521B",
        "ember-soft": "#FF8A5C",
        signal: "#1B4DFF",
        "signal-soft": "#6A8AFF",
        gold: "#C8A45C",
      },
      letterSpacing: {
        widest2: "0.4em",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(.2,.7,.2,1) both",
        "fade-in": "fadeIn 1.2s ease both",
        "spin-slow": "spin 30s linear infinite",
        "drift": "drift 22s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(20px,-30px)" },
        },
      },
    },
  },
  plugins: [],
};
