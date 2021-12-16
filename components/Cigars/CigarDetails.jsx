import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import helpers from "@/helpers";
import TagList from "@/components/TagList";

function CigarDetails({ cigar }) {
  return (
    <div>
      <div className="p-16">
        <h1 className="text-3xl lg:text-6xl mb-6 text-white">
          {cigar.title.rendered}
        </h1>
        <TagList items={cigar.acf.brand} />
        <div>{cigar.content.rendered}</div>
      </div>
      <div className="w-full grid grid-cols-4">
        {cigar.acf.images.length > 0 &&
          cigar.acf.images.map((image, i) => (
            <div
              className={classNames(
                "relative",
                css`
                  padding-bottom: 100%;
                `
              )}
            >
              <img
                alt={helpers.decodeHtml(cigar.title.rendered)}
                className="inset-0 absolute object-cover w-full h-full object-center m-0"
                src={image.sizes.medium}
              />
            </div>
          ))}
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="flex items-center justify-center">
          <a
            className="mt-16 button button-reversed button-white"
            href={`https://blog.evanagee.com/wp-admin/post.php?post=${cigar.id}&action=edit`}
            target="_blank"
          >
            Edit Cigar
          </a>
        </div>
      )}
    </div>
  );
}

export default CigarDetails;
