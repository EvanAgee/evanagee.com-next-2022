import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import helpers from "@/helpers";

function PostDate({ data, size }) {
  return (
    <time
      className={classNames(
        "relative block text-gray-400 my-2",
        {
          "text-lg": size === "lg",
          "text-sm": size === "sm",
        },
        css`
          &:before,
          &:after {
            position: absolute;
            content: unset;
            top: 50%;
            border-top: 1px solid var(--color-gray-300);
            width: calc(50% - 100px);
            height: 1px;
            left: 0;
          }

          &:after {
            left: auto;
            right: 0;
          }
        `
      )}
    >
      {helpers.formatDate(data.date)}
    </time>
  );
}

PostDate.defaultProps = {
  size: "sm",
};

export default PostDate;
