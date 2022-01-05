import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import Link from "next/link";
import WpApiContent from "@/components/WpApiContent";
import Categories from "@/components/Blog/Meta/Categories";
import Button from "@/components/Button";
import TagList from "@/components/TagList";
import useBreakpoints from "@/hooks/useBreakpoints";
import PostMap from "@/components/Blog/PostMap";
import PostDate from "./shared/PostDate";
import PostImage from "./shared/PostImage";

export default function PostFull({ data, image, showImage, side }) {
  const { mediaQueries } = useBreakpoints();

  const hasLocation = React.useMemo(() => {
    return data["x_metadata"].geo_longitude && data["x_metadata"].geo_latitude;
  }, [data]);

  return (
    <article
      className={classNames(`text-center post group post--large p-6 lg:p-16`)}
    >
      <header>
        <PostDate data={data} size="lg" />
        <h3 className="up-title post-title mx-auto flex items-center justify-center matchHeight up-title-lg max-w-screen-lg lg:my-12">
          <WpApiContent content={data.title.rendered} />
        </h3>

        {data.ea_categories && (
          <div className="my-6">
            <Categories categories={data.ea_categories} />
          </div>
        )}
      </header>

      {showImage && <PostImage data={data} image={image} hoverable={false} />}

      <main className="mt-6 lg:mt-12 lg:mb-4">
        <div
          className={classNames(
            "text-left lg:leading-loose prose lg:prose-xl lg:mx-auto max-w-none",
            css`
              h2,
              h3,
              h4 {
                position: relative;
                display: inline-block;

                &:before {
                  position: absolute;
                  top: 100%;
                  left: 0;
                  width: 50%;
                  content: "";
                  border-bottom: 5px solid var(--color-primary-500);
                }
              }

              .wp-block-image {
                margin-bottom: 1.25rem;

                figcaption {
                  font-style: italic;
                  background: rgba(0, 0, 0, 0.5);
                  color: var(--color-white);
                  position: relative;
                  transform: translateY(-100%);
                  text-align: center;
                  padding: 0.5rem 0;
                  border-bottom: 1px solid var(--color-secondary-300);
                  margin-top: 0;
                }

                .alignleft {
                  ${mediaQueries.md} {
                    float: left;
                    margin-right: var(--p-6);
                  }

                  ${mediaQueries.lg} {
                    margin-right: 0;
                    transform: translate(calc(var(--p-16) * -1), 0);
                    overflow: hidden;
                    border-top-right-radius: var(--rounded-3xl);
                    border-bottom-right-radius: var(--rounded-3xl);
                  }
                }

                .alignright {
                  ${mediaQueries.md} {
                    float: right;
                    margin-left: var(--p-6);
                    transform: translate(var(--p-6));
                  }

                  ${mediaQueries.lg} {
                    margin-left: var(--p-16);
                    transform: translate(var(--p-16));
                    overflow: hidden;
                    border-top-left-radius: var(--rounded-3xl);
                    border-bottom-left-radius: var(--rounded-3xl);
                  }
                }

                .aligncenter {
                  text-align: center;
                  img {
                    margin: 0 auto;
                  }
                }

                &.alignfull {
                  img {
                  }
                }

                &.size-large {
                  img {
                    width: 100%;
                  }
                }

                &.size-full {
                  margin: var(--p-6) calc(-1 * var(--p-6));

                  ${mediaQueries.lg} {
                    margin: var(--p-16) calc(-1 * var(--p-16));
                  }

                  img {
                    width: 100%;
                  }
                }
              }

              .wp-block-gallery {
                &.columns-3 {
                  @apply grid-cols-3;
                }

                &.columns-3 .blocks-gallery-grid {
                  grid-template-columns: 1fr 1fr 1fr;

                  .blocks-gallery-item {
                  }
                }

                .blocks-gallery-grid {
                  display: grid;
                  grid-gap: 1rem;
                  margin: 0;
                  list-style: none !important;

                  .blocks-gallery-item {
                    position: relative;
                    margin: 0;
                    padding: 0;
                    list-style: none !important;

                    &:before {
                      content: unset;
                    }

                    figure {
                      position: relative;
                    }

                    img {
                      object-fit: cover;
                    }
                  }
                }
              }
            `
          )}
        >
          <WpApiContent content={data.content.rendered} />
        </div>

        {data.ea_tags && data.ea_tags.length > 0 && (
          <div className="my-6 flex space-x-6 justify-center items-center">
            <TagList
              label="Tags"
              className="justify-center"
              items={data.ea_tags.map((t, i) => ({
                name: t.name,
                link: `/blog/tags/${t.term_id}|${t.name}`,
              }))}
            />
            <div className="font-display uppercase text-xs font-semibold">
              {parseInt(data.page_views) < 2
                ? `${data.page_views} View`
                : `${data.page_views} Views`}
            </div>
          </div>
        )}

        {hasLocation && (
          <PostMap
            lng={data["x_metadata"].geo_longitude}
            lat={data["x_metadata"].geo_latitude}
            zoom={data["x_metadata"].geo_zoom}
            title={data["x_metadata"].geo_address}
          />
        )}

        {process.env.NODE_ENV === "development" && (
          <div className="mt-16">
            <Button
              href={`https://blog.evanagee.com/wp-admin/post.php?post=${data.id}&action=edit`}
              target="_blank"
              variant="secondary"
            >
              Edit Post
            </Button>
          </div>
        )}
      </main>
    </article>
  );
}
