import React from "react";
import content from "@/content";
import classNames from "classnames";

function Skillz({ className }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {content.skills.map((s, i) => (
        <li className={classNames(className)} key={`skill-${i}`}>
          {s}
        </li>
      ))}
    </ul>
  );
}

Skillz.defaultProps = {
  className: "text-primary-500 bg-primary-100 dark:bg-primary-700 dark:text-primary-100 inline-block py-1 px-2 rounded-md",
};

export default React.memo(Skillz);
