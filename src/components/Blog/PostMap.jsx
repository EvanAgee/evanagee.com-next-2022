import React, { Suspense } from "react";
import { css } from "@emotion/css";
import classNames from "classnames";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

function PostMap({ lat, lng, zoom, title, className }) {
  const [viewport, setViewport] = React.useState({
    latitude: Number(lat),
    longitude: Number(lng),
    zoom: zoom ? Number(zoom) : 6,
  });

  React.useEffect(() => {
    setViewport({
      latitude: Number(lat),
      longitude: Number(lng),
      zoom: zoom ? Number(zoom) : 6,
    })
  }, [lat, lng, zoom]);

  return (
    <div className={classNames("[height:40vh] lg:[height:50vh] mx-auto overflow-hidden relative", className)}>
      <ReactMapGL
        {...viewport}
        width="100%"
        attributionControl={false}
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiZXZhbmFnZWUiLCJhIjoiY2p3dTIxcGUzMHBiMjRhbXFwcHZ3aDd3dSJ9.Em5VUywB66v7GShAIRyYmw"
        className={css`
          .mapboxgl-ctrl {
            display: none !important;
          }
        `}
      >
        <Marker longitude={Number(lng)} latitude={Number(lat)}>
          <svg
            height={SIZE}
            viewBox="0 0 24 24"
            style={{
              cursor: "pointer",
              fill: `var(--color-primary-500)`,
              stroke: "none",
              transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
            }}
            onClick={() => onClick(city)}
          >
            <path d={ICON} />
          </svg>
        </Marker>

        <Popup
          tipSize={5}
          anchor="top"
          longitude={Number(lng)}
          latitude={Number(lat)}
          closeOnClick={false}
          offsetTop={5}
          className={
            ("text-gray-500 ",
            css`
              pointer-events: none;
              .mapboxgl-popup-content {
                border-radius: 0.5rem;
                padding: 1.5rem;
                box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.2);
                background-color: rgb(255, 255, 255);
                color: #414042;
              }

              .mapboxgl-popup-close-button {
                color: inherit;
                margin-top: 0;
                margin-right: 5px;
                display: none;
              }

              &.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
              &.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip,
              &.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
                border-bottom-color: rgb(255, 255, 255);
              }

              &.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
                border-left-color: rgb(255, 255, 255);
              }

              &.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
                border-top-color: rgb(255, 255, 255);
              }

              &.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
                border-right-color: rgb(255, 255, 255);
              }
            `)
          }
        >
          <h3>{title}</h3>
        </Popup>
        <NavigationControl
          showCompass={false}
          className={css`
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            max-width: 29px;
            z-index: 10000;
          `}
        />
      </ReactMapGL>
    </div>
  );
}

export default PostMap;
