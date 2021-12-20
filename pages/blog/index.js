import React, { Suspense, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Post from "@/components/Blog/Post";
import classNames from "classnames";
import useBreakpoints from "@/hooks/useBreakpoints";
import { HeaderContext } from "@/context/HeaderContext";
import Loader from "@/components/Loaders/Loader";
import useInfiniteScroller from "@/hooks/useInfiniteScroller";
import GridWrapper from "@/components/GridWrapper";
import Meta from "@/components/Meta";
import settings from "@/settings";
import helpers from "@/helpers";
const Filters = dynamic(() => import("@/components/Blog/Filters/Filters"));

export default function BlogIndex({ posts, filterType }) {
  const location = useRouter();
  const { setPageTitle } = useContext(HeaderContext);
  const { breakpoint } = useBreakpoints();
  const {
    loadMoreButtonRef,
    filters,
    filterTerm,
    setFilters,
    resultCount,
    isLoading,
    data,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteScroller({
    initialFilters: {
      categories: { value: null },
      tags: { value: null },
      order: { value: "desc" },
      orderby: { value: "date" },
      per_page: { value: settings.apiSettings.perPageInfinite }
    },
    queryID: "blogIndex",
    apiPath: "/posts"
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <div data-test-id="blog-index">
      <Meta
        title={
          filterType
            ? `Blog posts ${
                filterType === "categories"
                  ? `in the ${filterTerm.split("|")[1]} category`
                  : `tagged with ${filterTerm.split("|")[1]}`
              }`
            : false
        }
        ogData={posts ? {
          ogImage: helpers.postImage(posts[0], "large")[0],
        } : false}
      />
      <Filters
        filters={filters}
        onChange={setFilters}
        results={resultCount}
        className="sticky top-0 z-10"
      />
      {false && posts && (
        <GridWrapper data-test-id="blog-index-grid-wrapper" largeFirst={true}>
          {posts.map((d, ii) => (
            <Post
              key={ii}
              data={d}
              style={ii === 0 ? "large" : "small"}
            />
          ))}
        </GridWrapper>
      )}
      
      {isLoading ? (
        <GridWrapper largeFirst={true}>
          {[1, 2, 3].map((d, ii) => (
            <Loader key={ii} className={ii === 0 ? "lg:pt-32" : "lg:py-32"} />
          ))}
        </GridWrapper>
      ) : resultCount > 0 ? (
        <>
          {data.pages.map((group, i) => (
            <GridWrapper
              data-test-id="blog-index-grid-wrapper"
              largeFirst={true}
              key={i}
            >
              {group.data.map((d, ii) => (
                <Post
                  key={ii}
                  data={d}
                  style={ii === 0 && breakpoint.isLgUp ? "large" : "small"}
                />
              ))}
            </GridWrapper>
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center h-96">
          No posts found...
        </div>
      )}
      <div className="flex items-center justify-center py-16">
        <button
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={classNames(
            "button button-black button-reversed button-sm"
          )}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
}
