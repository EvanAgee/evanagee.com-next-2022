import React from "react";
import Link from "next/link";
import { css } from "@emotion/css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function CurrentLocation({ className }) {
  const [location, setLocation] = React.useState(false);

  React.useEffect(async () => {
    const options = await axios.get(
      `https://blog.evanagee.com/wp-json/acf/v3/options/options`
    );
    if (options?.data?.acf?.current_location)
      return setLocation(options.data.acf.current_location);
    return setLocation(false);
  }, []);

  if (!location) return null;

  return (
    <Link href="/blog/were-moving-into-a-5th-wheel">
      <a
        className={classNames(
          "w-auto border-2 border-white border-opacity-50 text-white hover:bg-primary-500 hover:bg-opacity-30 rounded-md font-display inline-flex justify-center items-center py-2 px-4 gap-4 text-left uppercase tracking-widest whitespace-nowrap",
          className,
          css`
            font-size: 0.7rem;
          `
        )}
      >
        <FontAwesomeIcon size="2x" icon={["fas", "caravan"]} />
        <div>
          Current Location:
          <strong className="block">{location}</strong>
        </div>
      </a>
    </Link>
  );
}
