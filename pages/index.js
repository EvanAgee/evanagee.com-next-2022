import React from "react";
import Head from "next/head";
import Link from "next/link";
import content from "@/content";
import classNames from "classnames";
import useBreakpoints from "@/hooks/useBreakpoints";
import WpApiContent from "@/components/WpApiContent";
import BadgeWrapper from "@/components/BadgeWrapper";
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import dynamic from 'next/dynamic'

const RecentPosts = dynamic(() => import('../components/RecentPosts.jsx'))

const myImages = [
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_350,w_350/v1630426991/evanagee.com/27E4E7A7-CC69-4D72-B18E-9385B1072840.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_350,w_350/v1551277265/evanagee.com/evan-2018.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_350,w_350/v1630426014/evanagee.com/FCEF3355-FF54-4DF2-B5B7-884FEA349050_1_105_c.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_350,w_350/v1630426027/evanagee.com/9258D647-E46F-4386-8C76-459B09D50888_1_105_c.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_350,w_350/v1630426143/evanagee.com/D85938C3-A2CF-492B-A41A-537F4DF6514C_1_105_c.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_350,w_350/v1630426156/evanagee.com/5F1A2964-0B93-448A-80B5-0833ACDB5ECB_1_105_c.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_350,w_350/v1630426981/evanagee.com/8C574DF9-8924-4EBD-A03A-5FA2450B1E82_1_105_c.jpg",
];


export default function Home({ posts }) {
  const { breakpoint } = useBreakpoints();
  const [randomImage, setRandomImage] = React.useState(myImages[0]);
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    let counter = 0;
    const timer = setInterval(() => {
      if (myImages.length > counter + 1) {
        counter++;
      } else {
        counter = 0;
      }

      const image = new Image();
      image.src = myImages[counter];
      image.addEventListener("load", () => {
        setRandomImage(myImages[counter]);
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-test-id="home-page"
    >
      <motion.section
        variants={pageVariants.section}
        id="about"
        className="px-6 py-12 lg:px-16 lg:py-16"
      >
        <div className="relative mb-16 text-center max-w-md mx-auto">
          <div
            className={classNames(
              "absolute inset-0 bg-gradient-to-r from-secondary-700 to-primary-500 shadow-lg transition-transform transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl",
            )}
          ></div>
          <img
            loading="lazy"
            src={randomImage}
            alt="Evan Agee"
            width="366"
            height="366"
            className="relative border-8 border-gray-200 mx-auto"
          />
        </div>

        <div className=" mt-20 lg:mt-0 mx-auto">
          <div className="prose lg:prose-xl mx-auto">
            <div className="up-title">A little about me...</div>
            <p>
              <strong className="font-semibold font-display">
                Hey, I'm Evan Agee (pronounced A.G.) and I'm a full-stack web
                developer. My wife Crys our daughter Liliana and I{" "}
                <Link
                  href="/blog/were-moving-into-a-5th-wheel"
                  className="text-primary-500"
                >
                  live full-time in a fifth wheel trailer
                </Link>{" "}
                and travel the country. Currently we're camping in{" "}
                <span className="text-primary-500">
                  {content.currentLocation}
                </span>
                .
              </strong>
            </p>

            <div className="columns-1">
              <WpApiContent content={content.bioBlurb} />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link
              className="button"
              href="/portfolio"
            >
              View My Portfolio
            </Link>
            <Link className="button button-secondary" href="/resume">
              My Resume
            </Link>
          </div>
        </div>
      </motion.section>
      <motion.section variants={pageVariants.section} className="bg-primary-50 pb-6">
        <BadgeWrapper title="Recent Blog Posts">
          <RecentPosts
            style="grid"
            cardStyle="teaser"
            count={breakpoint.isLgUp ? 2 : 2}
          />
        </BadgeWrapper>
      </motion.section>
      <motion.section variants={pageVariants.section}>
        <BadgeWrapper title="Recent Projects" className="">
          <RecentPosts
            style="grid"
            postType="projects"
            cardStyle="teaser"
            count={breakpoint.isLgUp ? 2 : 1}
          />
        </BadgeWrapper>
      </motion.section>
      <motion.section variants={pageVariants.section}>
        <BadgeWrapper title="Recent Photos">
          <RecentPosts
            containerClassName="grid-cols-2 lg:grid-cols-4"
            postType="photos"
            style="grid"
            cardStyle="teaser"
            count={breakpoint.isLgUp ? 4 : 2}
            columns={breakpoint.isLgUp ? 4 : 2}
          />
        </BadgeWrapper>
      </motion.section>
    </motion.div>
  );
}

export async function getStaticProps() {
  const posts = await fetch('https://blog.evanagee.com/wp-json/wp/v2/posts?per_page=50');
  const res = await posts.json();
  return {
    props: {
      posts: res
    },
  };
}
