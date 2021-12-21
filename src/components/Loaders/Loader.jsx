import React from "react";
import { css } from "@emotion/css";
import classNames from "classnames";

function Loader({ type, color, className }) {
  const spinner = React.useMemo(() => {
    switch (type) {
      case "dots":
      case "pageLoader":
        return (
          <div
            className={css`
              margin: 0 auto 0;
              width: 70px;
              text-align: center;

              & > div {
                width: 18px;
                height: 18px;
                background-color: ${color};

                border-radius: 100%;
                display: inline-block;
                -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
                animation: sk-bouncedelay 1.4s infinite ease-in-out both;
              }

              .bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
              }

              .bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
              }

              @-webkit-keyframes sk-bouncedelay {
                0%,
                80%,
                100% {
                  -webkit-transform: scale(0);
                }
                40% {
                  -webkit-transform: scale(1);
                }
              }

              @keyframes sk-bouncedelay {
                0%,
                80%,
                100% {
                  -webkit-transform: scale(0);
                  transform: scale(0);
                }
                40% {
                  -webkit-transform: scale(1);
                  transform: scale(1);
                }
              }
            `}
          >
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        );
    }
  }, [type]);
  return (
    <div className={classNames("flex items-center justify-center", className)}>
      {spinner}
    </div>
  );
}

Loader.defaultProps = {
  type: "pageLoader",
  color: "var(--color-gray-300)",
};

export default Loader;
