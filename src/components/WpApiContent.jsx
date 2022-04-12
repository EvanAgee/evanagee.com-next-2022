import parse, { attributesToProps, domToReact } from "html-react-parser";

import React from "react";
import { css } from "@emotion/css";
import { dom } from "@fortawesome/fontawesome-svg-core";

const options = {
  replace: (domNode) => {
    if (!domNode.attribs) return;

    // Correct inline style attributes
    if (domNode.attribs.style) {
      const props = attributesToProps(domNode.attribs);
      const Component = domNode.name;
      return <Component {...props} />;
    }

    // External cloudinary links (galleries on posts)
    if (domNode.name === "a" && domNode.attribs.href.indexOf("res.cloudinary.com")) {
      const props = attributesToProps(domNode.attribs);
      return <a {...props} target="_blank">{domToReact(domNode.children, options)}</a>
    }

    // External links to cloudinary images
    if (domNode.name === "img" && domNode?.attribs['data-public-id']) {
      const newNode = {
        ...domNode,
        attribs: {
          ...domNode.attribs,
          className: domNode.attribs.class,
          src: `https://res.cloudinary.com/evanagee/images/${domNode.attribs['data-transformations']}/v${domNode.attribs['data-version']}/${domNode.attribs['data-public-id'].split('.').slice(0, -1).join('.')}/${domNode.attribs['data-public-id'].replace('evanagee.com/','')}?_i=AA`
        }
      }
      delete newNode?.attribs?.onload;
      delete newNode?.attribs?.class;
      return <img {...newNode.attribs} />;
    }

    if (domNode.name === "iframe") {
      const props = attributesToProps(domNode.attribs);
      return (
        <div
          className={css`
            position: relative;
            width: 100%;
            padding-bottom: 56.25%;

            iframe {
              position: absolute;
              width: 100%;
              height: 100%;
            }
          `}
        >
          <iframe {...props} />
        </div>
      );
    }

    // If we want to manipulate the layout of post image galleries
    if (domNode?.attribs?.class?.split(' ')?.includes('wp-block-gallery')) {
      // console.log(domNode)
    }

  },
};

function WpApiContent({ content }) {
  const parsedContent = parse(content, options);
  return parsedContent;
}

export default React.memo(WpApiContent);
