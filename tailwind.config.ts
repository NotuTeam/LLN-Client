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
        // Neo-Brutalism Dark Mode Theme
        dark: {
          50: "#2a2a2a",
          100: "#252525",
          200: "#1e1e1e",
          300: "#181818",
          400: "#121212",
          500: "#0f0f0f",
          600: "#0a0a0a",
          700: "#080808",
          800: "#050505",
          900: "#030303",
        },
        accent: {
          DEFAULT: "#DFFF37",
          light: "#ECFF6E",
          dark: "#C4EB00",
        },
        cyan: {
          DEFAULT: "#5EEAD4",
          light: "#86F0E1",
          dark: "#2DD4BF",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
      },
      borderRadius: {
        "4xl": "32px",
        "3xl": "24px",
        "2xl": "16px",
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "bounce-soft": "bounceSoft 0.5s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(223, 255, 55, 0.3)",
        "glow-lg": "0 0 40px rgba(223, 255, 55, 0.4)",
        card: "0 4px 20px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
