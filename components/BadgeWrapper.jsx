import React from "react";
import Badge from "@/components/Badge";
import classNames from "classnames";

function BadgeWrapper({ title, children, anchor, className }) {
  return (
    <>
      {anchor && <a name={anchor}></a>}
      <div className={classNames("badge-wrapper relative", className)}>
        <Badge>{title}</Badge>
        {children}
      </div>
    </>
  );
}

export default React.memo(BadgeWrapper);
