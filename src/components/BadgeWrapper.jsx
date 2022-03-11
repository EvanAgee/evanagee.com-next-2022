import React from "react";
import Badge from "@/components/Badge";
import classNames from "classnames";

function BadgeWrapper({ title, children, anchor, className, link }) {
  return (
    <>
      {anchor && <a name={anchor}></a>}
      <div className={classNames("badge-wrapper relative", className)}>
        <Badge href={link}>{title}</Badge>
        {children}
      </div>
    </>
  );
}

BadgeWrapper.defaultProps = {
  title: "",
  children: "",
  anchor: false,
  className: "",
  link: false,
};

export default React.memo(BadgeWrapper);
