import React from "react";
import Link from "next/link";

// classes: bg-primary-500 shadow-primary-500/40 hover:shadow-primary-600/40 bg-secondary-500 shadow-secondary-500/40 hover:shadow-secondary-600/40 bg-primary-600 bg-secondary-600 ring-primary-500 ring-secondary-500 !text-primary-500 !text-secondary-500 !text-white text-white bg-gray-500 shadow-gray-500/40 shadow-gray-600/40 bg-gray-600 ring-gray-500 text-gray-500
function Button({
  children,
  variant,
  href,
  hollow,
  target,
  rel,
  smooth,
  type,
}) {
  const Tag = React.useMemo(() => {
    if (type === "submit") {
      return "button";
    }
    if (target || smooth) {
      return "a";
    }
    return Link;
  }, [target]);

  return (
    <Tag
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : null}
      type={type ? type : null}
    >
      <div
        className={`relative inline-flex w-auto px-4 py-3 text-white font-extrabold tracking-widest uppercase text-center justify-center font-display text-sm no-underline rounded-full lg:w-auto lg:px-6 shadow-lg group overflow-hidden hover:transition-shadow duration-300 items-center justify-center bg-${variant}-500 shadow-${variant}-500/40 hover:shadow-${variant}-600/40 cursor-pointer ${
          hollow &&
          `ring-2 ring-inset ring-${variant}-500 bg-transparent !text-${variant}-500`
        }`}
      >
        <div
          className={`absolute -inset-1 transform -translate-x-full group-hover:translate-x-0 bg-${variant}-600 transform transition duration-300 ease-in-out [will-change:transform]`}
        ></div>
        <div
          className={`relative transition duration-300 ${
            hollow && `group-hover:!text-white`
          }`}
        >
          {children}
        </div>
      </div>
    </Tag>
  );
}

Button.defaultProps = {
  variant: "primary",
  hollow: false,
  smooth: false,
};

export default Button;
