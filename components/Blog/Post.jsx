import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import Image from "next/image";
import Link from "next/link";
import helpers from "@/helpers";
import TagList from "@/components/TagList";
import Categories from "@/components/Blog/Meta/Categories";
import WpApiContent from "@/components/WpApiContent";
import useBreakpoints from "@/hooks/useBreakpoints";
import PostMap from "@/components/Blog/PostMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Post({ data, style, showImage }) {
  const { breakpoint, mediaQueries } = useBreakpoints();
  const image = React.useMemo(() => {
    return helpers.postImage(
      data,
      style === "small" ? "post-thumbnail" : "post-thumbnail"
    );
  }, [data, style]);

  const hasLocation = React.useMemo(() => {
    return data["x_metadata"].geo_longitude && data["x_metadata"].geo_latitude;
  }, [data]);

  return (
    <>
      <article
        className={classNames("text-center post", {
          "post--large p-6 lg:p-16": style === "large" || style === "full",
          "pb-0": style === "large",
          "post--small": style === "small",
        })}
      >
        <header>
          <time
            className={classNames(
              "relative block text-gray-400",
              {
                "my-8": style === "large" || style === "full",
                "my-2 text-sm": style === "small" || style === "teaser",
              },
              css`
                &:before,
                &:after {
                  position: absolute;
                  content: ${style === "small" || style === "teaser"
                    ? "unset"
                    : ""};
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
          <h3
            className={classNames(
              "up-title post-title mx-auto flex items-center justify-center matchHeight",
              {
                "xl:max-w-sm lg:max-w-xs hover:text-primary-500":
                  style === "small" || style === "teaser",
                "up-title-lg max-w-screen-lg lg:my-12":
                  style === "large" || style === "full",
              }
            )}
          >
            <Link href={`/blog/${data.slug}`}>
              <a className="text-inherit flex items-center justify-center">
                <WpApiContent content={data.title.rendered} />
              </a>
            </Link>
          </h3>
        </header>

        {(style === "large" || style === "full") && (
          <>
            {data.ea_categories && (
              <div className="my-6">
                <Categories categories={data.ea_categories} />
              </div>
            )}
            {style === "large" && (
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
            )}
          </>
        )}

        {showImage && (
          <div
            className={classNames(
              "bg-no-repeat bg-center relative",
              {
                "bg-gradient-to-r from-gray-300 to-gray-200":
                  !image && style !== "teaser",
              },
              css`
                padding-bottom: ${!image && style !== "teaser" ? 0 : "53.45%"};
              `
            )}
          >
            {(image || style === "teaser") && (
              <Link href={`/blog/${data.slug}`}>
                {image ? (
                  <img
                    alt={helpers.decodeHtml(data.title.rendered)}
                    loading="lazy"
                    src={image[0]}
                    width={image[1]}
                    height={image[2]}
                    className={classNames(
                      "inset-0 absolute object-cover w-full h-full object-center shadow-lg rounded-2xl max-w-full cursor-pointer",
                      {
                        "": style !== "full",
                      }
                    )}
                  />
                ) : (
                  <div className="inset-0 absolute object-cover w-full h-full object-center shadow-lg rounded-2xl bg-gray-200 flex items-center justify-center text-gray-300">
                    <FontAwesomeIcon size="2x" icon={["fal", "images"]} />
                  </div>
                )}
              </Link>
            )}
          </div>
        )}
        {(style === "small" || style === "full") && (
          <main
            className={classNames("mt-6 lg:mt-12 lg:mb-4", {
              matchHeight: style === "small",
            })}
          >
            {style === "small" && (
              <div
                className={classNames(
                  "text-base lg:text-lg mb-6",
                  css`
                    .link-more {
                      display: none;
                    }
                  `
                )}
              >
                <WpApiContent content={data.excerpt.rendered} />
              </div>
            )}

            {style === "small" && data.ea_categories && (
              <>
                <Categories categories={data.ea_categories} />
              </>
            )}

            {style === "full" && (
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
            )}

            {style === "full" && data.ea_tags && data.ea_tags.length > 0 && (
              <div className="my-6">
                <TagList
                  label="Tags"
                  className="justify-center"
                  items={data.ea_tags.map((t, i) => ({
                    name: t.name,
                    link: `/blog/tags/${t.term_id}|${t.name}`,
                  }))}
                />
              </div>
            )}

            {style === "full" && hasLocation && (
              <PostMap
                lng={data["x_metadata"].geo_longitude}
                lat={data["x_metadata"].geo_latitude}
                zoom={data["x_metadata"].geo_zoom}
                title={data["x_metadata"].geo_address}
              />
            )}

            {style === "full" && process.env.NODE_ENV === "development" && (
              <a
                className="mt-16 button button-reversed button-black"
                href={`https://blog.evanagee.com/wp-admin/post.php?post=${data.id}&action=edit`}
                target="_blank"
              >
                Edit Post
              </a>
            )}
          </main>
        )}

        {(style === "small" || style === "large") && (
          <div
            className={classNames("flex justify-center pt-8", {
              "pt-16": style === "large",
            })}
          >
            <Link href={`/blog/${data.slug}`}>
              <a className="button">READ MORE</a>
            </Link>
          </div>
        )}
      </article>
    </>
  );
}

Post.defaultProps = {
  data: false,
  style: "large",
  showImage: true,
};

export default React.memo(Post);
