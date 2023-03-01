import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/css";
import classNames from "classnames";
import Img from "next/image";
import Loader from "@/components/Loaders/Loader";
import Link from "next/link";
import settings from "@/settings";
import helpers from "@/helpers";
import WpApiContent from "@/components/WpApiContent";
import PrevNext from "@/components/PrevNext";
import Discussion from "@/components/Discussion";
import useBreakpoints from "@/hooks/useBreakpoints";
import ReactGA from "react-ga4";
import Breadcrumbs from "@/components/Breadcrumbs";
import { scroller } from "react-scroll";
import Meta from "@/components/Meta";
import Button from "@/components/Button";
import BadgeWrapper from "@/components/BadgeWrapper";
import Carousel from "@/components/Carousel";
import PostDetail from "@/components/Blog/Post";
import ProjectTeaser from "@/components/Projects/ProjectTeaser";
import PostGridWrapper from "@/components/Blog/PostGridWrapper";

function Project({ project, relatedProjects }) {
  const featuredImageRef = React.useRef();
  const { breakpoint, mediaQueries } = useBreakpoints();
  const [featuredImage, setFeaturedImage] = useState(
    helpers.postImage(project, "large")
  );

  React.useEffect(() => {
    if (!project) return;
    setFeaturedImage(helpers.postImage(project, "large"));
    ReactGA.event({
      category: "User",
      action: "Viewed Project Details",
      label: helpers.decodeHtml(project.title.rendered),
    });
  }, [project]);

  // Don't set the featured image until it's fully loaded
  const updateFeaturedImage = (url) => {
    setFeaturedImage(false);
    const image = new Image();
    image.src = url;

    scroller.scrollTo("featuredImage", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });

    image.addEventListener("load", () => {
      setFeaturedImage([url, image.naturalWidth, image.naturalHeight]);
    });
  };

  if (!project) return null;

  return (
    <>
      <Meta
        title={`${helpers.decodeHtml(project.title.rendered)}`}
        ogData={{
          ...project.yoast_head_json,
          ogImage: helpers.postImage(project, "large")[0],
        }}
      />
      <div className="pl-6 pt-6">
        <Breadcrumbs title={helpers.decodeHtml(project.title.rendered)} />
      </div>
      <div className="bg-gradient-to-b from-white to-gray-300 dark:from-gray-900 dark:to-gray-800 lg:py-16 lg:min-h-screen flex flex-col">
        <figure
          name="featuredImage"
          className="p-6 flex-1 flex items-center justify-center"
        >
          {featuredImage ? (
            <img
              ref={featuredImageRef}
              loading="lazy"
              width={featuredImage[1]}
              height={featuredImage[2]}
              src={featuredImage[0]}
              className="mx-auto shadow-xl rounded-lg max-w-full w-full h-auto"
            />
          ) : (
            <Loader />
          )}
        </figure>

        {/* Photo Browser */}
        <ul
          className={classNames(
            "flex flex-wrap justify-center mt-6 gap-6 cursor-pointer",
            css`
              img {
                max-width: 70px;
                height: auto;

                ${mediaQueries.lg} {
                  max-width: 150px;
                }
              }
            `
          )}
        >
          <li>
            <img
              loading="lazy"
              src={helpers.postImage(project, "thumbnail")[0]}
              className={classNames(
                "rounded-md ring-2 ring-gray-500 ring-offset-4 ring-offset-transparent",
                {
                  "ring-opacity-0":
                    featuredImage !== helpers.postImage(project, "large")[0],
                  "opacity-50":
                    featuredImage === helpers.postImage(project, "large")[0],
                }
              )}
              onClick={() =>
                updateFeaturedImage(helpers.postImage(project, "large")[0])
              }
            />
          </li>
          {"additional_photos" in project.acf &&
            project.acf.additional_photos &&
            project.acf.additional_photos.map((p, i) => (
              <li key={i}>
                <img
                  loading="lazy"
                  src={p.sizes.thumbnail}
                  className={classNames(
                    "rounded-md ring-2 ring-gray-500 ring-offset-4 ring-offset-transparent",
                    {
                      "ring-opacity-0": featuredImage !== p.sizes.large,
                      "opacity-50": featuredImage === p.sizes.large,
                    }
                  )}
                  onClick={() => updateFeaturedImage(p.sizes.large)}
                />
              </li>
            ))}
        </ul>

        <header className="p-6 lg:p-16 lg:pb-0 font-display flex flex-col items-center text-center text-gray-600 dark:text-white">
          <h1 className="text-3xl lg:text-6xl text-gray-800 dark:text-white mb-4 flex-1">
            <WpApiContent content={project.title.rendered} />
          </h1>
          <ul
            className={classNames(
              "flex flex-col lg:flex-row items-start lg:items-center lg:justify-start dark:text-gray-300 text-sm gap-2 lg:gap-6 mb-0",
              css`
                li {
                  display: flex;
                  justify-content: flex-start;
                }
                span {
                  text-align: left;
                  width: 60px;
                  max-width: 60px;

                  ${mediaQueries.lg} {
                    width: auto;
                    max-width: none;
                    margin-right: var(--m-3);
                  }
                }
              `
            )}
          >
            <li>
              <span>Client</span>
              <strong>
                {project.acf.client ? project.acf.client : "Unspecified"}
              </strong>
            </li>
            <li>
              <span>Circa</span>
              <time className="">
                <strong>{helpers.formatDate(project.date, "yyyy")}</strong>
              </time>
            </li>
            {"ea_tags" in project && (
              <li className="flex items-center">
                <span>Tech</span>
                <ul className="flex flex-1 flex-wrap items-center mb-0">
                  {project.ea_tags.map((t, i) => (
                    <li key={i} className="mr-3">
                      <Link href={`/portfolio/tags/${t.term_id}|${t.name}`}>
                        <strong className="text-inherit">{t.name}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            <li className="flex items-center">
              <span>Views</span>
              <strong>{project.page_views}</strong>
            </li>
          </ul>
        </header>

        <div className="text-center mx-auto p-6 pb-12 lg:p-16 prose lg:prose-xl">
          <WpApiContent content={project.content.rendered} />
        </div>

        <div className="flex items-center justify-center gap-6">
          {"project_url" in project.acf && project.acf.project_url !== "" && (
            <Button
              variant="secondary"
              href={project.acf.project_url}
              target="_blank"
              rel="external"
            >
              View Project
            </Button>
          )}

          {breakpoint.isLgUp && process.env.NODE_ENV !== "production" && (
            <Button
              variant="secondary"
              href={`${settings.backendBase}/wp-admin/post.php?post=${project.id}&action=edit`}
              target="_blank"
            >
              Edit Project
            </Button>
          )}

          <Button href="/portfolio">Back to Portfolio</Button>
        </div>

        <div className="text-xs text-center my-6 font-display">
          Please note the current state of this project <br />
          may not reflect the state in which it was delivered.
        </div>
      </div>
      <Discussion />
      <PrevNext data={project} />
      {relatedProjects &&
        relatedProjects.filter((c) => c.id !== project.id).length > 0 && (
          <div className="">
            <BadgeWrapper title={`Similar Projects`}>
              <Carousel
                slidesToShow={breakpoint.isLgUp ? 3 : 1}
                className=" bg-opacity-75"
              >
                {relatedProjects
                  .filter((c) => c.id !== project.id)
                  .map((c, i) => (
                    <PostGridWrapper
                      key={i}
                      className="pt-16 pb-20 w-full"
                      counter={i}
                      largeFirst={false}
                    >
                      <ProjectTeaser data={c} showDescription={false} />
                    </PostGridWrapper>
                  ))}
              </Carousel>
            </BadgeWrapper>
          </div>
        )}
    </>
  );
}

export default Project;

export async function getStaticProps(context) {
  let project = await fetch(
    `${settings.apiBase}/projects?slug=${context.params.slug}&per_page=1`
  );
  project = await project.json();

  if (!project || project.length < 1) {
    return {
      notFound: true,
    };
  }

  // Get posts that are in the same category
  let relatedProjects = false;
  if (project[0]?.tags && project[0]?.tags?.length > 0) {
    let projects = await fetch(
      `${settings.apiBase}/projects?tags=${project[0]?.tags[0]}&per_page=100`
    );
    relatedProjects = await projects.json();
  }

  return {
    props: {
      project: project[0],
      relatedProjects,
    },
    revalidate: settings.ISRrevalidate,
  };
}

export async function getStaticPaths() {
  console.time("Getting static paths for projects");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `${settings.apiBase}/projects?page=${page}`
    );
    const posts = await res.json();
    if (posts.length > 0) {
      posts.map((p) => allPosts.push(p.slug));
      page++;
    } else {
      keepGoing = false;
    }
  }

  // Get the paths we want to pre-render based on posts
  const paths = allPosts.map((slug) => ({
    params: { slug: `${slug}` },
  }));

  console.timeEnd("Getting static paths for projects");
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
