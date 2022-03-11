import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import helpers from "@/helpers";
import Link from "next/link";
import WpApiContent from "@/components/WpApiContent";
import PostDate from "./shared/PostDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostImage from "./shared/PostImage";

function PostTeaser({ data, image, showImage, side }) {
  return (
    <Link href={`/blog/${data.slug}`}>
      <article
        className={classNames(
          `text-center post group post--teaser cursor-pointer`
        )}
      >
        <header>
          <PostDate data={data} />
          <h3
            className={classNames(
              "up-title post-title mx-auto flex items-center justify-center matchHeight xl:max-w-sm lg:max-w-xs group-hover:text-secondary-500"
            )}
          >
            <WpApiContent content={data.title.rendered} />
          </h3>
        </header>

        {showImage && <PostImage data={data} image={image} />}
      </article>
    </Link>
  );
}

export default PostTeaser;
