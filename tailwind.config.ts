import type { Config } from "tailwindcss";

// Primary brand color palette (same as CMS - Green)
const PRIMARY_COLOR = "#238b45";

// Generate color shades from primary color
const generateColorShades = (hex: string) => {
  // Convert hex to RGB
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  return {
    50: `rgb(${Math.round(r + (255 - r) * 0.95)} ${Math.round(g + (255 - g) * 0.95)} ${Math.round(b + (255 - b) * 0.95)} / 1)`,
    100: `rgb(${Math.round(r + (255 - r) * 0.9)} ${Math.round(g + (255 - g) * 0.9)} ${Math.round(b + (255 - b) * 0.9)} / 1)`,
    200: `rgb(${Math.round(r + (255 - r) * 0.8)} ${Math.round(g + (255 - g) * 0.8)} ${Math.round(b + (255 - b) * 0.8)} / 1)`,
    300: `rgb(${Math.round(r + (255 - r) * 0.6)} ${Math.round(g + (255 - g) * 0.6)} ${Math.round(b + (255 - b) * 0.6)} / 1)`,
    400: `rgb(${Math.round(r + (255 - r) * 0.3)} ${Math.round(g + (255 - g) * 0.3)} ${Math.round(b + (255 - b) * 0.3)} / 1)`,
    500: hex,
    600: `rgb(${Math.round(r * 0.9)} ${Math.round(g * 0.9)} ${Math.round(b * 0.9)} / 1)`,
    700: `rgb(${Math.round(r * 0.8)} ${Math.round(g * 0.8)} ${Math.round(b * 0.8)} / 1)`,
    800: `rgb(${Math.round(r * 0.7)} ${Math.round(g * 0.7)} ${Math.round(b * 0.7)} / 1)`,
    900: `rgb(${Math.round(r * 0.6)} ${Math.round(g * 0.6)} ${Math.round(b * 0.6)} / 1)`,
  };
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: generateColorShades(PRIMARY_COLOR),
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
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
export { PRIMARY_COLOR };
