import helpers from "@/helpers";
import PostDetail from "@/components/Blog/Post";
import Discussion from "@/components/Discussion";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNext from "@/components/PrevNext";
import settings from "@/settings";
import BadgeWrapper from "@/components/BadgeWrapper";
import Carousel from "@/components/Carousel";
import useBreakpoints from "@/hooks/useBreakpoints";
import PostGridWrapper from "@/components/Blog/PostGridWrapper";
import Meta from "@/components/Meta";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";

export default function Post({ post, catPosts, relatedPhotos }) {
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
        <Breadcrumbs title={helpers.decodeHtml(post?.title?.rendered)} />
      </div>

      <PostDetail data={post} style="full" />

      {relatedPhotos && relatedPhotos.length > 0 && (
        <BadgeWrapper title={`Related Photos (${relatedPhotos.length})`}>
          <Carousel
            slidesToShow={breakpoint.isLgUp ? 4 : 2}
            className="!border-b-0"
            showDots={false}
            separated={false}
          >
            {relatedPhotos?.map((c, i) => (
              <PhotoTeaser
                key={i}
                data={helpers.getPhotoMeta(c)}
                showDetails={false}
              />
            ))}
          </Carousel>
        </BadgeWrapper>
      )}

      <div className="bg-gray-100">
        <Discussion post={post} postID={post.id} />
      </div>

      <PrevNext data={post} key={post?.slug} />

      {catPosts && catPosts.filter((c) => c.id !== post.id).length > 0 && (
        <div className="">
          <BadgeWrapper
            link={`/blog/categories/${post.ea_categories[0].term_id}|${post.ea_categories[0].name}`}
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
      revalidate: settings.ISRrevalidate,
    };
  }

  // Get posts that are in the same category
  let catPosts = false;
  if (post[0]?.categories && post[0]?.categories?.length > 0) {
    let posts = await fetch(
      `${settings.apiBase}/posts?categories=${post[0]?.categories[0]}&per_page=6`
    );
    catPosts = await posts.json();
  }

  // Get posts that are in the same category
  let relatedPhotos = false;
  if (post[0]?.ea_tags && post[0]?.ea_tags?.length > 0) {
    relatedPhotos = [];

    for (const t of post[0].ea_tags) {
      // Get the corresponding photo tag that matches the post tag
      let photoTag = await fetch(
        `${settings.acfApiBase}/photo_tags?slug=${t.slug}`
      );
      photoTag = await photoTag.json();

      if (photoTag.length > 0) {
        let posts = await fetch(
          `${settings.apiBase}/photos?photo_tags=${photoTag[0].id}&per_page=10`
        );
        posts = await posts.json();
        relatedPhotos.push(...posts);
      }
    }
  }

  return {
    props: {
      post: post[0],
      catPosts,
      relatedPhotos: relatedPhotos
        ? relatedPhotos.filter(
            (value, index, self) =>
              index ===
              self.findIndex((t) => t.id === value.id && t.slug === value.slug)
          )
        : false,
    },
    revalidate: settings.ISRrevalidate,
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  if (process.env.NODE_ENV === "development")
    return { paths: [], fallback: "blocking" };

  console.time("Getting static paths for posts");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(`${settings.apiBase}/posts?page=${page}`);
    const posts = await res.json();

    if (posts.length > 0) {
      posts.map((p) => allPosts.push(p.slug));
      page++;
    } else {
      keepGoing = false;
    }
  }

  // Get the paths we want to pre-render based on posts
  const paths = allPosts.map((slug) => {
    return { params: { slug: `${slug}` } };
  });

  console.timeEnd("Getting static paths for posts");
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
