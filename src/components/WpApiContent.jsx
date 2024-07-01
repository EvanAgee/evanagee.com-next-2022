import parse, { attributesToProps, domToReact } from "html-react-parser";
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import {
  AdvancedImage,
  accessibility,
  responsive,
  lazyload,
  placeholder,
} from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { fill } from "@cloudinary/url-gen/actions/resize";
import Image from "next/image";

const myCld = new Cloudinary({
  cloud: {
    cloudName: "evanagee",
  },
});

function WpApiContent({ content, onGalleryPhotoSelect }) {
  const options = {
    replace: (domNode) => {
      if (!domNode.attribs) return;

      // Correct inline style attributes
      if (false && domNode.attribs.style) {
        const props = attributesToProps(domNode.attribs);
        const Component = domNode.name;
        return <Component {...props} style={props.style} />;
      }

      // External cloudinary links (galleries on posts)
      if (
        domNode.name === "a" &&
        domNode.attribs.href.indexOf("res.cloudinary.com") > 0
      ) {
        return (
          <a
            onClick={(e) => {
              e.preventDefault();
              onGalleryPhotoSelect(domNode.attribs.href);
            }}
            href={null}
          >
            {domToReact(domNode.children, options)}
          </a>
        );
      }

      if (
        domNode.name === "img" &&
        domNode.attribs.src.indexOf("res.cloudinary.com") > 0
      ) {
        const props = attributesToProps(domNode.attribs);
        const src = props.src.replace("w_0", "w_400").replace("h_0", "h_400");
        const lgSrc = props.src
          .replace("w_0", "w_800")
          .replace("h_0,", "")
          .replace("c_fill", "")
          .replace("w_800,", "w_800");
        return (
          <a
            href={lgSrc}
            onClick={(e) => {
              e.preventDefault();
              onGalleryPhotoSelect(lgSrc);
            }}
          >
            <img {...props} loading="lazy" src={src} />
          </a>
        );
      }

      // External links to cloudinary images
      if (domNode.name === "img" && domNode?.attribs["data-public-id"]) {
        const thumbnail = myCld.image(domNode?.attribs["data-public-id"]);
        const fullImage = myCld.image(domNode?.attribs["data-public-id"]);
        thumbnail.resize(fill(500, 500)).format("jpg");
        fullImage.resize(fill().width(1600)).format("jpg");

        const newNode = {
          ...domNode,
          attribs: {
            ...domNode.attribs,
            className: domNode.attribs.class,
            src: `https://res.cloudinary.com/evanagee/images/${
              domNode.attribs["data-transformations"]
            }/v${domNode.attribs["data-version"]}/${domNode.attribs[
              "data-public-id"
            ]
              .split(".")
              .slice(0, -1)
              .join(".")}/${domNode.attribs["data-public-id"].replace(
              "evanagee.com/",
              ""
            )}?_i=AA`,
          },
        };

        delete newNode?.attribs?.onload;
        delete newNode?.attribs?.class;

        return <AdvancedImage cldImg={thumbnail} plugins={[lazyload()]} />;
      }

      if (domNode.name === "iframe") {
        const props = attributesToProps(domNode.attribs);
        return (
          <div
            className={classNames(
              "relative w-full aspect-video",
              css`
                iframe {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                }
              `
            )}
          >
            <iframe {...props} />
          </div>
        );
      }

      // If we want to manipulate the layout of post image galleries
      if (domNode?.attribs?.class?.split(" ")?.includes("wp-block-gallery")) {
        // Default Columns
        // const galleryImages = domNode?.children.filter(c => c.type === 'tag');
        // if (domNode?.attribs?.class?.split(' ')?.includes('columns-default')) {
        //   console.log({galleryImages, math: galleryImages.length % 4})
        //   galleryImages.map(i => {
        //     i.attribs.class === 'border border-primary-500'
        //   })
        // }
      }
    },
  };
  const parsedContent = parse(content, options);
  return parsedContent;
}

export default React.memo(WpApiContent);
