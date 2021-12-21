import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { HeaderContext } from "@/context/HeaderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Breadcrumbs({ className }) {
  const { breadcrumb } = React.useContext(HeaderContext);

  if (!breadcrumb || breadcrumb.length < 2) return null;

  return (
    <nav
      className={classNames("flex mb-4 font-display", className)}
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="flex items-center justify-center lg:justify-start space-x-2 lg:space-x-4 p-0 text-sm font-medium text-gray-400 dark:text-gray-600 w-full"
      >
        <li>
          <div>
            <Link href="/">
              <a className="text-inherit hover:text-gray-200">
                <FontAwesomeIcon icon={["fas", "home"]} />
              </a>
            </Link>
          </div>
        </li>
        {breadcrumb
          .filter((b) => b.title)
          .map((page, i) => (
            <li key={i} className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-inherit"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              {/* <svg
                className="flex-shrink-0 w-4 h-full text-gray-900"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg> */}
              <span className="ml-2 lg:ml-4">
                {i + 1 < breadcrumb.length ? (
                  <Link
                    href={page.parentLink}
                    className="text-inherit"
                    aria-current={page.current ? "page" : undefined}
                  >
                    {page.title}
                  </Link>
                ) : (
                  page.title
                )}
              </span>
            </li>
          ))}
      </ol>
    </nav>
  );
}
export default React.memo(Breadcrumbs);
