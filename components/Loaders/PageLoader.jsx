import React from "react";
import Loader from "@/components/Loaders/Loader";

function PageLoader({ children }) {
  return (
    <div className="h-96 flex flex-col items-center justify-center">
      <Loader />
      {children}
    </div>
  );
}

export default PageLoader;
