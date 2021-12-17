import React, { useRef } from "react";
import Link from "next/link";
import content from "@/content";
import Skillz from "@/components/Skillz";
import classNames from "classnames";
import RecentPosts from "@/components/RecentPosts";
import useBreakpoints from "@/hooks/useBreakpoints";
import BadgeWrapper from "@/components/BadgeWrapper";
import GenericCard from "@/components/GenericCard";
import GridWrapper from "@/components/GridWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Scroll from "react-scroll";

function Resume() {
  const { breakpoint } = useBreakpoints();

  return (
    <div>
      <div className="p-6 lg:p-12">
        <section className="max-w-screen-md mx-auto">
          <h1 className="text-3xl lg:text-5xl text-center mb-4">Evan Agee</h1>
          <h2 className="uppercase tracking-widest lg:text-2xl text-center text-primary-500 mb-2 leading-tight">
            Full-Stack Developer specializing
            <br className="hidden lg:inline" />
            in JavaScript, React and Vue
          </h2>

          <div className="text-center text-sm lg:text-lg">
            <p>
              Hey, I'm Evan Agee (pronounced A.G.) and I'm a full-stack
              <br className="hidden lg:inline" />
              web developer and Webby Award Honoree and we might be a good fit
              for each other.
            </p>

            {/* <WpApiContent content={content.bioBlurb} /> */}

            <p>
              One of my key differentiators is that I started my career as a
              designer; I posses a unique combination of creative and technical
              skills.
            </p>

            <div className="flex flex-wrap gap-4 justify-center py-6">
              <Link href="/portfolio">
                <a className="button button-sm mr-2">View My Portfolio</a>
              </Link>
              <Scroll.Link
                className="button button-sm"
                to="history"
                smooth={true}
                offset={-50}
              >
                Employment History
              </Scroll.Link>
            </div>
          </div>

          <hr className="my-4" />
          <h3 className="up-title">Soft Skills</h3>
          <ul>
            <li>Self-Motivated</li>
            <li>Encourager and Motivator</li>
            <li>Quick Learner</li>
            <li>Diligent and Disciplined</li>
            <li>Easygoing and Patient</li>
          </ul>

          <h3 className="up-title">Tech Skills</h3>
          <Skillz />

          <h2 className="up-title">Awards &amp; Achievements</h2>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/evanagee/image/upload/c_scale,w_180/v1551277265/evanagee.com/BW_Honoree.png"
            className="mx-auto my-5 lg:float-right lg:ml-10 lg:mb-5"
            alt="I was a 2016 Webby Award Honoree!"
          />
          <div className="prose prose-lg">
            <ul className="">
              <li>
                <strong>2016 Webby Award Honoree</strong> in the Not for Profit
                category for my work on the Gateway Church Annual Report
              </li>
              <li>
                I'm the creator and maintainer of the{" "}
                <strong>
                  <a
                    href="https://github.com/EvanAgee/vuejs-wordpress-theme-starter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vuejs Wordpress Starter Theme
                  </a>
                </strong>
                , a VueJS starter for those wishing to develop headless
                WordPress applications.
              </li>
              <li>
                I pride myself on being able to accomplish tasks efficiently and
                faster than the majority of devs I've worked with.
              </li>
              <li>
                I hold an{" "}
                <strong>
                  A.S. degree in Computer Graphics Technology from Purdue
                  University
                </strong>
                . Early in my career I was a &quot;web designer&quot; which
                means I spent most of my day in Photoshop slicing PSDs and the
                rest of the day in Dreamweaver.
              </li>
              <li>
                Back in the early 2000's I operated one of the first ever horror
                movie databases on the internet. It was called Living-Dead.com
                and for a period of time was THE home of horror movies on the
                web.
              </li>
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

        <p className="text-center py-16">
          <a href="mailto:evanagee@gmail.com" className="button">
            Want to get in touch?
          </a>
        </p>
        <Scroll.Element name="history">
          <div className="-mx-6 lg:-mx-12">
            <BadgeWrapper title={`Employment History`}>
              <GridWrapper wrapItems={false}>
                {content.workHistory.map((job, i) => (
                  <div
                    className={classNames("p-6 xl:p-16", {
                      "col-span-2":
                        i + 1 === content.workHistory.length &&
                        i % content.workHistory.length > 0,
                    })}
                  >
                    <GenericCard
                      key={i}
                      image={job.logo ? `assets/images/${job.logo}` : false}
                      imageStyle={{
                        maxHeight: "100px",
                      }}
                      title={job.company}
                      content={job.description}
                      date={`${
                        job.location ? `${job.location}  &bull; ` : ""
                      } ${job.start_date} &mdash; ${job.end_date}`}
                      subtitle={job.title}
                      tags={job.tags}
                    />
                    <ul className="flex justify-center items-center font-display font-semibold text-sm gap-6 mt-6">
                      {job.remote && (
                        <li>
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "laptop-house"]}
                          />
                          Remote
                        </li>
                      )}
                      {job.contract && (
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
