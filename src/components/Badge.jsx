import React from "react";
import Link from "next/link";
import WpApiContent from "@/components/WpApiContent";

function Badge({ children, href }) {
  const b = React.useMemo(() => {
    return (
      <div className="up-title up-title-sm absolute top-0 transform left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-md border border-gray-300 dark:border-gray-100 px-2 lg:px-3 py-2 leading-none m-0 z-10 text-center">
        <WpApiContent content={children} />
      </div>
    );
  }, [children]);
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className="text-inherit cursor-pointer hover:text-secondary-500">
            {b}
          </a>
        </Link>
      ) : (
        b
      )}
    </>
  );
}

export default React.memo(Badge);
