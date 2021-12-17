import Head from "next/head";
import { useRouter } from "next/router";
import settings from "@/settings";
function Meta({ title, ogData }) {
  const location = useRouter();
  const defaultData = settings.pathData.find(
    (p) => p.path === location.pathname
  );

  return (
    <Head>
      <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.ico" />
      <meta
        property="og:type"
        content={ogData?.og_type ? ogData?.og_type : "website"}
      />
      <meta
        property="og:description"
        content={
          ogData?.og_description
            ? ogData?.og_description
            : "I’m a web application developer who specializes in WordPress and JavaScript development."
        }
      />
      <meta
        property="description"
        content={
          ogData?.og_description
            ? ogData?.og_description
            : "I’m a web application developer who specializes in WordPress and JavaScript development."
        }
      />
      <meta
        property="og:locale"
        content={ogData?.og_locale ? ogData?.og_locale : "en_US"}
      />
      <meta
        property="og:image"
        content={
          ogData?.og_image
            ? ogData?.og_image[0].url
            : "https://res.cloudinary.com/evanagee/image/upload/v1551277282/evanagee.com/bg-2018-code.jpg"
        }
      />
      <link rel="canonical" href={`https://evanagee.com${location.asPath}`} />
      <title>
        {`${title ? `${title} —` : ""} ${defaultData.title} — Evan Agee`}
      </title>
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={`https://evanagee.com${location.asPath}`}
      />
    </Head>
  );
}

Meta.defaultProps = {
  title: false,
  ogData: false,
};

export default Meta;
