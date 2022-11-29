import Badge from "@/components/Badge";
import BadgeWrapper from "@/components/BadgeWrapper";
import CurrentLocation from "@/components/CurrentLocation";
import GridWrapper from "@/components/GridWrapper";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import Meta from "@/components/Meta";
import PostDetail from "@/components/Blog/Post";
import Post from "@/components/Blog/Post";
import React from "react";
import { css } from "@emotion/css";
import settings from "@/settings";
import TravelMap from "@/components/TravelMap";
import PostGridWrapper from "@/components/Blog/PostGridWrapper";
import useBreakpoints from "@/hooks/useBreakpoints";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";
import helpers from "@/helpers";
function Map({ posts, photos }) {
  const { breakpoint } = useBreakpoints();
  return (
    <>
      <Meta />
      <div className="pt-6 lg:pt-16 text-center">
        <header className="mx-auto max-w-4xl mb-12 px-6 text-center prose xl:prose-xl">
          <h1 className="dark:text-white">Our Travels</h1>
          <p className="dark:text-gray-300">
            In April of 2021 Crys, Lil and I sold our home and almost everything
            we owned and{" "}
            <Link href="/blog/were-moving-into-a-5th-wheel">
              moved into a 5th wheel trailer
            </Link>
            . Since then we've been on a quest to visit all 48 contiguous United
            States. Below are posts related to those travels and our experiences
            along the way.
          </p>
        </header>
      </div>
      <TravelMap />
      {/* <div className="text-center mb-16">
        <CurrentLocation />
      </div> */}
      {posts && (
        <BadgeWrapper title="RV Living Blog Posts">
          <Carousel
              slidesToShow={breakpoint.isLgUp ? 3 : 1}
              className=" bg-opacity-0 border-b-0"
              separated
            >
              {posts.map((c, i) => (
                <PostGridWrapper
                  key={i}
                  className="pt-16 pb-20 w-full"
                  counter={i}
                  largeFirst={false}
                >
                  <PostDetail data={c} style="teaser" />
                </PostGridWrapper>
              ))}
            </Carousel>
        </BadgeWrapper>
      )}

      {photos && <section>
          <BadgeWrapper title="Recent Travel Photos">
            <Carousel
              slidesToShow={breakpoint.isLgUp ? 4 : 2}
              className="!border-b-0"
              showDots={false}
              separated={false}
            >
              {photos?.map((c, i) => (
                <PhotoTeaser
                  key={i}
                  data={helpers.getPhotoMeta(c)}
                  showDetails={false}
                />
              ))}
            </Carousel>
          </BadgeWrapper>
        </section>}
    </>
  );
}

export default Map;

export const getStaticProps = async () => {
  let posts = await fetch(
    `${settings.apiBase}/posts?categories=185&per_page=50`
  );
  posts = await posts.json();

  let photos = await fetch(`${settings.apiBase}/photos?photo_album=1889&per_page=50`);
  photos = await photos.json();

  return {
    props: {
      posts,
      photos
    },
    revalidate: settings.ISRrevalidate,
  };
};
