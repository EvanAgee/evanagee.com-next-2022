import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import helpers from "@/helpers";
import Link from "next/link";
import WpApiContent from "@/components/WpApiContent";
import Categories from "@/components/Blog/Meta/Categories";
import Button from "@/components/Button";
import PostDate from "./shared/PostDate";
import PostImage from "./shared/PostImage";

function PostLarge({ data, image, showImage, side }) {
  return (
    <Link href={`/blog/${data.slug}`}>
      <article
        className={classNames(
          `text-center post group post--large p-6 lg:p-16 pb-0 cursor-pointer`
        )}
      >
        <header>
          <PostDate data={data} size="lg" />
          <h3
            className={classNames(
              "up-title post-title mx-auto flex items-center justify-center matchHeight up-title-lg max-w-screen-lg lg:my-12"
            )}
          >
            <WpApiContent content={data.title.rendered} />
          </h3>
        </header>

        {data.ea_categories && (
          <div className="my-6">
            <Categories categories={data.ea_categories} />
          </div>
        )}
        <div
          className={classNames(
            "mb-6",
            css`
              .link-more {
                display: none;
              }
            `
          )}
        >
          <WpApiContent content={data.excerpt.rendered} />
        </div>

        {showImage && <PostImage data={data} image={image} />}

        <div className={classNames("flex justify-center pt-8 mt-16")}>
          <Button href={`/blog/${data.slug}`} variant="primary" hollow>
            READ MORE
          </Button>
        </div>
      </article>
    </Link>
  );
}

export default PostLarge;
