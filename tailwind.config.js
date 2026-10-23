/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f2f6f7",
          100: "#e2eaed",
          200: "#c4d3d9",
          300: "#97b0ba",
          400: "#688d9a",
          500: "#4f7382",
          600: "#425d6a",
          700: "#384d57",
          800: "#314049",
          900: "#2a363d",
          950: "#12181d",
        },
        tide: {
          50: "#edfaf7",
          100: "#d2f4ed",
          200: "#a6e9db",
          300: "#6fd4c1",
          400: "#3bb8a3",
          500: "#1f9d8a",
          600: "#187f71",
          700: "#16665c",
          800: "#15524b",
          900: "#14453f",
        },
        ember: {
          400: "#eba06a",
          500: "#e07a2f",
          600: "#c45f1a",
        },
        rail: {
          DEFAULT: "#151c22",
          50: "#1c252d",
          100: "#243039",
          200: "#31414d",
          muted: "#8aa0ab",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Sora"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 20px 48px -28px rgba(18, 24, 29, 0.5)",
        soft: "0 10px 28px -16px rgba(18, 24, 29, 0.38)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-6px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s ease-out both",
        "soft-pulse": "soft-pulse 5s ease-in-out infinite",
        "slide-in": "slide-in 0.28s ease-out both",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
