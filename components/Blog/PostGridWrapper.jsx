import React from "react";
import { css } from "@emotion/css";
import classNames from "classnames";

function PostGrid({ children, counter, largeFirst, className }) {
  const offsetCounter = largeFirst ? 2 : 1;

  return (
    <div
      className={classNames(
        "p-6",
        {
          "lg:col-span-2 xl:p-32 xl:pt-8": counter === 0 && largeFirst,
          "": counter % offsetCounter === 0,
          "xl:p-16": !className,
        },
        css`
          margin-left: ${counter > 0 && counter % offsetCounter === 0
            ? "-1px"
            : 0};
          margin-top: -1px;
        `,
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
