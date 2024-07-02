import React, { useState, useContext, useEffect, useRef } from "react";
import classNames from "classnames";
import settings from "@/settings";
import Link from "next/link";
import { css } from "@emotion/css";
import { useRouter } from "next/router";
import useBreakpoints from "@/hooks/useBreakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderContext } from "@/context/HeaderContext";

export default function HeaderNav() {
  const location = useRouter();
  const navRef = useRef();
  const { currentPage } = useContext(HeaderContext);
  const { breakpoint, mediaQueries } = useBreakpoints();
  const [navVisible, setNavVisibile] = useState(true);

  // Center the active nav element
  useEffect(() => {
    if (!navRef || !navRef.current) return;
    const activeNav = navRef.current.querySelector(".active") || false;
    if (!activeNav || activeNav.offsetLeft < 60)
      return (navRef.current.scrollLeft = 0);
    const d = {
      navWidth: navRef.current.scrollWidth,
      activeLeft: activeNav.offsetLeft,
      activeWidth: activeNav.offsetWidth,
      percentage: activeNav.offsetLeft / navRef.current.scrollWidth,
    };
    return (navRef.current.scrollLeft =
      d.percentage * d.navWidth -
      window.outerWidth * 0.5 +
      d.activeWidth * 0.5);
  }, [location]);

  return (
    <nav
      className={classNames(
        "backdrop-filter relative backdrop-blur-md bg-gray-400 bg-opacity-20 text-white border-t border-r dark:border-t-0 dark:border-r-0 border-gray-500  border-opacity-10 select-none flex items-center overflow-hidden whitespace-nowrap h-[50px] lg:h-[70px]"
      )}
    >
      <div className="px-4 lg:hidden lg:px-8 text-2xl order-1">
        <button onClick={() => setNavVisibile(!navVisible)}>
          <FontAwesomeIcon icon={["fal", "bars"]} />
        </button>
      </div>

      {
        <>
          <ul
            data-test-id="navigation"
            ref={navRef}
            className={classNames(
              "h-full flex flex-1 w-full items-center justify-start font-display font-black uppercase tracking-widest text-sm overflow-hidden transition order-0 lg:order-1",
              {
                "overflow-x-auto transform translate-y-0": navVisible,
                "overflow-x-auto transform translate-y-full": !navVisible,
              }
            )}
          >
            <li className={classNames("flex min-h-full")}>
              <Link href="/search" title="Search">
                <a
                  className={classNames(
                    "flex items-center min-h-full px-4 lg:px-8 text-xl hover:text-primary-500",
                    {
                      "text-gray-800 bg-white dark:bg-gray-900 dark:text-white active":
                        location.pathname === "/search",
                    }
                  )}
                >
                  <FontAwesomeIcon icon={["far", "search"]} />
                </a>
              </Link>
            </li>
            {settings.pathData
              .filter((p) => !p.disabledInNav)
              .map((p, i) => (
                <li
                  key={`navlink-${i}`}
                  className={classNames("flex min-h-full")}
                >
                  <Link href={p?.path}>
                    <a
                      className={classNames(
                        "flex items-center min-h-full px-4 lg:px-4 xl:px-8 hover:text-primary-500",
                        {
                          "text-gray-800 bg-white dark:bg-gray-900 dark:text-white active hover:text-gray-800":
                            currentPage?.path === p?.path ||
                            currentPage?.parentLink === p?.path,
                        }
                      )}
                    >
                      {p.linkText}
                    </a>
                  </Link>
                </li>
              ))}
            <li className="lg:ml-auto">
              <a
                href="https://twitter.com/EvanAgee"
                target="_blank"
                className="flex items-center min-h-full px-4"
                title="My Twitter Profile"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  size={breakpoint.isXlUp || breakpoint.isMdDown ? "2x" : "1x"}
                  icon={["fab", "twitter"]}
                />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/EvanAgee"
                target="_blank"
                className="flex items-center min-h-full px-4"
                title="My Github Profile"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  size={breakpoint.isXlUp || breakpoint.isMdDown ? "2x" : "1x"}
                  icon={["fab", "github"]}
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/evanagee/"
                target="_blank"
                className="flex items-center min-h-full px-4"
                title="My LinkedIn Profile"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  size={breakpoint.isXlUp || breakpoint.isMdDown ? "2x" : "1x"}
                  icon={["fab", "linkedin"]}
                />
              </a>
            </li>
            <li>
              <a
                href="https://letterboxd.com/evanagee/"
                target="_blank"
                className="flex items-center min-h-full px-4"
                title="Follow me on Letterboxd"
                rel="noreferrer"
              >
                <img
                  alt="Follow me on Letterboxd"
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE}/static/letterboxd-mac-icon.png`}
                  width="24"
                  height="24"
                  className="filter invert grayscale contrast-200 h-auto"
                  style={{
                    width:
                      breakpoint.isXlUp || breakpoint.isMdDown
                        ? "32px"
                        : "16px",
                    minWidth:
                      breakpoint.isXlUp || breakpoint.isMdDown
                        ? "32px"
                        : "16px",
                  }}
                />
              </a>
            </li>
          </ul>
          {breakpoint.isMdDown && navVisible && (
            <div
              className={classNames(
                "pointer-events-none absolute top-0 z-index-2 bg-gradient-to-l from-black opacity-30 h-full w-[50px] right-[53px]"
              )}
            ></div>
          )}
        </>
      }
    </nav>
  );
}
