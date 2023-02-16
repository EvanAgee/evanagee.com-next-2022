import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import moment from "moment";
import classNames from "classnames";
import Link from "next/link";
import settings from "@/settings";
import helpers from "@/helpers";
import WpApiContent from "@/components/WpApiContent";
import PhotoSpecs from "@/components/Photos/PhotoSpecs";
import PrevNext from "@/components/PrevNext";
import Discussion from "@/components/Discussion";
import PageLoader from "@/components/Loaders/PageLoader";
import Breadcrumbs from "@/components/Breadcrumbs";
import BadgeWrapper from "@/components/BadgeWrapper";
import Carousel from "@/components/Carousel";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";
import useBreakpoints from "@/hooks/useBreakpoints";
import Meta from "@/components/Meta";
import Button from "@/components/Button";

export default function Photo({ photo, catPosts }) {
  const { breakpoint } = useBreakpoints();

  return (
    <>
      <Meta
        title={`${helpers.decodeHtml(photo?.title?.rendered)}`}
        ogData={{
          ...photo?.yoast_head_json,
          ogImage: helpers.postImage(photo, "large")[0],
        }}
      />
      <div className="pl-6 pt-6">
        <Breadcrumbs title={helpers.decodeHtml(photo?.title?.rendered)} />
      </div>
      <div className="bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 lg:py-16">
        <figure className="lg:px-16 flex items-center justify-center relative">
          <a href={helpers.postImage(photo, "full")[0]} target="_blank">
          <img
            src={helpers.postImage(photo, "post-thumbnail")[0]}
            className="block object-contain shadow-lg max-w-[80%] mx-auto w-auto h-auto"
          />
          </a>
        </figure>

        <header className="p-6 lg:p-16 lg:pb-0 font-display flex flex-col lg:flex-row lg:justify-between text-right lg:text-left lg:items-baseline gap-6">
          <div>
            <h1 className="text-3xl lg:text-6xl text-white mb-4">
              {photo?.title?.rendered && (
                <WpApiContent content={photo?.title?.rendered} />
              )}
            </h1>
            <ul className="flex flex-col lg:flex-row text-gray-300 text-sm lg:gap-6 mb-0">
              <li>
                Taken{" "}
                <strong className="">
                  {moment(photo.dateTaken).fromNow()}
                </strong>
              </li>
              <li>
                Uploaded{" "}
                <strong className="">
                  {moment(moment(photo.date).toDate()).format(
                    "dddd, MMMM Do YYYY"
                  )}
                </strong>
              </li>
            </ul>
          </div>
          <div>
            <Button href="/photos">Back to Photos</Button>
          </div>
        </header>
      </div>
      <div className="dark:bg-gray-900 dark:text-gray-300 p-6 pb-12 lg:p-16">
        <div className="flex space-x-9 justify-center">
          <div className="flex-shrink">
            {photo?.content?.rendered && (
              <WpApiContent content={photo?.content?.rendered} />
            )}
          </div>
          <div
            className={classNames("lg:[min-width:900px]", {
              "mx-auto": !photo?.content?.rendered,
            })}
          >
            <PhotoSpecs photo={photo} />
          </div>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="flex items-center justify-center space-x-6 pt-6">
            <Button
              href={`${settings.backendBase}/wp-admin/post.php?post=${photo.id}&action=edit`}
              target="_blank"
            >
              Edit Photo
            </Button>
          </div>
        )}
      </div>
      <div className="bg-black text-white">
        <Discussion post={photo} />
      </div>
      <PrevNext data={photo} />
      {catPosts && catPosts.filter((c) => c.id !== photo.id).length > 0 && (
        <BadgeWrapper
          title={`More Photos in <span className="text-primary-500">${photo?.ea_photo_albums[0]?.name}</span>`}
        >
          <Carousel
            slidesToShow={breakpoint.isLgUp ? 4 : 1}
            theme="dark"
            showDots={false}
            className="!border-b-0"
          >
            {catPosts
              .filter((c) => c.id !== photo.id)
              .map((c, i) => (
                <PhotoTeaser key={i} data={helpers.getPhotoMeta(c)} />
              ))}
          </Carousel>
        </BadgeWrapper>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const photo = await fetch(
      `${settings.apiBase}/photos?slug=${context.params.slug}&per_page=1`
    );
    const res = await photo.json();
  
    if (!res || res.length < 1) {
      return {
        notFound: true,
      };
    }
  
    // Get photos that are in the same album
    let catPosts = false;
    if (res[0]?.ea_photo_albums && res[0]?.ea_photo_albums?.length > 0) {
      const posts = await fetch(
        `${settings.apiBase}/photos?photo_album=${res[0]?.ea_photo_albums[0].term_id}&per_page=10`
      );
      catPosts = await posts.json();
    }
  
    let relatedBlogPosts = false;
    if (res[0]?.ea_photo_albums && res[0]?.ea_photo_albums?.length > 0) {
      const posts = await fetch(
        `${settings.apiBase}/photos?photo_album=${res[0]?.ea_photo_albums[0].term_id}&per_page=100`
      );
      relatedBlogPosts = await posts.json();
    }
  
    return {
      props: {
        photo: res[0],
        catPosts,
      },
      // revalidate: settings.ISRrevalidate,
    };

  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
/*
export async function getStaticPaths() {
  console.time("Getting static paths for photos");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `${settings.apiBase}/photos?page=${page}`
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

  console.timeEnd("Getting static paths for photos");
  return { paths, fallback: "blocking" };
}
*/