const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const randomColors = Object.keys(colors).filter(
  (c) =>
    c !== "black" &&
    c !== "white" &&
    c !== "gray" &&
    c !== "coolGray" &&
    c !== "neutral" &&
    c !== "blueGray" &&
    c !== "warmGray"
);
const primaryColor =
  colors[randomColors[Math.floor(Math.random() * randomColors.length)]];

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./css/*.{css}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Merriweather", "Georgia", "serif"],
      display: ["Montserrat", '"Source Sans Pro"', "Helvetica", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          100: "#FFEDED",
          200: "#FED3D3",
          300: "#FEB9B9",
          400: "#FD8484",
          500: "#FC4F4F",
          600: "#E34747",
          700: "#972F2F",
          800: "#712424",
          900: "#4C1818",
        },
        primary: colors.cyan,
        secondary: colors.neutral,
      },
      typography: {
        xl: {
          css: {
            h3: {
              fontSize: "1.5rem",
            },
            h4: {
              fontSize: "2rem",
              // color: colors.neutral["700"],
            },
            figure: {
              // marginTop: 0
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["last", "dark"],
      opacity: ["disabled"],
      pointerEvents: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-css-variables")(
      {
        // modules
      },
      {
        // options
      }
    ),
  ],
};
