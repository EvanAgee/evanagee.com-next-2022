import React from "react";
import { css } from "@emotion/css";
import ParseHTML from "@/components/WpApiContent";
import useMatchHeight from "@/hooks/useMatchHeight";
import Discussion from "@/components/Discussion";
import Meta from "@/components/Meta";
import settings from "@/settings";

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
            Unfortunately I don't have much time to make films these days, but
            below are a few I watched recently.
          </p>
          <a
            href="https://letterboxd.com/evanagee/"
            target="_blank"
            className="w-auto flex items-center mx-auto font-display font-bold tracking-tighter text-lg justify-center not-prose decoration-transparent border-none"
          >
            <img
              src="assets/images/letterboxd-mac-icon.png"
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
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6 p-6 text-center"
      >
        {feed.map((f, i) => (
          <a href={f.link} key={i} target="_blank" className="text-black">
            <div
              className={css`
                *:not(:first-child) {
                  display: none;
                }
              `}
            >
              <ParseHTML content={f.content} />
            </div>
            <h6 className="matchHeight flex items-center justify-center">
              {f.title}
            </h6>
            <div className="text-xs">
              <ParseHTML content={f.contentSnippet} />
            </div>
          </a>
        ))}
      </div>
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
