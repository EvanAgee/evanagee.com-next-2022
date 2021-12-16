import React, { useState, createContext } from "react";
import settings from "@/settings";
import helpers from "@/helpers";
import { useRouter } from "next/router";
// import { useRouteMatch, useLocation } from "react-router-dom";
export const HeaderContext = createContext();

const ogDefaults = {
  og_image:
    "https://res.cloudinary.com/evanagee/image/upload/v1551277282/evanagee.com/bg-2018-code.jpg",
  og_description: false,
  og_locale: "en_US",
  og_type: "article",
};

export const HeaderProvider = ({ children }) => {
  const location = useRouter();
  const [pageTitle, setPageTitle] = useState(false);
  const [ogData, setOgData] = useState(ogDefaults);
  const [breadcrumb, setBreadcrumb] = useState(false);
  const [pageTheme, setPageTheme] = useState("light");

  const currentPage =
    location.pathname === "/"
      ? settings.pathData[0]
      : settings.pathData
          .filter((p) => p.path !== "/")
          .find((p) => p.path === location.pathname);

  const metaData = React.useMemo(() => {
    if (!currentPage) return false;
    return {
      title: pageTitle
        ? `${pageTitle} - ${currentPage.title}`
        : currentPage.title,
    };
  }, [location, pageTitle, currentPage]);

  const buildBreadcrumb = (currentLocation) => {
    return currentLocation.map((c) => bc.push(c));
  };

  React.useEffect(() => {
    setPageTitle(false);
    setOgData(ogDefaults);
  }, [location, children]);

  React.useEffect(() => {
    if (!currentPage) return;
    const bc = [currentPage];
    if (
      currentPage?.path !== location.pathname &&
      currentPage?.title !== pageTitle
    ) {
      bc.push({
        ...location,
        title: pageTitle,
      });
    }
    setBreadcrumb(bc);
  }, [currentPage, location, pageTitle]);

  return (
    <HeaderContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        setOgData,
        ogData,
        breadcrumb,
        setBreadcrumb,
        buildBreadcrumb,
        pageTheme,
        setPageTheme,
        metaData,
        currentPage,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

