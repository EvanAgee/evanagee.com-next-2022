import helpers from "@/helpers";
import PostDetail from "@/components/Blog/Post";
import Discussion from "@/components/Discussion";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNext from "@/components/PrevNext";
import settings from "@/settings";
import useMatchHeight from "@/hooks/useMatchHeight";
import BadgeWrapper from "@/components/BadgeWrapper";
import Carousel from "@/components/Carousel";
import useBreakpoints from "@/hooks/useBreakpoints";
import PostGridWrapper from "@/components/Blog/PostGridWrapper";
import Meta from "@/components/Meta";

export default function Post({ post, catPosts }) {
  const { breakpoint } = useBreakpoints();
  
  return (
    <>
      <Meta
        title={`${helpers.decodeHtml(post?.title?.rendered)}`}
        ogData={{
          ...post?.yoast_head_json,
          ogImage: helpers.postImage(post, "large")[0],
        }}
      />
      <div className="pl-6 pt-6">
        <Breadcrumbs />
      </div>
      <PostDetail data={post} style="full" />

      <em className="block py-4 text-sm text-center mb-6 text-gray-400">
        Some imagery provided by{" "}
        <a
          href="https://unsplash.com/"
          target="_blank"
          className="text-primary-400"
        >
          Unsplash
        </a>
        .
      </em>

      <div className="bg-gray-100">
        <Discussion post={post} postID={post.id} />
      </div>

      <PrevNext data={post} />

      {catPosts && catPosts.filter((c) => c.id !== post.id).length > 0 && (
        <div className="">
          <BadgeWrapper
            title={`More Posts in <span className="text-primary-500">${post.ea_categories[0].name}</span>`}
          >
            <Carousel
              slidesToShow={breakpoint.isLgUp ? 3 : 1}
              className=" bg-opacity-75"
            >
              {catPosts
                .filter((c) => c.id !== post.id)
                .map((c, i) => (
                  <PostGridWrapper
                    key={i}
                    className="pt-16 pb-20 w-full"
                    counter={i}
                    largeFirst={false}
                  >
                    <PostDetail data={c} style="teaser" />
                  </PostGridWrapper>
                ))}
            </Carousel>
          </BadgeWrapper>
        </div>
      )}
    </>
  );
}

export async function getStaticProps(context) {
  let post = await fetch(
    `${settings.apiBase}/posts?slug=${context.params.slug}&per_page=1`
  );
  post = await post.json();

  if (!post || post.length < 1) {
    return {
      notFound: true,
    };
  }

  // Get posts that are in the same category
  let catPosts = false;
  if (post[0]?.categories && post[0]?.categories?.length > 0) {
    let posts = await fetch(
      `${settings.apiBase}/posts?categories=${post[0]?.categories[0]}&per_page=100`
    );
    catPosts = await posts.json();
  }

  return {
    props: {
      post: post[0],
      catPosts,
    },
    revalidate: settings.ISRrevalidate,
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  console.time("Getting static paths for posts");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `${settings.apiBase}/posts?per_page=50&page=${page}`
    );
    const posts = await res.json();
    if (posts.length > 0) {
      posts.map((p) => allPosts.push(p.slug));
      page++;
    } else {
      keepGoing = false;
    }
  }

  // Get the paths we want to pre-render based on posts
  const paths = allPosts.map((slug) => ({
    params: { slug: `${slug}` },
  }));

  console.timeEnd("Getting static paths for posts");
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
