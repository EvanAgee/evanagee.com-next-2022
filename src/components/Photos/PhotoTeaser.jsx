import React from "react";
import { css } from "@emotion/css";
import Link from "next/link";
import classNames from "classnames";
import helpers from "@/helpers";
import moment from "moment";
import WpApiContent from "@/components/WpApiContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBreakpoints from "@/hooks/useBreakpoints";

function PhotoTeaser({ data, counter, featuredImage, showDetails }) {
  const { breakpoint } = useBreakpoints();
  const [hovered, setHovered] = React.useState(showDetails);
  const image = React.useMemo(() => {
    return helpers.postImage(data, featuredImage ? "large" : "medium_large");
  }, [data, featuredImage]);
  return (
    <Link href={`/photos/${data.slug}`}>
      <div
        onMouseEnter={() => (!showDetails ? setHovered(true) : null)}
        onMouseLeave={() => (!showDetails ? setHovered(false) : null)}
        className={classNames(
          "relative text-white text-center",
          { "col-span-2 row-span-2": featuredImage },
          css`
            padding-bottom: 100%;
          `
        )}
      >
        <a className="absolute inset-0 overflow-hidden group">
          {image ? (
            <>
              <img
                alt={helpers.decodeHtml(data.title.rendered)}
                loading="lazy"
                src={image[0]}
                width={image[1]}
                height={image[2]}
                className={classNames(
                  "inset-0 absolute object-cover w-full h-full object-center",
                  {
                    "grayscale group-hover:grayscale-0 transition duration-500":
                      showDetails,
                  }
                )}
              />
              {/* Photo deatils overlay */}
              <div
                className={classNames(
                  "absolute top-0 left-0 w-full h-full flex flex-col p-6 transform transition-transform ease-in-out duration-300 bg-gradient-to-t from-primary-500",
                  {
                    "translate-x-0": hovered,
                    "translate-x-full": !hovered,
                    "from-primary-500": featuredImage,
                    "transition group-hover:opacity-0": showDetails,
                  }
                )}
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div
                    className={classNames("up-title text-shadow", {
                      "up-title-sm": breakpoint.isMdDown,
                    })}
                  >
                    <WpApiContent content={data.title.rendered} />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <FontAwesomeIcon
                      className="mr-1"
                      icon={["far", "calendar-alt"]}
                    />
                    {moment(data.dateTaken).fromNow()}
                  </div>
                  <ul className="flex items-center justify-end m-0">
                    {data.ea_photo_tags.length > 0 && (
                      <li className="mr-4">
                        <FontAwesomeIcon
                          className="mr-1"
                          icon={["fas", "tag"]}
                        />{" "}
                        {data.ea_photo_tags.length}
                      </li>
                    )}
                    {data.ea_photo_albums.length > 0 && (
                      <li>
                        <FontAwesomeIcon
                          className="mr-1"
                          icon={["fas", "book-open"]}
                        />{" "}
                        {data.ea_photo_albums.length}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </>
          ) : null}
        </a>
      </div>
    </Link>
  );
}

PhotoTeaser.defaultProps = {
  showDetails: false,
};

export default React.memo(PhotoTeaser);
