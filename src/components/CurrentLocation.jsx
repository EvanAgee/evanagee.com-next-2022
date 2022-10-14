import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import axios from "axios";
import classNames from "classnames";
import { css } from "@emotion/css";
import settings from "@/settings";

export default function CurrentLocation({ className, dark }) {
  const [location, setLocation] = React.useState(false);

  React.useEffect(async () => {
    const options = await axios.get(
      `${settings.acfApiBase}/options/options`
    );
    if (options?.data?.acf?.current_location)
      return setLocation(options.data.acf.current_location);
    return setLocation(false);
  }, []);

  if (!location) return null;

  return (
    <Link href="/rv-travels" className="">
      <a
        className={classNames(
          "w-auto border-2 border-white dark:border-gray-500 border-opacity-50 text-white hover:bg-primary-500 hover:bg-opacity-30 rounded-md font-display inline-flex justify-center items-center py-2 px-4 gap-4 text-left uppercase tracking-widest whitespace-nowrap no-underline text-[0.7rem]",
          className,
        )}
      >
        <FontAwesomeIcon size="2x" icon={["fas", "caravan"]} />
        <div>
          Current Location:
          <strong className="block text-inherit">{location}</strong>
        </div>
      </a>
    </Link>
  );
}
