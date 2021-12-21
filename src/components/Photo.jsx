import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import settings from "@/settings";
import helpers from "@/helpers";
import { motion, AnimatePresence } from "framer-motion";

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function Photos({
  num,
  cycle,
  cycleInterval,
  className,
  tag,
  imgStyle,
  placeholder,
}) {
  const [randomPhoto, setRandomPhoto] = React.useState(false);
  const [photoVisible, setPhotoVisible] = React.useState(false);
  const params = {};

  if (tag && Array.isArray(tag)) {
    params.photo_tags = [];
    tag.map((t) => params.photo_tags.push(t));
    params.photo_tags = params.photo_tags.join(",");
  }

  const { isLoading, error, data } = useQuery(
    "photoData",
    () => axios(`${settings.apiBase}/photos`, { params }),
    { refetchOnWindowFocus: false }
  );

  const loadNewImage = () => {
    setPhotoVisible(false);
    const rand = getRandom([...data.data], 1);
    const image = new Image();
    image.src = helpers.postImage(rand[0], "2048x2048")[0];

    image.addEventListener("load", () => {
      setTimeout(() => {
        setRandomPhoto(rand[0]);
        setTimeout(() => {
          setPhotoVisible(true);
        }, 2000);
      }, 2000);
    });
  };

  React.useEffect(async () => {
    let interval;
    if (!isLoading && !error && data && "data" in data) {
      loadNewImage();

      interval = cycle ? setInterval(loadNewImage, cycleInterval) : false;
    }

    return () => (interval ? clearInterval(interval) : null);
  }, [data, tag]);

  if (placeholder && !randomPhoto)
    return (
      <>
        <AnimatePresence>
          <motion.img
            initial={{
              opacity: 1,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.9,
            }}
            exit={{
              opacity: 0,
            }}
            alt="Loading..."
            src={placeholder}
            loading="lazy"
            className={className}
          />
        </AnimatePresence>
      </>
    );

  if (!placeholder && isLoading) return "Loading Photos...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <AnimatePresence>
        {photoVisible && (
          <motion.img
            initial={{
              scale: 1,
              opacity: 0,
            }}
            animate={{
              scale: 1.2,
              opacity: 1,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            exit={{
              scale: 1,
              opacity: 0,
            }}
            alt={helpers.decodeHtml(randomPhoto.title.rendered)}
            src={`${helpers.postImage(randomPhoto, "2048x2048")[0]}`}
            className={className}
          />
        )}
      </AnimatePresence>
    </>
  );
}

Photos.defaultProps = {
  cycle: false,
  num: 1,
  tag: false,
  cycleInterval: 15000,
  imgStyle: "c_fill,w_600",
  placeholder: false,
};

export default React.memo(Photos);
