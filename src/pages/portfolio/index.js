import React, { useContext, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Loader from "@/components/Loaders/Loader";
import ProjectTeaser from "@/components/Projects/ProjectTeaser";
import useInfiniteScroller from "@/hooks/useInfiniteScroller";
import Filters from "@/components/Filters";
import GridWrapper from "@/components/GridWrapper";
import Meta from "@/components/Meta";
import helpers from "@/helpers";
import Button from "@/components/Button";

function Portfolio({ posts, filterType }) {
  const {
    loadMoreButtonRef,
    LoadMoreButton,
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
      search: { value: null },
      year: {
        value: null,
        querySlug: "projects/dates",
        setFunction: (field) => {
          return [
            {
              type: "after",
              field: field
                ? {
                    ...field,
                    value: `${field.value - 1}-12-31T00:00:00`,
                  }
                : { value: null },
            },
            {
              type: "before",
              field: field
                ? {
                    ...field,
                    value: `${field.value + 1}-01-01T00:00:00`,
                  }
                : { value: null },
            },
          ];
        },
        displayFunction: (item) => {
          return {
            value: item.year,
            label: `${item.year} (${item.count})`,
          };
        },
        isMulti: false,
      },
      tags: { value: null, querySlug: "projects/tags" },
      order: { value: "desc" },
      orderby: { value: "date" },
      per_page: { value: 12 },
      before: { value: null },
      after: { value: null },
      post_type: { value: "project" },
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
                  ? `tagged with '${filterTerm.split("|")[1]}'`
                  : `tagged with '${filterTerm.split("|")[1]}'`
              }`
            : false
        }
        ogData={
          posts
            ? {
                og_image: [{ url: helpers.postImage(posts[0], "large")[0] }],
              }
            : false
        }
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
          <p className="mb-6">
            I've worked as a web developer since the year 2000 and during that
            time I've completed hundreds of projects. Below is a sampling of
            those projects. You can filter projects by year or tag using the
            controls above.
          </p>
          <div className="flex gap-6 justify-center">
            <Button href="/resume">View My Resume</Button>
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

        <LoadMoreButton />
      </div>
    </div>
  );
}

export default Portfolio;
