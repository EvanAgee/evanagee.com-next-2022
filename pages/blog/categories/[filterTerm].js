import BlogIndex from "@/pages/blog/index";
import settings from "@/settings";
import axios from "axios";
export default BlogIndex;

export async function getStaticProps(context) {
  let posts = await axios.get(`${settings.apiBase}/posts`, {
    params: {
      categories: parseInt(context.params.filterTerm.split("|")[0]),
      per_page: 1
    },
  });

  return {
    props: {
      posts: posts.data,
      filterType: "categories",
    },
    revalidate: settings.ISRrevalidate,
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  console.time("Getting static paths for categories");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `${settings.apiBase}/categories?per_page=50&page=${page}`
    );
    const posts = await res.json();
    if (posts.length > 0) {
      posts.map((p) => allPosts.push({
        id: p.id,
        title: p.name
      }));
      page++;
    } else {
      keepGoing = false;
    }
  }
  // Get the paths we want to pre-render based on posts
  const paths = allPosts.map(({id, title}) => ({
    params: { 
      filterTerm: `${id}|${title}` 
    },
  }));

  console.timeEnd("Getting static paths for categories");
  return { paths, fallback: false };
}
