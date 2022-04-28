import PhotoIndex from "@/pages/photos/index";
import settings from "@/settings";
import axios from "axios";
export default PhotoIndex;

export async function getStaticProps(context) {
  let posts = await axios.get(`${settings.apiBase}/photos`, {
    params: {
      photo_tag: parseInt(context.params.filterTerm.split("|")[0]),
      per_page: 1,
    },
  });

  return {
    props: {
      posts: posts.data,
      filterType: "photo_tag",
    },
    revalidate: settings.ISRrevalidate,
  };
}

export async function getStaticPaths() {
  console.time("Getting static paths for photo tags");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `${settings.apiBase}/photo_tags?page=${page}`
    );
    const posts = await res.json();

    if (posts.length > 0) {
      posts.map((p) =>
        allPosts.push({
          id: p.id,
          title: p.name,
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

  console.timeEnd("Getting static paths for photo tags");
  return { paths, fallback: "blocking" };
}
