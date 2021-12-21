import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import moment from "moment";
import { useRouter } from "next/router";
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
        <Breadcrumbs />
      </div>
      <div className="bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 lg:py-16">
        <figure className="lg:px-16">
          <img
            loading="lazy"
            src={helpers.postImage(photo, "large")[0]}
            className="mx-auto shadow-lg"
          />
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
            <Link href="/photos">
              <a className="button button-sm whitespace-nowrap">
                Back to Photos
              </a>
            </Link>
          </div>
        </header>
      </div>
      <div className="dark:bg-gray-900 dark:text-gray-300 p-6 pb-12 lg:p-16">
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <div>
            {photo?.content?.rendered && (
              <WpApiContent content={photo?.content?.rendered} />
            )}
          </div>
          <div className="lg:col-span-2">
            <PhotoSpecs photo={photo} />
          </div>
        </div>
      </div>
      <div className="">
        <Discussion />
      </div>
      {catPosts && catPosts.filter((c) => c.id !== photo.id).length > 0 && (
        <BadgeWrapper
          title={`More Photos in '${photo?.ea_photo_albums[0]?.name}'`}
        >
          <Carousel slidesToShow={breakpoint.isLgUp ? 3 : 1} theme="dark">
            {catPosts
              .filter((c) => c.id !== photo.id)
              .map((c, i) => (
                <PhotoTeaser key={i} data={helpers.getPhotoMeta(c)} />
              ))}
          </Carousel>
        </BadgeWrapper>
      )}
      <PrevNext data={photo} />
    </>
  );
}

export async function getStaticProps(context) {
  const photo = await fetch(
    `${settings.apiBase}/photos?slug=${context.params.slug}&per_page=1`
  );
  const res = await photo.json();

  if (!res) {
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

  return {
    props: {
      photo: res[0],
      catPosts,
    },
    revalidate: settings.ISRrevalidate,
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  console.time("Getting static paths for photos");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `https://blog.evanagee.com/wp-json/wp/v2/photos?per_page=20&page=${page}`
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

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
}
