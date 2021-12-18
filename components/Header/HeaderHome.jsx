import { css } from "@emotion/css";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import Link from "next/link";
import useBreakpoints from "@/hooks/useBreakpoints";
import CurrentLocation from "@/components/CurrentLocation";

export default function HeaderHome() {
  const { breakpoint, mediaQueries } = useBreakpoints();

  return (
    <div
      className={classNames(
        "flex w-full items-center flex-col justify-between text-center",
        css`
          ${mediaQueries.lg} {
            min-height: 80vh;
          }
        `
      )}
    >
      {breakpoint.isLgUp && (
        <div className="relative w-full flex justify-center">
          <CurrentLocation className="lg:absolute top-4 right-4 mt-8 lg:mt-0 z-20" />
        </div>
      )}
      <div
        className={classNames(
          "relative flex flex-col justify-end py-8 px-12 lg:py-24 text-center",
          css`
            text-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.25);
          `
        )}
      >
        <div className="relative container max-w-4xl mx-auto">
          <motion.h2
            initial={{
              y: -40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0,
              duration: 0.5,
            }}
            className="text-sm lg:text-lg leading-6 gradient-text font-semibold tracking-wide uppercase mb-6"
          >
            Creating killer web apps with
            <br />
            cool people around the world.
          </motion.h2>
          <motion.h1
            initial={{
              y: -40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
            className="mt-2 text-3xl lg:text-7xl font-extrabold text-gray-100 !leading-none decoration-clone"
          >
            I’m a <span className="text-primary-500">web developer</span> who specializes in <span className="text-primary-500">JavaScript</span>.
          </motion.h1>
          <motion.p
            initial={{
              y: -40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
            className="mt-8 lg:text-2xl text-gray-300"
          >
            I've{" "}
            <Link className="text-primary-500" href="/portfolio">
              worked
            </Link>{" "}
            with clients from around the world during my{" "}
            <Link className="text-primary-500" href="/resume">
              20 years of professional experience
            </Link>
            . I'm also the creator of the{" "}
            <a
              href="https://github.com/EvanAgee/vuejs-wordpress-theme-starter"
              target="_blank"
              className="bg-primary-500 bg-opacity-30 text-white px-3 rounded-xl decoration-clone text-shadow py-0"
              rel="noreferrer"
            >
              Vuejs WordPress Theme Starter
            </a>{" "}
            on github and{" "}
            <a
              href="https://vuewp.com"
              target="_blank"
              className={`bg-primary-500 bg-opacity-30 text-white px-3 rounded-xl decoration-clone text-shadow py-0`}
              rel="noreferrer"
            >
              VueWordPress
            </a>
            , a training resource for devs. My family and I{" "}
            <Link
              href="/blog/were-moving-into-a-5th-wheel"
              className="text-primary-500"
            >
              live in a fifth wheel
            </Link>{" "}
            and are slowly working towards our goal of visiting every state in
            the continental United States!
          </motion.p>
        </div>
      </div>
      {breakpoint.isMdDown && (
        <div className="flex justify-center pb-8 relative">
          <CurrentLocation />
        </div>
      )}
    </div>
  );
}
