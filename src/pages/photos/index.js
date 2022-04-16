import React, { useContext } from "react";
import classNames from "classnames";
import useBreakpoints from "@/hooks/useBreakpoints";
import Loader from "@/components/Loaders/Loader";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";
import { css } from "@emotion/css";
import { HeaderContext } from "@/context/HeaderContext";
import useInfiniteScroller from "@/hooks/useInfiniteScroller";
import helpers from "@/helpers";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Meta from "@/components/Meta";
const Filters = dynamic(() => import("@/components/Filters"));

function Photos({ posts, filterType }) {
  const {
    loadMoreButtonRef,
    LoadMoreButton,
    filters,
    filterTerm,
    setFilters,
    resultCount,
    isFetching,
    data,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteScroller({
    initialFilters: {
      search: { value: null },
      photo_album: { value: null, isMulti: true },
      photo_tags: { value: null, isMulti: true },
      order: { value: "desc" },
      orderby: { value: "date" },
      per_page: { value: 26 },
      post_type: { value: "photo" },
    },
    queryID: "photoIndex",
    apiPath: "/photos",
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Meta
        title={
          filterType
            ? `Photos ${
                filterType === "photo_album"
                  ? `in the '${filterTerm.split("|")[1]}' album`
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
      <div className="" data-test-id="photo-index">
        <Filters
          filters={filters}
          onChange={setFilters}
          results={resultCount}
          className="sticky top-0 z-10"
        />
        {isFetching ? (
          <div className="grid lg:grid-cols-4 gap-0 divide-x divide-y divide-gray-800">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((d, ii) => (
              <div
                key={ii}
                className={classNames(
                  "relative aspect-square",
                  {
                    "col-span-2 row-span-2": ii === 4,
                  }
                )}
              >
                <Loader
                  className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2"
                  color="var(--color-gray-600)"
                />
              </div>
            ))}
          </div>
        ) : resultCount > 0 ? (
          <>
            <div
              data-test-id="photo-index-grid-wrapper"
              className="grid lg:grid-cols-4 gap-0"
            >
              {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.data.map((d, ii) => (
                    <PhotoTeaser
                      key={ii}
                      counter={ii}
                      data={helpers.getPhotoMeta(d)}
                      featuredImage={
                        resultCount >= filters.per_page.value &&
                        (ii === 4 || ii === 19)
                      }
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-96">
            No posts found...
          </div>
        )}
        <LoadMoreButton />
      </div>
    </>
  );
}

export default Photos;
