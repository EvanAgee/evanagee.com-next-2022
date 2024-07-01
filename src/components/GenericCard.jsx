import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import helpers from "@/helpers";
import WpApiContent from "@/components/WpApiContent";
import TagList from "@/components/TagList";

function GenericCard({
  image,
  imageStyle,
  title,
  date,
  subtitle,
  content,
  tags,
  collapseContent = false,
}) {
  return (
    <article>
      <div className="relative matchHeight flex flex-col justify-end items-center pt-12">
        {image && (
          <img
            src={image}
            alt={`${helpers.decodeHtml(title)}`}
            height="100"
            width="auto"
            className={classNames("mx-auto h-auto max-w-[50%]")}
            style={imageStyle}
          />
        )}
      </div>
      <div className="pt-6 mx-auto max-w-xl text-center px-4">
        <div className={classNames({ matchHeight: content })}>
          <h3 className="post-title uppercase mx-auto flex items-center justify-center text-xl lg:text-2xl leading-none lg:leading-tight xl:max-w-sm lg:max-w-xs">
            <WpApiContent content={title} />
          </h3>
          <time className="block text-sm font-normal text-gray-400 italic mb-4">
            {helpers.decodeHtml(date)}
          </time>

          {tags && (
            <div className="my-6">
              <TagList
                className="justify-center"
                items={tags.map((t, i) => ({
                  name: t.name,
                  link: t.link,
                }))}
              />
            </div>
          )}

          <div className={classNames("prose text-left")}>
            {collapseContent ? (
              <ExpandingContent>
                <WpApiContent content={content} />
              </ExpandingContent>
            ) : (
              <WpApiContent content={content} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default React.memo(GenericCard);

const ExpandingContent = ({ children, className }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      <div
        className={classNames("overflow-hidden relative transition-all", {
          "max-h-[20000px]": expanded,
          "max-h-[200px]": !expanded,
        })}
      >
        {children}

        <div
          className={classNames(
            "absolute w-full bottom-0 bg-gradient-to-b from-transparent to-white h-[100px] transition-opacity",
            {
              "opacity-0": expanded,
            }
          )}
        />
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary text-sm underline text-center mx-auto flex"
      >
        Show {expanded ? "less" : "more"}
      </button>
    </div>
  );
};
