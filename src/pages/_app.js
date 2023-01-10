import React from "react";
import "@/css/index.css";
import "@/icons.js";
import settings from "@/settings";
import { ThemeProvider } from "@/context/ThemeContext";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import LogRocket from "logrocket";
import App from "@/layouts/App";
import NextNProgress from 'nextjs-progressbar';
const colors = require("tailwindcss/colors");

const tagManagerArgs = {
  gtmId: settings.gtmID,
};

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      TagManager.initialize(tagManagerArgs);
      ReactGA.initialize(settings.googleAnalyticsID);
      LogRocket.init("6kdr3y/evanageecom");
    }
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider>
        <App>
          <NextNProgress color={colors.rose['500']} />
          <Component {...pageProps} />
        </App>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;
