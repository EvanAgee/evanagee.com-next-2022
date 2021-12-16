import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/css";
import classNames from "classnames";
import helpers from "@/helpers";

const SidebarRow = ({ cigar }) => {
  const image = helpers.postImage(cigar, "thumbnail") || false;

  return (
    <li className="">
      <NavLink
        activeClassName="active bg-primary-600 hover:bg-primary-600"
        to={cigar.link.replace("https://blog.evanagee.com/cigar", "/cigars")}
        className={classNames(
          "relative px-6 py-5 flex items-center space-x-3 hover:bg-primary-600 focus:outline-none",
          css`
            &.active,
            &:hover {
              .rating {
                color: var(--color-white) !important;
              }

              .brand {
                color: ;
              }
            }
          `
        )}
      >
        <div className="flex-shrink-0">
          {image && (
            <img
              alt={helpers.decodeHtml(cigar.title.rendered)}
              src={image[0]}
              className="h-16 w-16 rounded-full"
            />
          )}
        </div>
        <div className="flex-1 min-w-0 flex items-center">
          {/* <!-- Extend touch target to entire panel --> */}
          <span className="absolute inset-0" aria-hidden="true"></span>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-200 text-lg font-display">
              {cigar.title.rendered}
            </div>
            {"brand" in cigar.acf && cigar.acf.brand && (
              <div className="text-sm text-gray-200 truncate brand">
                {cigar.acf.brand[0].name}
              </div>
            )}
          </div>
          <div className="rating text-2xl text-gray-200 dark:text-gray-600 font-display">
            {cigar.acf.rating}
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default SidebarRow;
