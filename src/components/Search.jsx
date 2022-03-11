import React, { useEffect } from "react";

import BadgeWrapper from "@/components/BadgeWrapper";
import GridWrapper from "@/components/GridWrapper";
import Loader from "@/components/Loaders/Loader";
import PageLoader from "@/components/Loaders/PageLoader";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";
import Post from "@/components/Blog/Post";
import PostGridWrapper from "@/components/Blog/PostGridWrapper";
import ProjectTeaser from "@/components/Projects/ProjectTeaser";
import classNames from "classnames";
import debounce from "lodash.debounce";
import helpers from "@/helpers";
import useInfiniteScroller from "@/hooks/useInfiniteScroller";

const filterTypes = [
  {
    label: "Blog Posts",
    state: {
      type: { value: "post" },
      subtype: { value: "post" },
    },
  },
  {
    label: "Projects",
    state: {
      type: { value: "post" },
      subtype: { value: "project" },
    },
  },
  {
    label: "Photos",
    state: {
      type: { value: "post" },
      subtype: { value: "photo" },
    },
  },
];

const postTypeDisplay = {
  post: "Blog Post",
  project: "Project",
  photo: "Photo",
};

export default function Search({ term }) {
  const search = React.useRef(null);
  const {
    loadMoreButtonRef,
    LoadMoreButton,
    filters,
    setFilters,
    resultCount,
    isLoading,
    data,
    isFetchingNextPage,
    hasNextPage,
    goodToGo,
  } = useInfiniteScroller({
    initialFilters: {
      search: { value: term ? term : "" },
      type: { value: null },
      subtype: { value: null },
      per_page: { value: 6 },
    },
    queryID: "searchIndex",
    apiPath: "/search",
  });

  const changeHandler = (e) => {
    setFilters({
      ...filters,
      search: {
        value: e.target.value,
      },
    });
  };

  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 100),
    []
  );

  const filterIsActive = function (f) {
    return (
      filters.type.value === f.state.type.value &&
      filters.subtype.value === f.state.subtype.value
    );
  };

  useEffect(() => {
    search.current.focus();
  }, []);

  return (
    <div className="search">
      <div className="relative">
        <input
          ref={search}
          type="search"
          className="font-display w-full bg-gradient-to-t from-gray-100 to-white px-8 py-6 border-b border-gray-300 focus:outline-none text-black font-normal text-2xl placeholder-black"
          placeholder="Search..."
          value={term ? term : ""}
          onChange={debouncedChangeHandler}
        />
        <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
          {isLoading ? (
            <Loader className="transform scale-50" />
          ) : filters.search.value ? (
            <>
              <strong>
                {filters.search.value && goodToGo ? resultCount : 0}
              </strong>{" "}
              Results Found
            </>
          ) : null}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex gap-6 py-8">
          {filterTypes.map((f) => (
            <button
              key={f.label}
              disabled={!filters.search.value}
              className={classNames(
                "bg-gray-400 py-2 px-3 rounded-md font-display uppercase font-extrabold tracking-widest text-sm text-white",
                {
                  "bg-primary-500 ": filterIsActive(f),
                }
              )}
              onClick={() =>
                filterIsActive(f)
                  ? setFilters({
                      ...filters,
                      type: { value: null },
                      subtype: { value: null },
                    })
                  : setFilters({
                      ...filters,
                      ...f.state,
                    })
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : filters.search.value && goodToGo && resultCount > 0 ? (
        <>
          {data.pages.map((group, i) => (
            <GridWrapper key={i} largeFirst={false} wrapItems={false}>
              {group.data
                .filter((d) => ["post", "photo", "project"].includes(d.subtype))
                .map((d, ii) => (
                  <BadgeWrapper key={ii} title={postTypeDisplay[d.subtype]}>
                    {d.type === "post" && d.subtype === "post" ? (
                      <PostGridWrapper largeFirst={false} key={ii} counter={ii}>
                        <Post data={d} style={"small"} />
                      </PostGridWrapper>
                    ) : d.subtype === "photo" ? (
                      <PhotoTeaser
                        key={ii}
                        data={helpers.getPhotoMeta(d)}
                        showDetails={true}
                      />
                    ) : d.subtype === "project" ? (
                      <PostGridWrapper largeFirst={false} key={ii} counter={ii}>
                        <ProjectTeaser data={d} />
                      </PostGridWrapper>
                    ) : null}
                  </BadgeWrapper>
                ))}
            </GridWrapper>
          ))}
          <LoadMoreButton />
        </>
      ) : resultCount < 1 ? (
        <div className="flex justify-center items-center h-96 text-2xl">
          No Results Found...
        </div>
      ) : (
        <div className="flex justify-center items-center h-96 text-2xl text-center">
          Enter your search term above to get started
        </div>
      )}
    </div>
  );
}
