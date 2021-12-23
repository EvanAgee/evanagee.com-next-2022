import PhotoIndex from "@/pages/photos/index";
import settings from "@/settings";
import axios from "axios";
export default PhotoIndex;

export async function getStaticProps(context) {
  let posts = await axios.get(`${settings.apiBase}/photos`, {
    params: {
      photo_album: parseInt(context.params.filterTerm.split("|")[0]),
      per_page: 1,
    },
  });

  return {
    props: {
      posts: posts.data,
      filterType: "photo_album",
    },
    revalidate: settings.ISRrevalidate,
  };
}

export async function getStaticPaths() {
  console.time("Getting static paths for photo albums");
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(
      `${settings.apiBase}/photo_album?per_page=5&page=${page}`
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

  console.timeEnd("Getting static paths for photo albums");
  return { paths, fallback: "blocking" };
}
