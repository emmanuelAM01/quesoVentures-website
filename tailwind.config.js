/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Mode - Sophisticated Cheese Board
        "lightBG": "#fdfbf7",        // Cream - soft off-white, like fresh mozzarella
        "lightSurface": "#f5f0e8",   // Aged white cheddar
        "lightAccent": "#d4a574",    // Aged gouda - warm, premium
        "lightAccentHover": "#c4956a", // Darker gouda
        "lightText": "#2d2013",      // Dark chocolate/cocoa - pairs with cheese
        "lightTextMuted": "#6b5d4f", // Milk chocolate

        // Dark Mode - Midnight Cheese Cave
        "darkBG": "#1a1612",         // Dark cave/cellar
        "darkSurface": "#252018",    // Aged cave wall
        "darkAccent": "#e8a864",     // Aged sharp cheddar - pops on dark
        "darkAccentHover": "#f4bc7a", // Lighter sharp cheddar
        "darkText": "#f5f0e8",       // Cream
        "darkTextMuted": "#b8ad9f",  // Faded cream

        // Semantic colors (optional, for CTAs and accents)
        "primary": {
          light: "#d4a574",
          dark: "#e8a864",
        },
        "secondary": {
          light: "#8b7355",  // Whole grain cracker - complements cheese
          dark: "#9d8669",
        },
        "success": {
          light: "#7a9b5f",  // Fresh basil - goes with cheese
          dark: "#8fad70",
        },
        "warning": {
          light: "#d4a574",  // Your main accent works here
          dark: "#e8a864",
        }
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
          from: {
            opacity: '0',
            transform: 'translateX(2rem)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-2rem)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(1rem)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        slideInRight: 'slideInRight 0.5s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInUp: 'slideInUp 0.4s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};