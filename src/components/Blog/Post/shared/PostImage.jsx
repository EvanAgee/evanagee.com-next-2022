import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import Link from "next/link";
import Image from "next/image";
import helpers from "@/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostImage({ data, image, hoverable }) {
  const boxClasses = React.useMemo(() => {
    return `inset-0 absolute object-cover w-full h-full object-center rounded-2xl shadow-lg ${
      hoverable
        ? "group-hover:ring-secondary-500 group-hover:ring-offset-4 ring-offset-inherit dark:ring-offset-gray-800 group-hover:ring-4 cursor-pointer"
        : ""
    }`;
  }, [image, hoverable]);
  const hoverClasses =
    "group-hover:ring-secondary-500 group-hover:ring-offset-4 group-hover:ring-4 cursor-pointer";
  return (
    <div className={classNames("bg-no-repeat bg-center relative aspect-video")}>
      {image ? (
        <img
          alt={helpers.decodeHtml(data.title.rendered)}
          loading="lazy"
          src={image[0]}
          width={image[1]}
          height={image[2]}
          className={classNames(`${boxClasses} max-w-full absolute`)}
        />
      ) : (
        <div
          className={classNames(
            `${boxClasses} bg-gray-200 flex items-center justify-center text-gray-300`
          )}
        >
          <FontAwesomeIcon size="2x" icon={["fal", "images"]} />
        </div>
      )}
    </div>
  );
}

PostImage.defaultProps = {
  image: false,
  data: {},
  hoverable: true,
};

export default PostImage;
