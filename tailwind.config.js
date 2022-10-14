const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const randomColors = Object.keys(colors).filter(
  (c) =>
    c === "amber" ||
    c === "blue" ||
    c === "green" ||
    c === "indigo" ||
    c === "orange" ||
    c === "pink" ||
    c === "purple" ||
    c === "red" ||
    c === "teal" ||
    c === "lime" ||
    c === "emerald" ||
    c === "cyan" ||
    c === "sky" ||
    c === "violet" ||
    c === "fuchsia" ||
    c === "rose" ||
    c === "yellow"
);
const rando = Math.floor(Math.random() * randomColors.length);
let primaryColor = colors[randomColors[rando]];

const colorThemes = {
  default: {
    primary: colors.rose,
    secondary: colors.cyan,
  },
  halloween: {
    primary: {
      DEFAULT: "#FF6C00",
      50: "#FFD6B8",
      100: "#FFCAA3",
      200: "#FFB37A",
      300: "#FF9B52",
      400: "#FF8429",
      500: "#FF6C00",
      600: "#C75400",
      700: "#8F3C00",
      800: "#572500",
      900: "#1F0D00",
    },
    secondary: {
      DEFAULT: "#9700F8",
      50: "#E0B1FF",
      100: "#D89CFF",
      200: "#C873FF",
      300: "#B84BFF",
      400: "#A822FF",
      500: "#9700F8",
      600: "#7500C0",
      700: "#530088",
      800: "#310050",
      900: "#0E0018",
    },
  },
  christmas: {
    primary: {
      DEFAULT: "#CC231E",
      50: "#F3B0AE",
      100: "#F19F9D",
      200: "#EB7C79",
      300: "#E65A56",
      400: "#E13732",
      500: "#CC231E",
      600: "#9B1B17",
      700: "#6A1210",
      800: "#390A08",
      900: "#080101",
    },
    secondary: {
      DEFAULT: "#0F8A5F",
      50: "#63EEBD",
      100: "#50ECB6",
      200: "#2BE8A6",
      300: "#17D492",
      400: "#13AF78",
      500: "#0F8A5F",
      600: "#09573C",
      700: "#042519",
      800: "#000000",
      900: "#000000",
    },
  },
};

module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
    "src/hooks/**/*.{js,ts,jsx,tsx}",
    "src/context/**/*.{js,ts,jsx,tsx}",
    "src/layouts/**/*.{js,ts,jsx,tsx}",
    "src/hooks/**/*.{js,ts,jsx,tsx}",
    "src/css/*.{css}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Merriweather", "Georgia", "serif"],
      display: ["Montserrat", '"Source Sans Pro"', "Helvetica", "sans-serif"],
    },
    extend: {
      colors: {
        gray: colors.neutral,
        ...colorThemes.halloween,
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
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
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
