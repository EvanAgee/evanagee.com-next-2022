import React from "react";
import { Helmet } from "react-helmet-async";

function Meta({ children }) {
  return <Helmet titleTemplate="%s">{children}</Helmet>;
}

export default Meta;
