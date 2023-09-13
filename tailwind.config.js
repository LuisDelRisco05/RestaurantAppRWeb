import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      Poppins: "Poppins"
    },
    extend: {},
    animation: {
      slide: "slide 25s linear infinite"
    },
    keyframes: {
      slide: {
        "0%, 100%": {transform: "translateX(5%)"},
        "50%": {transform: "translateX(-120%)"}
      }
    },
    screens: {
      "sm": "640px",
      // => @media (min-width: 640px) { ... }

      "md": "768px",
      // => @media (min-width: 768px) { ... }

      "lg": "1024px",
      // => @media (min-width: 1024px) { ... }

      "xl": "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    }
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#14b8a6",
            foreground: "#fff",        
          },
          secondary: {
            DEFAULT: "#84cc16",
            foreground: "#fff", 
          }
        },
      },
    },
  })],
}

