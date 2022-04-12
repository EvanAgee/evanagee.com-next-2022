import Button from "@/components/Button";
import Categories from "@/components/Blog/Meta/Categories";
import Link from "next/link";
import PostDate from "./shared/PostDate";
import PostImage from "./shared/PostImage";
import React from "react";
import WpApiContent from "@/components/WpApiContent";
import classNames from "classnames";
import { css } from "@emotion/css";

function PostSmall({ data, image, showImage, side }) {
  return (
    <Link href={`/blog/${data.slug}`}>
      <article className="text-center post group post--small">
        <header>
          <PostDate data={data} />
          <h3
            className={classNames(
              "up-title post-title dark:text-white mx-auto flex items-center justify-center matchHeight xl:max-w-sm lg:max-w-xs group-hover:text-secondary-500 cursor-pointer"
            )}
          >
            <WpApiContent content={data.title.rendered} />
          </h3>
        </header>

        {showImage && <PostImage data={data} image={image} />}
        <main className={classNames("mt-6 lg:mt-12 lg:mb-4 matchHeight")}>
          <div
            className={classNames(
              "text-base lg:text-lg mb-6 dark:text-gray-400",
              css`
                .link-more {
                  display: none;
                }
              `
            )}
          >
            <WpApiContent content={data.excerpt.rendered} />
          </div>

          {data.ea_categories && <Categories categories={data.ea_categories} />}
        </main>

        <footer className={classNames("flex justify-center pt-8")}>
          <Button href={`/blog/${data.slug}`} variant="secondary" hollow>
            READ MORE
          </Button>
        </footer>
      </article>
    </Link>
  );
}

export default PostSmall;
