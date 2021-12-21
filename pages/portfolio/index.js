import React, { useContext, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Loader from "@/components/Loaders/Loader";
import ProjectTeaser from "@/components/Projects/ProjectTeaser";
import useInfiniteScroller from "@/hooks/useInfiniteScroller";
import Filters from "@/components/Projects/Filters";
import GridWrapper from "@/components/GridWrapper";
import Meta from "@/components/Meta";
import helpers from "@/helpers"
import Button from "@/components/Button";

function Portfolio({ posts, filterType }) {
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
  } = useInfiniteScroller({
    initialFilters: {
      tags: { value: null },
      order: { value: "desc" },
      orderby: { value: "date" },
      per_page: { value: 12 },
      before: { value: null },
      after: { value: null },
      year: { value: null },
    },
    queryID: "portfolioIndex",
    apiPath: "/projects",
  });
  return (
    <div className="relative">
      <Meta
        title={
          filterTerm
            ? `Projects ${
                filterType === "tags"
                  ? `tagged with ${filterTerm.split("|")[1]}`
                  : `tagged with ${filterTerm.split("|")[1]}`
              }`
            : false
        }
        ogData={posts ? {
          og_image: [{ url: helpers.postImage(posts[0], "large")[0] }],
        } : false}
      />
      <Filters
        filters={filters}
        onChange={setFilters}
        results={resultCount}
        className="sticky top-0 z-10"
      />
      <div className="pt-6 lg:pt-16 text-center">
        <header className="mx-auto max-w-4xl mb-12 px-6">
          <h1 className="text-3xl lg:text-6xl mb-6">My Work</h1>
          <p class="mb-6">
            I've worked as a web developer since the year 2000 and during that
            time I've completed hundreds of projects. Below is a sampling of
            those projects. You can filter projects by year or tag using the
            controls above.
          </p>
          <div className="flex gap-6 justify-center">
            <Button href="/resume">
              View My Resume
            </Button>
            <Button
              variant="secondary"
              href="https://vuewp.com"
              target="_blank"
            >
              Vue WordPress Training
            </Button>
          </div>
        </header>

        {isLoading ? (
          <GridWrapper>
            {[1, 2, 3, 4].map((_, ii) => (
              <Loader key={ii} className={ii === 0 ? "lg:pt-32" : "lg:py-32"} />
            ))}
          </GridWrapper>
        ) : resultCount > 0 ? (
          data.pages.map((group, i) => (
            <GridWrapper key={i}>
              {group.data.map((d, ii) => (
                <ProjectTeaser key={i} data={d} />
              ))}
            </GridWrapper>
          ))
        ) : (
          <div className="flex justify-center items-center h-96">
            No projects found...
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
              : "No more projects, is your finger tired?"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
