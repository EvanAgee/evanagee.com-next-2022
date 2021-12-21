import React from "react";
import { css } from "@emotion/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import classNames from "classnames";
import useBreakpoints from "@/hooks/useBreakpoints";
import useMatchHeight from "@/hooks/useMatchHeight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "swiper/css";
import "swiper/css/pagination";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

function SlickArrow({ dir, className, style, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "absolute top-6 transform text-white z-50 bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg",
        className,
        {
          "left-6": dir === "prev",
          "right-6": dir === "next",
        },
        css`
          z-index: 999999;
          &.swiper-button-disabled {
            opacity: 0;
            pointer-events: none;
          }
        `
      )}
    >
      <FontAwesomeIcon
        size="2x"
        icon={["fal", dir === "next" ? "angle-right" : "angle-left"]}
      />
    </button>
  );
}

function Carousel({
  children,
  slidesToShow,
  theme,
  "data-cy": dataCy,
  useScrim,
  className,
}) {
  const { ref, updateMatchedHeights } = useMatchHeight();
  const [showLeftScrim, setShowLeftScrim] = React.useState(false);
  const [showRightScrim, setShowRightScrim] = React.useState(useScrim);
  const { breakpoint, mediaQueries } = useBreakpoints();

  const updateScrims = function (swiper) {
    setShowRightScrim(useScrim && !swiper.isEnd);
    setShowLeftScrim(useScrim && !swiper.isBeginning);
  };

  return (
    <div
      className={classNames(
        "relative border-t border-b border-gray-300",
        className
      )}
      data-cy={dataCy}
    >
      <Swiper
        ref={ref}
        slidesPerView={slidesToShow}
        spaceBetween={0}
        navigation={{
          nextEl: ".carousel-next",
          prevEl: ".carousel-prev",
        }}
        pagination={{
          clickable: true,
        }}
        onAfterInit={(s) => {
          updateScrims(s);
          updateMatchedHeights();
        }}
        onResize={() => {
          updateMatchedHeights();
        }}
        onActiveIndexChange={(s) => {
          updateScrims(s);
        }}
        className={classNames(
          "carousel select-none max-w-full",
          {
            "carousel--scrimLeft": showLeftScrim,
            "carousel--scrimRight": showRightScrim,
          },
          css`
            overflow: visible !important;

            ${mediaQueries.lg} {
              // padding-bottom: 0 !important;
              // overflow: hidden !important;
            }

            &:before,
            &:after {
              position: absolute;
              z-index: 2;
              width: 25%;
              top: 0;
              height: 100%;
              pointer-events: none;
              opacity: 0;
              will-change: opacity;
              transition: opacity 0.3s ease;

              ${mediaQueries.lg} {
                content: "";
              }
            }

            &.carousel--scrimLeft {
              &:before {
                opacity: 1;
                left: 0;
                background: linear-gradient(
                  to right,
                  rgba(255, 255, 255, 1),
                  rgba(255, 255, 255, 0)
                );
              }
            }

            &.carousel--scrimRight {
              &:after {
                opacity: 1;
                right: 0;
                background: linear-gradient(
                  to left,
                  rgba(255, 255, 255, 1),
                  rgba(255, 255, 255, 0)
                );
              }
            }

            .swiper-wrapper {
              align-items: stretch;
            }

            .swiper-pagination {
              bottom: 1.75rem !important;
            }

            .swiper-slide {
              width: auto;
              height: 100%;
              min-height: 100%;
              border-right: 1px solid var(--color-gray-300);
            }

            .swiper-pagination {
              .swiper-pagination-bullet {
                width: 10px;
                height: 10px;
                background-color: ${theme === "light"
                  ? "var(--color-primary-500)"
                  : "var(--color-primary-800)"};
              }
            }

            .swiper-horizontal
              > .swiper-pagination-bullets
              .swiper-pagination-bullet,
            .swiper-pagination-horizontal.swiper-pagination-bullets
              .swiper-pagination-bullet {
              margin: 0 8px;
            }
          `
        )}
      >
        {children.map((c, i) => (
          <SwiperSlide key={i}>{c}</SwiperSlide>
        ))}
      </Swiper>
      {breakpoint.isLgUp && <SlickArrow className="carousel-prev" dir="prev" />}
      {breakpoint.isLgUp && <SlickArrow className="carousel-next" dir="next" />}
    </div>
  );
}

Carousel.defaultProps = {
  slidesToShow: 1,
  theme: "dark",
  useScrim: false,
};

export default Carousel;
