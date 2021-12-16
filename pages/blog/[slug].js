import React, { useEffect, useContext } from "react";
import Head from "next/head";
import axios from "axios";
import { fetchAPI } from "@/lib/api"
import helpers from "@/helpers"
import PostDetail from "@/components/Blog/Post"
import { useRouter } from "next/router";
import { HeaderContext } from "@/context/HeaderContext";

export default function Post({ post }) {
  const router = useRouter();
  const { setPageTitle, setOgData } = useContext(HeaderContext);
  
  useEffect(() => {
    setPageTitle(`${helpers.decodeHtml(post?.title?.rendered)}`);
    setOgData({
      ...post?.yoast_head_json,
    });
  }, [router]);

  return (
    <PostDetail data={post} style="full" />
  );
}

export async function getStaticProps(context) {
  const posts = await fetch(`https://blog.evanagee.com/wp-json/wp/v2/posts?slug=${context.params.slug}`);
  const res = await posts.json();

  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: res[0]
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 100, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const allPosts = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    const res = await fetch(`https://blog.evanagee.com/wp-json/wp/v2/posts?per_page=100&page=${page}`)
    const posts = await res.json()
    if (posts.length > 0) {
      posts.map(p => allPosts.push(p.slug))
      page++;
    } else {
      keepGoing = false;
    }
  }

  // Get the paths we want to pre-render based on posts
  const paths = allPosts.map((slug) => ({
    params: { slug: `${slug}` },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}