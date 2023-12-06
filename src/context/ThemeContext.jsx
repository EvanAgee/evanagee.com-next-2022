import React, { useState, createContext } from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [pageTheme, setPageTheme] = useState("light");

  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  // Check it date is between 10/1 and 10/31
  const isHalloween = month === 9 && date.getDate() >= 1 && day <= 31;

  // Check if it's fall
  const isFall = !isHalloween && month >= 8 && month <= 11;

  // Check if it's between 12/1 and 12/25
  const isChristmas = month === 11 && day >= 1 && day <= 25;

  let currentTheme = isChristmas
    ? "christmas"
    : isHalloween
    ? "halloween"
    : isFall
    ? "fall"
    : "default";

  return (
    <ThemeContext.Provider
      value={{
        pageTheme,
        setPageTheme,
        currentTheme,
      }}
    >
      <div
        className={classNames(css`
          --color-primary: var(--color-primary-${currentTheme});
          --color-secondary: var(--color-secondary-${currentTheme});

          --color-primary-50: color-mix(
            in srgb,
            var(--color-primary),
            #fff 85%
          );
          --color-primary-100: color-mix(
            in srgb,
            var(--color-primary),
            #fff 70%
          );
          --color-primary-200: color-mix(
            in srgb,
            var(--color-primary),
            #fff 40%
          );
          --color-primary-300: color-mix(
            in srgb,
            var(--color-primary),
            #fff 16%
          );
          --color-primary-400: color-mix(
            in srgb,
            var(--color-primary),
            #fff 8%
          );
          --color-primary-500: var(--color-primary);
          --color-primary-600: color-mix(
            in srgb,
            var(--color-primary),
            #000 11%
          );
          --color-primary-700: color-mix(
            in srgb,
            var(--color-primary),
            #000 22%
          );
          --color-primary-800: color-mix(
            in srgb,
            var(--color-primary),
            #000 33%
          );
          --color-primary-900: color-mix(
            in srgb,
            var(--color-primary),
            #000 44%
          );

          --color-secondary-50: color-mix(
            in srgb,
            var(--color-secondary),
            #fff 80%
          );
          --color-secondary-100: color-mix(
            in srgb,
            var(--color-secondary),
            #fff 50%
          );
          --color-secondary-200: color-mix(
            in srgb,
            var(--color-secondary),
            #fff 40%
          );
          --color-secondary-300: color-mix(
            in srgb,
            var(--color-secondary),
            #fff 20%
          );
          --color-secondary-400: color-mix(
            in srgb,
            var(--color-secondary),
            #fff 10%
          );
          --color-secondary-500: var(--color-secondary);
          --color-secondary-600: color-mix(
            in srgb,
            var(--color-secondary),
            #000 11%
          );
          --color-secondary-700: color-mix(
            in srgb,
            var(--color-secondary),
            #000 22%
          );
          --color-secondary-800: color-mix(
            in srgb,
            var(--color-secondary),
            #000 33%
          );
          --color-secondary-900: color-mix(
            in srgb,
            var(--color-secondary),
            #000 44%
          );
        `)}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
