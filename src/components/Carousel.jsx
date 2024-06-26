import React from "react";
import { css } from "@emotion/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";
import classNames from "classnames";
import useBreakpoints from "@/hooks/useBreakpoints";
import useMatchHeight from "@/hooks/useMatchHeight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

function SlickArrow({ dir, className, style, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "hidden lg:flex absolute top-6 transform text-white z-50 bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
        className,
        {
          "left-6": dir === "prev",
          "right-6": dir === "next",
        }
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
  swiperClassName,
  showDots,
  separated,
  autoplay = false,
}) {
  const { ref, updateMatchedHeights } = useMatchHeight();
  const [showLeftScrim, setShowLeftScrim] = React.useState(false);
  const [showRightScrim, setShowRightScrim] = React.useState(useScrim);
  const { mediaQueries } = useBreakpoints();
  const random = Math.round(Math.random() * (10000000000000 - 1) + 1);

  const updateScrims = function (swiper) {
    setShowRightScrim(useScrim && !swiper.isEnd);
    setShowLeftScrim(useScrim && !swiper.isBeginning);
  };

  return (
    <div
      className={classNames(
        "relative overflow-hidden border-y border-gray-200 dark:border-gray-800",
        className,
        {
          separated: separated,
        }
      )}
      data-cy={dataCy}
      ref={ref}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={false}
        autoplay={
          autoplay && {
            delay: 5000,
          }
        }
        slidesPerView={slidesToShow}
        slidesPerGroup={slidesToShow}
        spaceBetween={0}
        navigation={{
          nextEl: `.carousel-next-${random}`,
          prevEl: `.carousel-prev-${random}`,
        }}
        pagination={
          showDots
            ? {
                clickable: true,
              }
            : false
        }
        onAfterInit={(s) => {
          updateScrims(s);
          // updateMatchedHeights();
        }}
        onResize={() => {
          // updateMatchedHeights();
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

            .swiper-pagination {
              bottom: 1.75rem;

              .swiper-pagination-bullet {
                border-radius: 0;
                width: 20px;
                height: 5px;
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
              ${"" /* margin: 0 8px; */}
            }
          `,
          swiperClassName
        )}
      >
        {children.map((c, i) => (
          <SwiperSlide key={i}>{c}</SwiperSlide>
        ))}
      </Swiper>
      <SlickArrow className={`carousel-prev-${random}`} dir="prev" />
      <SlickArrow className={`carousel-next-${random}`} dir="next" />
    </div>
  );
}

Carousel.defaultProps = {
  slidesToShow: 1,
  theme: "dark",
  useScrim: false,
  showDots: true,
  separated: true,
};

export default Carousel;
