import Button from "@/components/Button";
import { HeaderContext } from "@/context/HeaderContext";
import Link from "next/link";
import React from "react";

function NotFound() {
  const { setPageTitle } = React.useContext(HeaderContext);

  React.useEffect(() => {
    setPageTitle("Well this is akward - Page Not Found");
  }, [setPageTitle]);

  return (
    <div
      data-test-id="404-page"
      className="bg-white min-h-full flex flex-col lg:relative"
    >
      <div className="flex-grow flex flex-col">
        <main className="flex-grow flex flex-col bg-white">
          <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 my-auto py-16 sm:py-32">
              <h6 className="">404 error &mdash; Well this is akward...</h6>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Button href="/">
                  Go back home <span aria-hidden="true">&nbsp; &rarr;</span>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="https://res.cloudinary.com/evanagee/image/upload/c_fill,h_800,w_800/v1550789111/flickr-photos/66174073.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default NotFound;
