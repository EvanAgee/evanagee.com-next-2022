import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import Post from "@/components/Blog/Post";
import ProjectTeaser from "@/components/Projects/ProjectTeaser";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";
import GridWrapper from "@/components/GridWrapper";
import useBreakpoints from "@/hooks/useBreakpoints";
import Badge from "@/components/Badge";
import helpers from "@/helpers";
import { useRouter } from "next/router";

function PrevNext({ data }) {
  const router = useRouter();

  // When the left and right arrow keys are pushed navigate to the previous or next post
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "ArrowLeft" && data?.previous) {
        router.push(helpers.generatePostURL(data.previous));
      } else if (e.key === "ArrowRight" && data?.next) {
        router.push(helpers.generatePostURL(data.next));
      }
    },
    [data?.previous?.slug, data?.next?.slug, router.pathname]
  );

  React.useEffect(() => {
    window.addEventListener("keyup", handleKeyDown);
    return () => window.removeEventListener("keyup", handleKeyDown);
  }, []);

  return (
    <footer className="select-none">
      <GridWrapper wrapItems={false}>
        {["previous", "next"].map((which, i) => (
          <div key={i} className={classNames("relative")}>
            {data[which] && (
              <article
                className={classNames("", {
                  "": data.type === "post",
                })}
              >
                <Badge>{`${which} ${data.type}`}</Badge>
                {data.type === "photo" ? (
                  <Post
                    data={data[which]}
                    style="mini"
                    showImage={true}
                    side={which}
                  />
                ) : data.type === "project" ? (
                  <Post
                    data={data[which]}
                    style="mini"
                    showImage={true}
                    side={which}
                  />
                ) : (
                  // <div className="p-6 xl:p-16">
                  //   <ProjectTeaser data={data[which]} />
                  // </div>
                  <Post
                    data={data[which]}
                    style="mini"
                    showImage={true}
                    side={which}
                  />
                )}
              </article>
            )}
          </div>
        ))}
      </GridWrapper>
    </footer>
  );
}

PrevNext.defaultProps = {
  type: "Post",
};

export default React.memo(PrevNext);
