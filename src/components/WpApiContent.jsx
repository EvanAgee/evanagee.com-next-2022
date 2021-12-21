import React from "react";
import parse, { attributesToProps } from "html-react-parser";
import { css } from "@emotion/css";

const options = {
  replace: (domNode) => {
    if (!domNode.attribs) {
      return;
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
  },
};

function WpApiContent({ content }) {
  return parse(content, options);
}

export default React.memo(WpApiContent);
