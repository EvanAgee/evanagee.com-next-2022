const settings = {
  backendBase: "https://blog.evanagee.com",
  apiBase: "https://blog.evanagee.com/wp-json/wp/v2",
  acfApiBase: "https://blog.evanagee.com/wp-json/acf/v3",
  apiSettings: {
    perPageInfinite: 11,
    perPageStaticPaths: 25
  },
  ISRrevalidate: 10,
  functionBase:
    process.env.NODE_ENV !== "development" ? "/.netlify/functions" : "/api",
  googleAnalyticsID: "G-9Y1P8VDZWB",
  gtmID: "GTM-W47SLZT",
  enableComments: true,
  pathData: [
    {
      path: "/",
      component: "Home",
      linkText: "Home",
      navExact: true,
      title: "Web Application Developer",
      exact: true,
    },
    {
      path: "/blog/categories/[filterTerm]",
      component: "Blog",
      linkText: "BlogFilters",
      title: "Blog",
      parentLink: "/blog",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/blog/tags/[filterTerm]",
      component: "Blog",
      linkText: "BlogFilters",
      title: "Blog",
      parentLink: "/blog",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/blog/[slug]",
      component: "BlogDetail",
      linkText: "BlogDetail",
      title: "Blog",
      parentLink: "/blog",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/blog",
      component: "Blog",
      linkText: "Blog",
      title: "Blog",
      exact: true,
    },
    {
      path: "/milestones",
      component: "Milestones",
      linkText: "Milestones",
      disabledInNav: true || process.env.NODE_ENV !== "development",
      title: "Milestones",
    },
    {
      path: "/videos",
      component: "Videos",
      linkText: "Videos",
      disabledInNav: true || process.env.NODE_ENV !== "development",
      title: "My Videos",
    },
    {
      path: "/rv-travels",
      component: "Map",
      linkText: "RV Living",
      title: "RV Living",
      theme: "dark",
    },
    {
      path: "/photos/[slug]",
      component: "Photo",
      title: "My Photos",
      parentLink: "/photos",
      disabledInNav: true,
      theme: "dark",
      exact: true,
    },
    {
      path: "/photos/photo_album/[filterTerm]",
      component: "Photos",
      title: "My Photos",
      parentLink: "/photos",
      theme: "dark",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/photos/photo_tags/[filterTerm]",
      component: "Photos",
      title: "My Photos",
      parentLink: "/photos",
      theme: "dark",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/photos",
      component: "Photos",
      linkText: "Photos",
      title: "My Photos",
      theme: "dark",
      exact: true,
    },
    {
      path: "/portfolio/tags/[filterTerm]",
      component: "Portfolio",
      title: "Portfolio",
      parentLink: "/portfolio",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/portfolio/[slug]",
      component: "Project",
      linkText: "My Work",
      title: "Portfolio",
      parentLink: "/portfolio",
      // theme: "dark",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/portfolio",
      component: "Portfolio",
      linkText: "My Work",
      title: "Portfolio",
    },
    {
      path: "/resume",
      component: "Resume",
      linkText: "Resume",
      title: "My Resume",
    },
    {
      path: "/films",
      component: "Films",
      linkText: "Film Diary",
      title: "Film Diary",
    },
    // {
    //   path: "/cigars/:brand/:slug",
    //   component: "Cigars",
    //   title: "Cigars",
    //   theme: "dark",
    //   parentLink: "/cigars",
    //   disabledInNav: true,
    //   disabled: process.env.NODE_ENV !== "development",
    //   exact: true,
    // },
    // {
    //   path: "/cigars",
    //   component: "Cigars",
    //   title: "Cigars",
    //   linkText: "Cigars",
    //   theme: "dark",
    //   disabledInNav: process.env.NODE_ENV !== "development",
    //   disabled: process.env.NODE_ENV !== "development",
    //   exact: true,
    // },
    {
      path: "/search/[term]",
      component: "Search",
      linkText: "Search",
      title: "Search",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/search",
      component: "Search",
      linkText: "Search",
      title: "Search",
      exact: true,
      disabledInNav: true,
    },
    {
      path: "/404",
      component: "NotFound",
      title: "Whoops",
      disabledInNav: true,
    },
  ],
};

export default settings;
