import CurrentLocation from "@/components/CurrentLocation";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="text-white font-display mb-6 lg:mb-16 flex flex-col justify-center gap-6 px-6 relative print:hidden">
      <div className="flex flex-col lg:flex-row items-center mx-auto gap-6">
        <CurrentLocation />
        <div>
          Made with{" "}
          <span role="img" aria-label="Love">
            ❤️
          </span>{" "}
          from{" "}
          Dallas/Fort Worth Texas
          . <br />
          <small className="font-bold">
            Headless WordPress + NextJS + TailwindCSS
          </small>
        </div>
      </div>
      <div className="">
        <Link href="/blog/a-web-developer-story">
          <a className="flex flex-wrap items-center justify-center mt-4 gap-6">
            <img
              loading="lazy"
              src="/assets/images/badges/made_with_m_dw_anim.gif"
              alt="Made with Dreeamweaver"
              width="88"
              height="31"
            />
            <img
              loading="lazy"
              src="/assets/images/badges/amazon4.gif"
              alt="Buy Books Here!"
              width="120"
              height="60"
            />
            <img
              loading="lazy"
              src="/assets/images/badges/DownloadICQBadge.gif"
              alt="Download ICQ"
              width="88"
              height="31"
            />
            <img
              src="/assets/images/badges/html-writer-guild.jpeg"
              alt="HTML Writers Guild"
              style={{ maxWidth: "80px" }}
              width="80"
              height="112"
            />
            <img
              loading="lazy"
              src="/assets/images/badges/GeoCitiesBadge.gif"
              alt="GeoCities"
              width="88"
              height="31"
            />
            <img
              loading="lazy"
              src="/assets/images/badges/MemberoftheIhateframesclub.gif"
              alt="I hate frames"
              width="96"
              height="41"
            />
            <img
              loading="lazy"
              src="/assets/images/badges/NetscapeNow.gif"
              alt="Netscape Navigator Now"
              width="90"
              height="30"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
