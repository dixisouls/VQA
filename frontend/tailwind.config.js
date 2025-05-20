/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary brand color - deep vibrant blue with teals/purples
        brand: {
          50: "#eafbff",
          100: "#d6f7ff",
          200: "#adebff",
          300: "#80dbff",
          400: "#40b9ff",
          500: "#2093ff",
          600: "#006fff",
          700: "#0055db",
          800: "#0045ad",
          900: "#003c8c",
        },
        // Secondary color - vibrant purple
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        // Tertiary color - coral/pink
        tertiary: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
        // Neutral colors - cool grays
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        display: ["Clash Display", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 15px 2px rgba(56, 189, 248, 0.3)",
        "glow-lg": "0 0 25px 5px rgba(56, 189, 248, 0.4)",
        "inner-glow": "inset 0 0 15px 2px rgba(56, 189, 248, 0.2)",
        neon: "0 0 5px theme(colors.brand.400), 0 0 20px theme(colors.brand.600)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.85 },
        },
        "gradient-animation": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "ping-slow": {
          "75%, 100%": {
            transform: "scale(1.5)",
            opacity: "0",
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        gradient: "gradient-animation 10s ease infinite",
        shimmer: "shimmer 2.5s infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dot-pattern":
          "radial-gradient(rgba(100, 116, 139, 0.1) 1px, transparent 0)",
        "mesh-pattern":
          "linear-gradient(45deg, rgba(56, 189, 248, 0.07) 25%, transparent 25%, transparent 50%, rgba(56, 189, 248, 0.07) 50%, rgba(56, 189, 248, 0.07) 75%, transparent 75%, transparent)",
      },
      backgroundSize: {
        "dot-pattern": "20px 20px",
        "mesh-pattern": "25px 25px",
      },
      transitionDuration: {
        1500: "1500ms",
        2000: "2000ms",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.surface.700"),
            a: {
              color: theme("colors.brand.600"),
              "&:hover": {
                color: theme("colors.brand.800"),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.surface.300"),
            a: {
              color: theme("colors.brand.400"),
              "&:hover": {
                color: theme("colors.brand.300"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
