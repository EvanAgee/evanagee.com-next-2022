import React from "react";
import Link from "next/link";
import { css } from "@emotion/css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import content from "@/content";

export default function CurrentLocation({ className }) {
  return (
    <Link
      href="/blog/were-moving-into-a-5th-wheel"
    >
      <a className={classNames(
        "w-full w-auto border-2 border-white border-opacity-50 text-white hover:bg-primary-500 hover:bg-opacity-30 rounded-md font-display inline-flex justify-center items-center py-2 px-4 gap-4 text-left uppercase tracking-widest",
        className,
        css`
          font-size: 0.7rem;
        `
      )}>
        <div>
        <FontAwesomeIcon size="2x" icon={["fas", "caravan"]} />
        </div>
        <div>
          Current Location:
          <strong className="block">{content.currentLocation}</strong>
        </div>
      </a>
    </Link>
  );
}
