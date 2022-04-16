import BadgeWrapper from "@/components/BadgeWrapper";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import Meta from "@/components/Meta";
import PhotoTeaser from "@/components/Photos/PhotoTeaser";
import PostDetail from "@/components/Blog/Post";
import PostGridWrapper from "@/components/Blog/PostGridWrapper";
import ProjectTeaser from "@/components/Projects/ProjectTeaser";
import React from "react";
import WpApiContent from "@/components/WpApiContent";
import classNames from "classnames";
import content from "@/content";
import helpers from "@/helpers";
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import settings from "@/settings";
import useBreakpoints from "@/hooks/useBreakpoints";

const myImages = [
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_1200/v1630426991/evanagee.com/27E4E7A7-CC69-4D72-B18E-9385B1072840.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_1200/v1551277265/evanagee.com/evan-2018.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_1200/v1630426014/evanagee.com/FCEF3355-FF54-4DF2-B5B7-884FEA349050_1_105_c.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_1200/v1630426027/evanagee.com/9258D647-E46F-4386-8C76-459B09D50888_1_105_c.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_1200/v1630426143/evanagee.com/D85938C3-A2CF-492B-A41A-537F4DF6514C_1_105_c.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_1200/v1630426156/evanagee.com/5F1A2964-0B93-448A-80B5-0833ACDB5ECB_1_105_c.jpg",
  "https://res.cloudinary.com/evanagee/image/upload/c_fill,g_faces,h_1200/v1630426981/evanagee.com/8C574DF9-8924-4EBD-A03A-5FA2450B1E82_1_105_c.jpg",
];

export default function Home({ posts, projects, photos, currentLocation }) {
  const { breakpoint } = useBreakpoints();
  const [randomImage, setRandomImage] = React.useState(0);

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
        setRandomImage(counter);
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Meta />
      <div data-test-id="home-page">
        <section
          id="about"
          className="lg:px-0 lg:py-0 flex-column xl:flex-row xl:flex items-stretch"
        >
          <div className="order-0 lg:order-1 relative text-center mx-auto xl:w-1/3 aspect-video xl:aspect-none">
            {myImages.map((image, i) => (
              <img
                key={i}
                loading="lazy"
                src={image}
                alt="Evan Agee"
                width="366"
                height="366"
                className={classNames(
                  "absolute w-full h-full object-cover object-center inset-0 transition duration-1000",
                  {
                    "opacity-0": randomImage !== i,
                  }
                )}
              />
            ))}
          </div>

          <div className="px-6 my-12 lg:my-0 flex-1 lg:py-16 xl:px-16 lg:px-8 xl:w-2/3">
            <div className="prose lg:prose-xl mx-auto">
              <div className="up-title">A little about me...</div>
              <p>
                <strong className="font-semibold font-display">
                  Hey, I&apos;m Evan Agee (pronounced A.G.) and I&apos;m a full-stack web
                  developer. My wife Crys our daughter Liliana and I{" "}
                  <Link href="/rv-travels">
                    <a className="text-primary-500">
                      live full-time in a fifth wheel trailer
                    </a>
                  </Link>{" "}
                  and travel the country. Currently we&apos;re camping in{" "}
                  <span className="text-primary-500">{currentLocation}</span>. I love films, music (especially the odd-metered djent variety) and computers.
                </strong>
              </p>

              <div className="columns-1">
                <WpApiContent content={content.bioBlurb} />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <Button href="/portfolio">View My Portfolio</Button>
              <Button href="/resume" variant="gray">
                My Resume
              </Button>
            </div>
          </div>
        </section>
        <section className="bg-gray-100">
          <BadgeWrapper title="Recent Blog Posts">
            <Carousel
              slidesToShow={breakpoint.isLgUp ? 3 : 1}
              className=" bg-opacity-0 border-b-0"
              separated
            >
              {posts.map((c, i) => (
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
        </section>
        <section className="bg-gray-100">
          <BadgeWrapper title="Recent Projects" className="">
            <Carousel
              slidesToShow={breakpoint.isLgUp ? 3 : 1}
              className=" bg-opacity-0 border-b-0"
              separated
            >
              {projects?.map((c, i) => (
                <PostGridWrapper
                  key={i}
                  className="pt-16 pb-20 w-full"
                  counter={i}
                  largeFirst={false}
                >
                  <ProjectTeaser data={c} showDescription={false} />
                </PostGridWrapper>
              ))}
            </Carousel>
          </BadgeWrapper>
        </section>
        <section>
          <BadgeWrapper title="Recent Photos">
            <Carousel
              slidesToShow={breakpoint.isLgUp ? 4 : 2}
              className="!border-b-0"
              showDots={false}
              separated={false}
            >
              {photos?.map((c, i) => (
                <PhotoTeaser
                  key={i}
                  data={helpers.getPhotoMeta(c)}
                  showDetails={false}
                />
              ))}
            </Carousel>
          </BadgeWrapper>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let posts = await fetch(`${settings.apiBase}/posts?per_page=12`);
  posts = await posts.json();

  let projects = await fetch(`${settings.apiBase}/projects?per_page=12`);
  projects = await projects.json();

  let photos = await fetch(`${settings.apiBase}/photos?per_page=12`);
  photos = await photos.json();

  let options = await fetch(
    `https://blog.evanagee.com/wp-json/acf/v3/options/options`
  );
  options = await options.json();

  return {
    props: {
      posts,
      projects,
      photos,
      currentLocation: options?.acf?.current_location,
    },
    revalidate: settings.ISRrevalidate,
  };
}
