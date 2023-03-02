import Portfolio from "@/pages/portfolio/index";
export default Portfolio;
import settings from "@/settings";
import axios from "axios";

export async function getServerSideProps(context) {
  let posts = await axios.get(`${settings.apiBase}/projects`, {
    params: {
      tags: parseInt(context.params.filterTerm.split("%7C")[0]),
      per_page: 1,
    },
  });

  return {
    props: {
      posts: posts.data,
      filterType: "tags",
    },
    // revalidate: settings.ISRrevalidate,
  };
}
/*
export async function getStaticPaths() {
  console.time("Getting static paths for project tags");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `${settings.apiBase}/tags?page=${page}`
    );
    const posts = await res.json();

    if (posts.length > 0) {
      posts.map((p) =>
        allPosts.push({
          id: p.id,
          title: p.slug,
        })
      );
      page++;
    } else {
      keepGoing = false;
    }
  }

  // Get the paths we want to pre-render based on posts
  const paths = allPosts.map(({ id, title }) => ({
    params: {
      filterTerm: `${id}|${title}`,
    },
  }));

  console.timeEnd("Getting static paths for project tags");
  return { paths, fallback: "blocking" };
}
*/