import React from "react";
import dynamic from "next/dynamic";
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
import axios from "axios";
const Filters = dynamic(() => import("@/components/Filters"));

export default function BlogIndex({ posts, filterType }) {
  const { breakpoint } = useBreakpoints();
  const {
    LoadMoreButton,
    filters,
    filterTerm,
    setFilters,
    resultCount,
    isLoading,
    data,
    error,
  } = useInfiniteScroller({
    initialFilters: {
      search: { value: null },
      categories: { value: null, isMulti: true, showCounts: true },
      tags: {
        value: null,
        querySlug: "posts/tags",
        isMulti: true,
        showCounts: false,
      },
      order: { value: "desc" },
      orderby: { value: "date" },
      per_page: { value: settings.apiSettings.perPageInfinite },
      post_type: { value: "post" },
    },
    initialData: posts,
    queryID: "blogIndex",
    apiPath: "/posts",
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <div data-test-id="blog-index">
      <Meta
        title={
          filterType
            ? `Blog posts ${
                filterType === "categories"
                  ? `in the '${filterTerm.split("|")[1]}' category`
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
      {false && posts && (
        <GridWrapper data-test-id="blog-index-grid-wrapper" largeFirst={true}>
          {posts.map((d, ii) => (
            <Post key={ii} data={d} style={ii === 0 ? "large" : "small"} />
          ))}
        </GridWrapper>
      )}

      {isLoading ? (
        <GridWrapper largeFirst={true}>
          {[1, 2, 3].map((d, ii) => (
            <Loader key={ii} className={ii === 0 ? "lg:pt-32" : "lg:py-32"} />
          ))}
        </GridWrapper>
      ) : resultCount > 0 && data?.pages ? (
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
      <LoadMoreButton />
    </div>
  );
}


export async function getStaticProps(context) {
  const posts = await axios.get(`${settings.apiBase}/posts`, {
    params: {
      order: "desc",
      orderby: "date",
      per_page: settings.apiSettings.perPageInfinite,
      post_type: "post",
    },
  });

  return {
    props: {
      posts: {
        data: posts.data,
        pages: posts?.pages || []
      }
    },
    revalidate: settings.ISRrevalidate,
  };
}