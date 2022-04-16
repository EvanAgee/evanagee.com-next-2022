import Badge from "@/components/Badge";
import BadgeWrapper from "@/components/BadgeWrapper";
import CurrentLocation from "@/components/CurrentLocation";
import GridWrapper from "@/components/GridWrapper";
import Link from "next/link";
import Meta from "@/components/Meta";
import Post from "@/components/Blog/Post";
import React from "react";
import { css } from "@emotion/css";
import settings from "@/settings";
import TravelMap from "@/components/TravelMap";

function Map({ posts }) {
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
      <div className="text-center mb-16">
        <CurrentLocation />
      </div>
      {posts && (
        <BadgeWrapper title="RV Living Blog Posts">
          <GridWrapper
            data-test-id="blog-index-grid-wrapper"
            largeFirst={false}
            className="bg-gray-800"
          >
            {posts.map((d, ii) => (
              <Post key={ii} data={d} style="small" />
            ))}
          </GridWrapper>
        </BadgeWrapper>
      )}
    </>
  );
}

export default Map;

export const getStaticProps = async () => {
  let posts = await fetch(
    `${settings.apiBase}/posts?categories=185&per_page=50`
  );
  posts = await posts.json();

  return {
    props: {
      posts,
    },
  };
};
