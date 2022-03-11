import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { HeaderContext } from "@/context/HeaderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

function Breadcrumbs({ className, title }) {
  const { breadcrumb } = React.useContext(HeaderContext);
  const router = useRouter();

  if (!breadcrumb) return null;

  return (
    <nav
      className={classNames("flex mb-4 font-display", className)}
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="flex items-center justify-center lg:justify-start space-x-2 lg:space-x-4 p-0 text-sm font-medium text-gray-400 dark:text-gray-500 w-full"
      >
        <li>
          <div>
            <Link href="/">
              <a className="text-inherit hover:text-primary-500">
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
              <span className="ml-2 lg:ml-4">
                {page.parentLink ? (
                  <Link
                    href={page.parentLink}
                    aria-current={page.current ? "page" : undefined}
                  >
                    <a className="text-inherit hover:text-primary-500">
                      {page.title}
                    </a>
                  </Link>
                ) : (
                  page.title
                )}
              </span>
            </li>
          ))}
        {title && (
          <li className="flex items-center">
            <svg
              className="flex-shrink-0 h-5 w-5 text-inherit"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <span className="ml-2 lg:ml-4">{title}</span>
          </li>
        )}
      </ol>
    </nav>
  );
}
export default React.memo(Breadcrumbs);
