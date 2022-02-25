import * as Scroll from "react-scroll";

import React, { useRef } from "react";

import BadgeWrapper from "@/components/BadgeWrapper";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericCard from "@/components/GenericCard";
import GridWrapper from "@/components/GridWrapper";
import Link from "next/link";
import Meta from "@/components/Meta";
import RecentPosts from "@/components/RecentPosts";
import Skillz from "@/components/Skillz";
import WpApiContent from "@/components/WpApiContent";
import classNames from "classnames";
import content from "@/content";
import settings from "@/settings"
import useBreakpoints from "@/hooks/useBreakpoints";

function Resume({ siteSettings }) {
  const { breakpoint } = useBreakpoints();

  return (
    <div>
      <Meta />
      <div className="p-6 lg:p-12">
        <section className="max-w-screen-md mx-auto">
          <h1 className="text-3xl lg:text-5xl text-center mb-4">Evan Agee</h1>
          <h2 className="uppercase tracking-widest lg:text-2xl text-center text-primary-500 mb-2 leading-tight">
            <WpApiContent content={siteSettings.headline} />
          </h2>

          <div className="text-center text-sm lg:text-lg">
            <WpApiContent content={siteSettings.intro} />

            <div className="flex flex-wrap gap-4 justify-center py-6">
              <Button href="/portfolio" className="mr-2">
                View My Portfolio
              </Button>
              <Button href="#history" variant="secondary" smooth>
                Employment History
              </Button>
            </div>
          </div>

          <hr className="my-4" />
          <h3 className="up-title">Soft Skills</h3>
          <ul>
            {siteSettings.soft_skills.map((s, i) => (
              <li key={i}>{s.skill}</li>
            ))}
          </ul>

          <h3 className="up-title">Tech Skills</h3>
          <ul className="flex flex-wrap gap-2">
            {siteSettings.tech_skills.map((s, i) => (
              <li
                className="text-primary-500 bg-primary-100 dark:bg-primary-700 dark:text-primary-100 inline-block py-1 px-2 rounded-md"
                key={i}
              >
                {s.skill}
              </li>
            ))}
          </ul>

          <h2 className="up-title">Awards &amp; Achievements</h2>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/evanagee/image/upload/c_scale,w_180/v1551277265/evanagee.com/BW_Honoree.png"
            className="mx-auto my-5 lg:float-right lg:ml-10 lg:mb-5"
            alt="I was a 2016 Webby Award Honoree!"
            width="180"
            height="180"
          />
          <div className="prose prose-lg">
            <ul className="">
              {siteSettings.awards_achievements.map((a, i) => (
                <li key={i}>
                  <WpApiContent content={a.award} />
                </li>
              ))}
            </ul>
            <blockquote>
              <h3>Remote Ready!</h3>
              <p>
                Remote work doesn't work for everyone, but I thrive in a
                distributed team. I've worked remotely for the majority of my
                career so I've had time to solve the challenges that come along
                with remote work.
              </p>
            </blockquote>
          </div>
        </section>

        <div className="text-center py-16">
          <Button href="mailto:evanagee@gmail.com">
            Want to get in touch?
          </Button>
        </div>

        <Scroll.Element id="history" name="history" className="scroll-mt-12">
          <div className="-mx-6 lg:-mx-12">
            <BadgeWrapper title="Employment History">
              <GridWrapper wrapItems={false}>
                {siteSettings.positions.map((job, i) => (
                  <div
                    key={i}
                    className={classNames("p-6 xl:p-16", {
                      "col-span-2":
                        i + 1 === siteSettings.positions.length &&
                        siteSettings.positions.length % 2 > 0,
                    })}
                  >
                    <GenericCard
                      key={i}
                      image={job.logo ? job.logo.url : false}
                      imageStyle={{
                        maxHeight: "100px",
                      }}
                      title={job.company_name}
                      content={job.description}
                      date={`${
                        job.location ? `${job.location}  &bull; ` : ""
                      } ${job.start_date} &mdash; ${
                        job.currently_work_there ? "Present" : job.end_date
                      }`}
                      subtitle={job.title}
                      tags={job.technologies.map((t) => {
                        return {
                          name: t.name,
                          link: `/portfolio/tags/${t.term_id}%7C${t.slug}`,
                        };
                      })}
                    />
                    <ul className="flex justify-center items-center font-display font-semibold text-sm gap-6 mt-6">
                      {job.position_remote && (
                        <li>
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "laptop-house"]}
                          />
                          Remote
                        </li>
                      )}
                      {job.position_contract && (
                        <li>
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "mug-tea"]}
                          />
                          Contract
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </GridWrapper>
            </BadgeWrapper>
          </div>
        </Scroll.Element>
        {!content.currentlyEmployed && (
          <div>
            <hr />
            <strong>
              <span className="">
                I'm looking for a role that focuses on Vuejs
              </span>
              , here are a few notes on what I've been doing with Vue over the
              last few of years:
            </strong>
            <ol className="list-decimal ml-5 mt-5">
              <li>
                <strong>
                  This year I worked as part of a team of developers to create a
                  large-scale Vue/Nuxt project
                </strong>{" "}
                that allowed large-scale energy providers to monitor usage
                across plants.
              </li>
              <li>
                <strong>In 2017 I developed a large Vue SPA for Disney.</strong>{" "}
                It was a wish list creator which involved user auth with
                Firebase and allowed users to build a list of products available
                from Disney and then share that wishlist with friends and family
                through social media. It was a Firebase backend with a Vuejs
                front end.
              </li>
              <li>
                <strong>
                  In 2019 I worked with a small team of developers to rebuild
                  <a href="http://carbmanager.com/" target="_blank">
                    CarbManager
                  </a>
                  , a nutrition tracking app with over 3 million active users.
                </strong>
                It is a Vue app with a Firebase backend but also had several
                integrations and i18n. We also used Storybook.
              </li>
              <li>
                <strong>
                  In 2019 I created a Vue SPA to house my
                  <a href="https://photos.evanagee.com" target="_blank">
                    extensive photo library
                  </a>
                </strong>
                so I could migrate away from Flickr. I'm super proud of how it
                turned out and have plans to release it as an open source
                project soon.
              </li>
              <li>
                Over the course of my time at Beanstalk Digital
                <strong>I’ve sprinkled a lot of Vue into WordPress</strong> for
                projects for specific features. Lots of asynchronous widgets,
                post filtering UIs, etc.
              </li>
              <li>
                <strong>
                  Over the last year I’ve been planning and developing
                  <a href="https://vuewp.com" target="_blank">
                    VueWordPress
                  </a>
                  , a training platform for devs
                </strong>
                looking to grow their skills in the WordPress + Vue ecosystem. I
                just launched the platform recently and I’m excited to grow it
                more. It’s a WordPress backend with a large amount of Vue
                interactivity on the frontend.
              </li>
              <li>
                <strong>
                  In 2017 I developed a
                  <a href="https://gatewaydevotions.com/" target="_blank">
                    &quot;devotional&quot; platform
                  </a>{" "}
                  for
                  <a href="https://gatewaypeople.com/" target="_blank">
                    Gateway Church
                  </a>
                  , one of the largest churches in the world.
                </strong>
                It’s a Vue frontend with a Firebase + Contentful backend and
                features user progress tracking and a contextual style for each
                different “book”.
              </li>
            </ol>

            <hr />
          </div>
        )}
      </div>
      <BadgeWrapper title="Recent Projects">
        <RecentPosts
          containerClassname=""
          postType="projects"
          style="grid"
          cardStyle="teaser"
          count={breakpoint.isLgUp ? 4 : 2}
        />
      </BadgeWrapper>
    </div>
  );
}

export default Resume;

export async function getStaticProps() {
  let siteSettings = await fetch(
    `https://blog.evanagee.com/wp-json/acf/v3/options/options`
  );
  siteSettings = await siteSettings.json();

  return {
    props: {
      siteSettings: siteSettings.acf,
    },
    revalidate: settings.ISRrevalidate,
  };
}
