import React from "react";
import Link from "next/link";
import CurrentLocation from "@/components/CurrentLocation";

export default function Footer() {
  return (
    <div className="text-white font-display mb-6 lg:mb-16 flex flex-col justify-center gap-6 px-6 relative">
      <div className="flex flex-col lg:flex-row items-center mx-auto gap-6">
        <CurrentLocation />
        <div>
          Made with{" "}
          <span role="img" aria-label="Love">
            ❤️
          </span>{" "}
          from{" "}
          <Link className="underline" href="/blog/were-moving-into-a-5th-wheel">
            wherever our RV is parked
          </Link>
          . <br />
          <small className="font-bold">
            Headless WordPress with Vite + React + TailwindCSS
          </small>
        </div>
      </div>
      <div className="">
        <Link
          href="/blog/a-web-developer-story"
        ><a className="flex flex-wrap items-center justify-center mt-4 gap-6">
          <img
            loading="lazy"
            src="/assets/images/badges/made_with_m_dw_anim.gif"
            alt="Web Nostalgia"
          />
          <img
            loading="lazy"
            src="/assets/images/badges/amazon4.gif"
            alt="Web Nostalgia"
          />
          <img
            loading="lazy"
            src="/assets/images/badges/DownloadICQBadge.gif"
            alt="Web Nostalgia"
          />
          <img
            src="/assets/images/badges/html-writer-guild.jpeg"
            style={{ maxWidth: "80px" }}
          />
          <img
            loading="lazy"
            src="/assets/images/badges/GeoCitiesBadge.gif"
            alt="Web Nostalgia"
          />
          <img
            loading="lazy"
            src="/assets/images/badges/MemberoftheIhateframesclub.gif"
            alt="Web Nostalgia"
          />
          <img
            loading="lazy"
            src="/assets/images/badges/NetscapeNow.gif"
            alt="Web Nostalgia"
          /></a>
        </Link>
      </div>
    </div>
  );
}
