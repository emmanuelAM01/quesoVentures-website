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
          "linear-gradient(to bottom, rgba(239,241,244,0.97), rgba(228,232,237,0.92))",
        headerDark:
          "linear-gradient(to bottom, rgba(15,18,24,0.92), rgba(11,13,18,0.92))",
      },

      colors: {
        // ── The showroom ──────────────────────────────────────────────────
        // The same ground the portal moved to, so a lead who fills in the form
        // here and opens their report there lands somewhere they recognise.
        //
        // The old canvas was #FFF8EC cream, with cream borders and a cream
        // band. Warm is not the problem; only warm is. With no cool note
        // anywhere the red had nothing to push against and the page read
        // like stationery. The floor goes cool and the ink goes navy, and the
        // warmth comes back as paint: the livery colours are now the only
        // warm things on the page. Full reasoning: queso-portal,
        // apps/portal/tailwind.config.js.
        lightBG: "#EFF1F4",
        darkBG: "#0B0D12",

        // text
        // Blu Tour de France taken most of the way down: 15.4:1 on the ground.
        lightText: "#0F1A2A",
        // The one place this departs from the portal. The portal made muted
        // text full strength; this site builds its hierarchy on light,
        // secondary copy, so it keeps a tier, in cool slate. 6.7:1.
        lightTextMuted: "#4B5565",
        darkText: "#F5F7FA",
        darkTextMuted: "#B7C0C8",

        // accents (used for underlines, small highlights)
        lightAccent: "#C4161C",
        darkAccent: "#FFD100",

        // borders
        lightBorder: "#D3DAE3",
        darkBorder: "#1F2933",

        // primary button (yellow)
        darkButton: "#FFD100",
        darkButtonHover: "#E6BE00",

        lightButton: "#C4161C",
        // Actually darker than the button now, as in the portal.
        lightButtonHover: "#A81218",

        panelLight: "#FFFFFF",
        panelDark: "#0F1218",

        // Alternating section band, a real step down from the ground so the
        // page bands instead of running flat.
        bandLight: "#E4E8ED",
        bandDark: "#141821",

        // Full-contrast section, used once or twice per page as punctuation.
        inkLight: "#101216",
        inkDark: "#101216",

        // Factory paint. Full palette and usage rules in components/livery.ts.
        rossoCorsa: "#D40000",
        rossoScuderia: "#FF2800",
        gialloOrion: "#FEA700",
        gialloModena: "#FCE903",
        arancioXanto: "#E64A37",
        verdeMantis: "#7DC23B",
        bluLeMans: "#0690FF",
        violaPasifae: "#6B0686",
        grigioTelesto: "#7692A5",

        panelTintLight: "rgba(255,255,255,0.80)",
        panelTintDark: "rgba(255,255,255,0.06)",

        ringLight: "rgba(15,26,42,0.12)",
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
