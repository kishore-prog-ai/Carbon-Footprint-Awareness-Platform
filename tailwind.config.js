/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        earth: {
          950: "#0A0807",
          900: "#14100E",
          850: "#1C1715",
          800: "#29221F",
          700: "#3D322E",
          500: "#6E5A53",
        },
        clay: {
          400: "#F09A78",
          500: "#E38562",
          600: "#BD5B38",
          700: "#A64B2A",
        },
      },
      fontFamily: {
        display: ["'Spectral'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        copper: "0 0 24px rgba(227, 133, 98, 0.35)",
      },
    },
  },
  plugins: [],
};
