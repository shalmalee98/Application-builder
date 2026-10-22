/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f7f8",
          100: "#e3ebed",
          200: "#c5d5da",
          300: "#9bb5be",
          400: "#6d8f9c",
          500: "#527482",
          600: "#455e6b",
          700: "#3b4e59",
          800: "#34434c",
          900: "#2e3a42",
          950: "#1a2228",
        },
        tide: {
          50: "#eefbf8",
          100: "#d5f5ee",
          200: "#aeebdd",
          300: "#79d9c7",
          400: "#43bfab",
          500: "#27a391",
          600: "#1c8376",
          700: "#1a6961",
          800: "#19544e",
          900: "#184642",
        },
        ember: {
          400: "#f0a36a",
          500: "#e8883f",
          600: "#d46d25",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Sora"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 18px 50px -24px rgba(26, 34, 40, 0.45)",
        soft: "0 10px 30px -18px rgba(26, 34, 40, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s ease-out both",
        "soft-pulse": "soft-pulse 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
