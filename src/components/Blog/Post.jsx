import React from "react";
import helpers from "@/helpers";
import PostMini from "@/components/Blog/Post/PostMini";
import PostSmall from "@/components/Blog/Post/PostSmall";
import PostTeaser from "@/components/Blog/Post/PostTeaser";
import PostLarge from "@/components/Blog/Post/PostLarge";
import PostFull from "@/components/Blog/Post/PostFull";
function Post({ data, style, showImage, side }) {
  const image = React.useMemo(() => {
    return helpers.postImage(
      data,
      style === "small" || style === "teaser" ? "medium_large" : "full"
    );
  }, [data, style]);

  if (style === "mini")
    return (
      <PostMini data={data} image={image} showImage={showImage} side={side} />
    );

  if (style === "small")
    return (
      <PostSmall data={data} image={image} showImage={showImage} side={side} />
    );

  if (style === "teaser")
    return (
      <PostTeaser data={data} image={image} showImage={showImage} side={side} />
    );

  if (style === "large")
    return (
      <PostLarge data={data} image={image} showImage={showImage} side={side} />
    );

  return (
    <PostFull data={data} image={image} showImage={showImage} side={side} />
  );
}

Post.defaultProps = {
  data: false,
  style: "large",
  showImage: true,
  side: "previous",
};

export default React.memo(Post);
