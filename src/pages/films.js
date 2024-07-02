import Discussion from "@/components/Discussion";
import Meta from "@/components/Meta";
import ParseHTML from "@/components/WpApiContent";
import React from "react";
import { css } from "@emotion/css";
import settings from "@/settings";
import useMatchHeight from "@/hooks/useMatchHeight";
import Carousel from "@/components/Carousel";

function Films({ feed, error }) {
  const { ref, updateMatchedHeights } = useMatchHeight();

  React.useEffect(() => {
    updateMatchedHeights();
  }, []);

  return (
    <>
      <Meta />
      <div className="pt-6 lg:pt-16 text-center">
        <header className="mx-auto max-w-4xl mb-12 px-6 text-center prose xl:prose-xl">
          <h1 className="">Film Diary</h1>
          <p>
            I love film. I love making films and I love watching films.
            Unfortunately I don&apos;t have much time to make films these days,
            but below are a few I watched recently.
          </p>
          <a
            href="https://letterboxd.com/evanagee/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-auto flex items-center mx-auto font-display font-bold tracking-tighter text-lg justify-center not-prose decoration-transparent border-none"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE}/static/letterboxd-mac-icon.png`}
              className="mr-4"
              style={{ width: "64px", height: "auto" }}
              width="64"
              height="64"
            />
            Follow me on Letterboxd
          </a>

          {error && <p>{error}</p>}
        </header>
      </div>

      <Carousel slidesToShow={6} className="px-6">
        {feed.map((f, i) => (
          <a
            href={f.link}
            key={i}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black pb-12"
          >
            <div
              className={css`
                *:not(:first-child) {
                  display: none;
                }
              `}
            >
              <ParseHTML content={f.content} />
            </div>
            <h6 className="flex items-center justify-center">{f.title}</h6>
            <div className="hidden text-xs">
              <ParseHTML content={f.contentSnippet} />
            </div>
          </a>
        ))}
      </Carousel>
      <Discussion />
    </>
  );
}

export default Films;

export async function getStaticProps() {
  let Parser = require("rss-parser");
  let parser = new Parser();

  try {
    let feed = await parser.parseURL("https://letterboxd.com/evanagee/rss/");

    return {
      props: {
        feed: feed.items,
      },
      revalidate: settings.ISRrevalidate,
    };
  } catch (error) {
    return {
      props: {
        feed: [],
        error: error.toString(),
      },
    };
  }
}
