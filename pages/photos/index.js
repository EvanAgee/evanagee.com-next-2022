import React, { useContext } from "react";
import classNames from "classnames";
import useBreakpoints from "@/hooks/useBreakpoints";
import Loader from "@/components/Loaders/Loader";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";
import { css } from "@emotion/css";
import { HeaderContext } from "@/context/HeaderContext";
import useInfiniteScroller from "@/hooks/useInfiniteScroller";
import helpers from "@/helpers";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Filters = dynamic(() => import("@/components/Photos/Filters"));

function Photos() {
  const location = useRouter();
  const { setPageTitle } = useContext(HeaderContext);
  const { breakpoint } = useBreakpoints();
  const {
    loadMoreButtonRef,
    filters,
    filterType,
    filterTerm,
    setFilters,
    resultCount,
    isLoading,
    data,
    perPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    goodToGo,
  } = useInfiniteScroller({
    initialFilters: {
      photo_album: { value: null },
      photo_tags: { value: null },
      order: { value: "desc" },
      orderby: { value: "date" },
      per_page: { value: 26 },
    },
    queryID: "photoIndex",
    apiPath: "/photos",
  });

  React.useEffect(() => {
    if (!filterType || !filterTerm) return;
    setTimeout(() => {
    setPageTitle(
      `Photos ${
        filterType === "photo_album"
          ? `in the ${filterTerm.split("|")[1]} album`
          : `tagged with ${filterTerm.split("|")[1]}`
      }`
    );
    }, 500);
  }, [filterType, filterTerm, location]);

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="" data-test-id="photo-index">
      <Filters
            filters={filters}
            onChange={setFilters}
            results={resultCount}
            className="sticky top-0 z-10"
          />
        {isLoading ? (
          <div className="grid lg:grid-cols-4 gap-0 divide-x divide-y divide-gray-800">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((d, ii) => (
              <div
                key={ii}
                className={classNames(
                  "relative",
                  {
                    "col-span-2 row-span-2": ii === 4,
                  },
                  css`
                    padding-bottom: 100%;
                  `
                )}
              >
                <Loader className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2" color="var(--color-gray-600)" />
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

        <div className="flex items-center justify-center py-16">
          <button
            ref={loadMoreButtonRef}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className={classNames(
              "button button-white button-reversed button-sm"
            )}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "No more photos, is your finger tired?"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Photos;
