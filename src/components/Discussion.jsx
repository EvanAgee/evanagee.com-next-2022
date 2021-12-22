import React from "react";
import { useRouter } from "next/router";
import { DiscussionEmbed } from "disqus-react";
import { HeaderContext } from "@/context/HeaderContext";
import PageLoader from "@/components/Loaders/PageLoader";
import settings from "@/settings"
import WpComments from "react-wordpress-comments"
import "react-wordpress-comments/css/styles.css"

function Discussion({postID}) {
  if (!settings.enableComments) return null;
  const ref = React.useRef();
  const { metaData } = React.useContext(HeaderContext);
  const location = useRouter();

  return (<WpComments
    maxDepth={3} // provide depth that you want comments to be nested in a list
    pageId={postID} // id of a page you want to fetch comments from and post to
    hostUrl="https://blog.evanagee.com" // url of your WordPress website
    allowComments={true} // can users post comments?
  />)

  // Hide Disqus ads
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!ref?.current) return;
      const iframes = Array.from(
        ref.current.querySelectorAll("#disqus_thread iframe")
      );
      if (iframes.length > 1) iframes[0].classList.add("hidden");
      if (iframes.length > 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!metaData || !location) return <PageLoader />;

  return (
    <div ref={ref} className="p-6 lg:p-16">
      <DiscussionEmbed
        shortname="evanagee"
        config={{
          url: `https://evanagee.com${location.pathname}`,
          title: metaData.title,
        }}
      />
    </div>
  );
}

export default Discussion;
