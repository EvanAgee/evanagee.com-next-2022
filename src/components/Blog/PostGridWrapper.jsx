import React from "react";
import { css } from "@emotion/css";
import classNames from "classnames";

function PostGrid({ children, counter, largeFirst, className }) {
  const offsetCounter = largeFirst ? 2 : 1;

  return (
    <div
      className={classNames(
        "p-6 -mt-[1px]",
        {
          "lg:col-span-2 xl:p-32 xl:pt-8": counter === 0 && largeFirst,
          "": counter % offsetCounter === 0,
          "xl:p-16": !className,
          "-ml-[1px]": counter > 0 && counter % offsetCounter === 0
        },
        className
      )}
    >
      {children}
    </div>
  );
}

PostGrid.defaultProps = {
  largeFirst: true,
  className: false,
};

export default React.memo(PostGrid);
