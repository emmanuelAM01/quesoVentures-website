/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        headerLight:
          "linear-gradient(to bottom, rgba(255,248,236,0.95), rgba(255,244,226,0.85))",
        headerDark:
          "linear-gradient(to bottom, rgba(15,18,24,0.92), rgba(11,13,18,0.92))",
      },

      colors: {
        // backgrounds
        lightBG: "#FFF8EC",
        darkBG: "#0B0D12",

        // text
        lightText: "#1A1A1A",
        lightTextMuted: "#555555",
        darkText: "#F5F7FA",
        darkTextMuted: "#B7C0C8",

        // accents (used for underlines, small highlights)
        lightAccent: "#C4161C",
        darkAccent: "#FFD100",

        // borders
        lightBorder: "#EADFC4",
        darkBorder: "#1F2933",

        // primary button (yellow)
        darkButton: "#FFD100",
        darkButtonHover: "#E6BE00",

        lightButton: "#C4161C",
        lightButtonHover: "#C4161C",

        panelLight: "#FFFFFF",
        panelDark: "#0F1218",

        panelTintLight: "rgba(255,255,255,0.70)",
        panelTintDark: "rgba(255,255,255,0.06)",

        ringLight: "rgba(26,26,26,0.08)",
        ringDark: "rgba(245,247,250,0.08)",


      },

      fontFamily: {
        sans: [
          "Inter Tight",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },

      keyframes: {
        slideInRight: {
          from: { opacity: "0", transform: "translateX(2rem)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-2rem)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInUp: {
          from: { opacity: "0", transform: "translateY(1rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.5s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        slideInLeft: "slideInLeft 0.5s ease-out",
        slideInUp: "slideInUp 0.4s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
