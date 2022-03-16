import "react-wordpress-comments/css/styles.css";

import Button from "@/components/Button";
import { HeaderContext } from "@/context/HeaderContext";
import React from "react";
import WpApiContent from "@/components/WpApiContent";
import axios from "axios";
import classNames from "classnames";
import helpers from "@/helpers";
import settings from "@/settings";
import { useRouter } from "next/router";

function Discussion({ post, postID, className }) {
  const ref = React.useRef();
  const [comments, setComments] = React.useState([]);
  const { metaData } = React.useContext(HeaderContext);
  const location = useRouter();
  const [error, setError] = React.useState(false);
  const [commentSuccess, setCommentSuccess] = React.useState(false);
  const inputClasses =
    "p-4 rounded-md outline-none border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:outline-none focus:border-transparent focus:ring-2 form-input dark:bg-gray-900 dark:focus:ring-primary-500";

  const filteredComments = React.useMemo(
    () => comments.filter((c) => c.status === "approved"),
    [comments]
  );

  React.useEffect(async () => {
    if (!post) return;
    let comments = await axios.get(
      `${settings.apiBase}/comments?post=${post.id}&per_page=100`
    );
    setComments(comments.data);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const [name, email, comment] = e.target.elements;

    const data = {
      post: post.id,
      author_name: name.value,
      author_email: email.value,
      content: comment.value,
    };

    try {
      let api = await axios.post("/api/comments", data);
      if (api.data.error) {
        setError(api.data.error);
      } else {
        setCommentSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (filteredComments.length < 1 && post?.comment_status === "closed")
    return null;

  if (!settings.enableComments || !post) return null;

  return (
    <div className={classNames("p-16", className)}>
      <div className="inline-flex items-baseline space-x-1 border-b-4 border-gray-300 mb-4">
        <div className="lg:text-6xl font-display text-primary-500">
          {filteredComments.length}
        </div>
        <div className="lg:text-3xl">Comments</div>
      </div>
      {filteredComments.length > 0 && (
        <ul className="flex-col space-y-16 prose max-w-none mb-16">
          {filteredComments.map((comment) => (
            <li key={comment.id} className="flex space-x-8">
              <div className="">
                <img
                  src={comment?.author_avatar_urls[48]}
                  width="48"
                  height="48"
                  className="rounded-full border-4 border-white"
                  alt={comment.author.name}
                />
              </div>
              <div className="flex-1">
                <WpApiContent content={comment?.content?.rendered} />
                <div className="font-bold uppercase font-display tracking-widest text-sm">
                  {comment.author_name}
                  <time className="text-gray-400 ml-4 font-medium text-xs">
                    {helpers.formatDate(comment.date)}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div className="bg-primary-200 border border-primary-500 p-6 rounded-md text-center">
          <WpApiContent content={error.message} />
        </div>
      )}

      {commentSuccess && (
        <div className="bg-green-200 border border-green-500 p-6 rounded-md text-green-900 text-center font-bold">
          Your comment has been submitted. If it even partially appears to be
          from a real person you can look forward to seeing it here soon!
        </div>
      )}

      {post?.comment_status !== "closed" ? (
        <>
          <h3 className="up-title">Leave a Comment</h3>
          <form
            className="grid lg:grid-cols-2 gap-12 dark:text-gray-300"
            onSubmit={handleSubmit}
          >
            <div className="flex col-span-2 lg:col-span-1 flex-col justify-center">
              <label
                className="uppercase font-bold mb-2 font-display text-base tracking-widest"
                htmlFor="name"
              >
                Name*
              </label>
              <input id="name" type="text" required className={inputClasses} />
            </div>
            <div className="flex col-span-2 lg:col-span-1 flex-col justify-center">
              <label
                className="uppercase font-bold mb-2 font-display text-base tracking-widest"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                required
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col justify-center col-span-2">
              <label
                className="uppercase font-bold mb-2 font-display text-base tracking-widest"
                htmlFor="comment"
              >
                Comment*
              </label>
              <textarea
                id="comment"
                required
                className={`${inputClasses} form-textarea h-48`}
              />
            </div>
            <div className="col-span-2">
              <Button type="submit">Post Your Comment</Button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">Comments are closed for this post</div>
      )}
    </div>
  );
}

export default Discussion;
