import React, { useState, useContext, useEffect, useRef } from "react";
import { css } from "@emotion/css";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import settings from "@/settings";
import useBreakpoints from "@/hooks/useBreakpoints";
import { HeaderContext } from "@/context/HeaderContext";
import { ThemeContext } from "@/context/ThemeContext";
import CurrentLocation from "@/components/CurrentLocation";
import Photo from "@/components/Photo";
import HeaderHome from "@/components/Header/HeaderHome";
import HeaderInterior from "@/components/Header/HeaderInterior";
import HeaderNav from "@/components/Header/HeaderNav";

export default function Header() {
  const location = useRouter();
  const headerWrapper = useRef();

  const { metaData, ogData, currentPage } = useContext(HeaderContext);
  const { setPageTheme, pageTheme } = useContext(ThemeContext);
  const { breakpoint, mediaQueries } = useBreakpoints();
  const [headerHeight, setHeaderHeight] = useState(150);

  // Google Analytics Tracking
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !process.browser) return;

    TagManager.dataLayer({
      gtmId: settings.gtmID,
      dataLayerName: "PageDataLayer",
      dataLayer: {
        ...location,
      },
    });

    ReactGA.send("pageview");
  }, [location]);

  useEffect(() => {
    if (currentPage && "theme" in currentPage)
      return setPageTheme(currentPage.theme);
    return setPageTheme("light");
  }, [currentPage]);

  React.useEffect(() => {
    if (!headerWrapper?.current) return;
    if (headerHeight === headerWrapper.current.scrollHeight) return;
    return setHeaderHeight(headerWrapper.current.scrollHeight);
  }, [location, headerWrapper, currentPage, breakpoint]);

  if (!location || !breakpoint || !mediaQueries) return null;

  return (
    <>
      <Head>
        <meta
          property="og:type"
          content={ogData.og_type ? ogData.og_type : "website"}
        />
        <meta
          property="og:description"
          content={
            ogData.og_description
              ? ogData.og_description
              : "I’m a web application developer who specializes in WordPress and JavaScript development."
          }
        />
        <meta
          property="description"
          content={
            ogData.og_description
              ? ogData.og_description
              : "I’m a web application developer who specializes in WordPress and JavaScript development."
          }
        />
        <meta
          property="og:locale"
          content={ogData.og_locale ? ogData.og_locale : "en_US"}
        />
        <meta
          property="og:image"
          content={
            ogData.og_image
              ? ogData.og_image[0].url
              : "https://res.cloudinary.com/evanagee/image/upload/v1551277282/evanagee.com/bg-2018-code.jpg"
          }
        />
        <link
          rel="canonical"
          href={`https://evanagee.com${location.asPath}`}
        />
        <title>
          {ogData.title ? ogData.title : metaData?.title + " - Evan Agee"}
        </title>
      </Head>
      <div
        className={classNames("fixed inset-0 bg-gray-900 z-0", {
          dark: pageTheme === "dark",
        })}
      >
        <AnimatePresence>
          <motion.img
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            exit={{
              opacity: 0,
            }}
            src="https://res.cloudinary.com/evanagee/image/upload/v1551277282/evanagee.com/bg-2018-code.jpg"
            loading="lazy"
            className="object-cover object-center w-screen h-screen absolute inset-0 max-w-none transition-opacity"
          />
        </AnimatePresence>

        <div className="scrim absolute inset-0 bg-gray-800 opacity-80"></div>
      </div>

      <div
        className={
          ("overflow-hidden",
          css`
            transition: all 1s ease;
            will-change: height, max-height, min-height;
            height: ${headerHeight}px;
            max-height: ${headerHeight}px;
            min-height: ${headerHeight}px;

            ${mediaQueries.lg} {
              height: ${headerHeight}px;
              max-height: ${headerHeight}px;
              min-height: ${headerHeight}px;
            }
          `)
        }
      >
        <div ref={headerWrapper}>
          {location.pathname === '/' ? <HeaderHome /> : <HeaderInterior />}
        </div>
      </div>

      <HeaderNav />
    </>
  );
}
