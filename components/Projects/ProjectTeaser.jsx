import React from "react";
import { css } from "@emotion/css";
import Link from "next/link";
import classNames from "classnames";
import helpers from "@/helpers";
import WpApiContent from "@/components/WpApiContent";
import TagList from "@/components/TagList";
import { motion } from "framer-motion";

function ProjectTeaser({ data }) {
  const image = React.useMemo(() => {
    return helpers.postImage(data, "large");
  }, [data]);

  return (
    <Link href={`/portfolio/${data.slug}`}>
      <a
        className={classNames(
          "text-inherit block",
          css`
            .badge-wrapper & {
              padding-top: var(--p-4);
            }
          `
        )}
      >
        <motion.div
          className="relative cursor-pointer rounded-2xl shadow-lg overflow-hidden mx-auto pb-16x9"
          style={{}}
        >
          <img
            loading="lazy"
            width={image[1]}
            height={image[2]}
            src={image[0]}
            alt={`${helpers.decodeHtml(
              data.title.rendered
            )} project screenshot`}
            className={classNames(
              "inset-0 absolute object-cover w-full h-full object-top"
            )}
          />
        </motion.div>
        <div className="pt-6 mx-auto max-w-xl text-center px-4">
          <div className={classNames({ matchHeight: data.content.rendered })}>
            <h3 className="post-title uppercase mx-auto flex items-center justify-center text-xl lg:text-2xl leading-none lg:leading-tight xl:max-w-sm lg:max-w-xs cursor-pointer">
              <WpApiContent content={data.title.rendered} />
            </h3>
            <time className="text-sm font-normal text-gray-400 italic ml-2">
              cir. {helpers.formatDate(data.date, "yyyy")}
            </time>
            <WpApiContent content={data.excerpt.rendered} />
          </div>
          {"ea_tags" in data && (
            <div className="my-6">
              <TagList
                className="justify-center"
                items={data.ea_tags.map((t, i) => ({
                  name: t.name,
                  link: `/portfolio/tags/${t.term_id}|${t.name}`,
                }))}
              />
            </div>
          )}

          {false && "project_url" in data.acf && data.acf.project_url !== "" && (
            <a
              className="button button-xs button-reversed"
              rel="noopener noreferrer"
              href={data.acf.project_url}
              target="_blank"
            >
              Visit Project
            </a>
          )}
        </div>
      </a>
    </Link>
  );
}

export default React.memo(ProjectTeaser);
