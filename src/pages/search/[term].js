import Search from "./index";
import settings from "@/settings";

export default Search;

export async function getStaticProps(context) {
  return {
    props: {
      term: context.params.term
    },
    revalidate: settings.ISRrevalidate,
  };
}

export async function getStaticPaths() {
  console.time("Getting static paths for search terms");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `${settings.apiBase}/tags?per_page=50&page=${page}`
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
    params: { term: `${slug}` },
  }));

  console.timeEnd("Getting static paths for search terms");
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}