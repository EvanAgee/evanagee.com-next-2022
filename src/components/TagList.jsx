import React from "react";
import classNames from "classnames";
import helpers from "@/helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function TagList({
  items,
  className,
  label,
  showActive,
  resetPath,
  "data-test-id": dataTestId,
}) {
  const location = useRouter();
  const isCurrentLink = function (t) {
    return resetPath && t.link === location.pathname && showActive;
  };
  return (
    <ul
      data-test-id={dataTestId}
      className={classNames(
        "text-sm text-gray-500 dark:text-gray-200 font-display flex flex-wrap justify font-semibold list-none leading-none items-center gap-2",
        className
      )}
    >
      {label && (
        <div className="up-title up-title-sm leading-none m-0 text-black dark:text-gray-300">
          {label}
        </div>
      )}
      {items.map((t, i) => (
        <li className={classNames("leading-none  list-none")} key={i}>
          <Link href={isCurrentLink(t) ? resetPath : t.link}>
            <a className="text-primary-500 bg-primary-100 dark:bg-primary-700 dark:text-primary-100 px-2 py-1 block leading-none rounded-md flex items-center">
              {helpers.decodeHtml(t.name)}
              {isCurrentLink(t) && (
                <FontAwesomeIcon className="ml-2" icon={["fal", "times"]} />
              )}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

TagList.DefaultProps = {
  label: false,
  showActive: false,
  resetPath: false,
};

export default React.memo(TagList);
