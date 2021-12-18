import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import settings from "@/settings";
// import { Link, useHistory } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import Post from "@/components/Blog/Post";
import helpers from "@/helpers";
import GridWrapper from "@/components/GridWrapper";
import Loader from "@/components/Loaders/Loader";
import WpApiContent from "@/components/WpApiContent";
import ProjectTeaser from "@/components/Projects/ProjectTeaser";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";

const RecentPosts = ({
  postType,
  style,
  count,
  cardStyle,
  containerClassName,
  columns,
}) => {
  let history = useRouter();
  const { isLoading, error, data } = useQuery(
    ["recentPostData", postType, count],
    () =>
      axios.get(`${settings.apiBase}/${postType}`, {
        params: {
          page: 1,
          per_page: count,
        },
      })
  );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {style === "list" ? (
        <ul>
          {data.data.map((d, i) => (
            <li
              className="mb-2 pb-2 last:mb-0 border-b border-gray-200 last:border-b-0"
              key={`post-${i}`}
            >
              <Link href={`blog/${d.slug}`}>
                <a>
                  <WpApiContent content={d.title.rendered} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : isLoading ? (
        <GridWrapper
          className={containerClassName}
          wrapItems={postType === "photos" ? false : true}
          columns={columns}
        >
          {[...Array(count)].map((i, ii) => (
            <Loader key={ii} className="py-6 lg:py-16" />
          ))}
        </GridWrapper>
      ) : (
        <GridWrapper
          className={containerClassName}
          wrapItems={postType === "photos" ? false : true}
          columns={columns}
        >
          {data.data.map((d, i) => (
            <React.Fragment key={i}>
              {postType === "projects" ? (
                <ProjectTeaser
                  data={d}
                  onClick={() => history.push("/portfolio")}
                />
              ) : postType === "photos" ? (
                <PhotoTeaser
                  key={i}
                  data={helpers.getPhotoMeta(d)}
                  showDetails={true}
                />
              ) : (
                <Post style={cardStyle} data={d} />
              )}
            </React.Fragment>
          ))}
        </GridWrapper>
      )}
    </>
  );
};

RecentPosts.defaultProps = {
  style: "list",
  count: 5,
  cardStyle: "small",
  postType: "posts",
  useRef: false,
  columns: 2,
};

export default React.memo(RecentPosts);
