import React from "react";
import helpers from "@/helpers";
import Link from "next/link";
import classNames from "classnames";
import WpApiContent from "@/components/WpApiContent";
import PostImage from "./shared/PostImage";

function PostMini({ data, showImage, side }) {
  const image = helpers.postImage(data, "thumbnail");
  const path =
    data.type === "post"
      ? "blog"
      : data.type === "photo"
      ? "photos"
      : "portfolio";

  return (
    <Link href={`/${path}/${data.slug}`}>
      <a className="flex items-stretch cursor-pointer dark:text-white dark:bg-gray-800 group">
        {showImage && image && (
          <img
            loading="lazy"
            src={image[0]}
            width={image[1]}
            height={image[2]}
            alt={data.title}
            className={classNames("h-full w-auto", {
              "order-1": side === "next",
            })}
          />
        )}
        <div
          className={classNames("flex-grow py-8 px-6 lg:text-left", {
            "lg:text-right": side === "next",
          })}
        >
          <time className="text-sm">{helpers.formatDate(data.date)}</time>
          <h3 className="up-title post-title my-0 group-hover:text-secondary-500 dark:group-hover:text-primary-500">
            <WpApiContent content={data.title.rendered} />
          </h3>
        </div>
      </a>
    </Link>
  );
}

export default PostMini;
