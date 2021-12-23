import React from "react";
import { useRouter } from "next/router";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useInfiniteQuery } from "react-query";
import useBreakpoints from "@/hooks/useBreakpoints";
import axios from "axios";
import settings from "@/settings";
import classNames from "classnames";

function useInfiniteScroller({
  initialFilters,
  apiPath,
  queryID,
  initialData,
}) {
  const loadMoreButtonRef = React.useRef();
  const { breakpoint } = useBreakpoints();
  const router = useRouter();
  const { filterTerm } = router.query;
  const [resultCount, setResultCount] = React.useState(0);
  const [filterType, setFilterType] = React.useState(false);
  const [filters, setFilters] = React.useState(initialFilters);

  React.useEffect(() => {
    setFilters(initialFilters);
    if (router.pathname === "/blog/categories/[filterTerm]") {
      return setFilterType("categories");
    }

    if (router.pathname === "/blog/tags/[filterTerm]") {
      return setFilterType("tags");
    }

    if (router.pathname === "/photos/photo_album/[filterTerm]") {
      return setFilterType("photo_album");
    }

    if (router.pathname === "/photos/photo_tags/[filterTerm]") {
      return setFilterType("photo_tags");
    }

    if (router.pathname === "/portfolio/tags/[filterTerm]") {
      return setFilterType("tags");
    }
  }, [router]);

  const fetchItems = async function ({ pageParam = 0 }) {
    const params = {
      page: pageParam + 1,
    };

    Object.keys(filters).map((key) => {
      params[key] = Array.isArray(filters[key])
        ? filters[key].map((f) => f.value).join(",")
        : "value" in filters[key]
        ? filters[key].value
        : filters[key];
    });

    const data = await axios.get(`${settings.apiBase}${apiPath}`, {
      params: { ...params },
    });

    // Search results
    if (queryID === "searchIndex" && "data" in data) {
      await Promise.all(
        data.data.map(async (d, i) => {
          const additionalData = await axios.get(
            `${settings.apiBase}/${d.subtype}s/${d.id}`,
            {
              params: {
                per_page: 1,
              },
            }
          );

          data.data[i] = {
            ...data.data[i],
            ...additionalData.data,
          };
        })
      );
    }

    return data;
  };

  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery([queryID, filters], fetchItems, {
    getNextPageParam: (lastPage, pages) => {
      return parseInt(lastPage?.headers["x-wp-totalpages"]) >=
        lastPage?.config?.params?.page + 1
        ? lastPage.config.params.page
        : undefined;
    },
    initialData,
  });

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    threshold: 1,
  });

  React.useEffect(() => {
    if (!isLoading && !error && data && "pages" in data) {
      setResultCount(data?.pages[data.pages.length - 1]?.headers["x-wp-total"]);
    }
  }, [data, isLoading, error]);

  React.useEffect(() => {
    if (!filterType || !filterTerm) return;
    setFilters({
      ...filters,
      [filterType]: {
        value: parseInt(filterTerm.split("|")[0]),
        label: filterTerm.split("|")[1],
      },
    });
  }, [filterType, filterTerm]);

  function LoadMoreButton() {
    return (
      <div className="flex items-center justify-center py-16">
        <button
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={classNames(
            "border-4 border-gray-200 rounded-md font-display uppercase font-bold px-4 py-2 text-sm text-gray-300"
          )}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : `No more posts, is your ${
                breakpoint.isLgUp ? "mouse" : "finger"
              } tired?`}
        </button>
      </div>
    );
  }

  return {
    filters,
    setFilters,
    resultCount,
    filterType,
    filterTerm,
    loadMoreButtonRef,
    LoadMoreButton,
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    goodToGo: !isLoading && !error && data && "pages" in data,
  };
}

useInfiniteScroller.defaultProps = {
  initialFilters: {
    order: { value: "desc" },
    orderby: { value: "date" },
    per_page: { value: settings.apiSettings.perPageInfinite },
  },
  initialData: [],
};

export default useInfiniteScroller;
