module.exports = {
  images: {
    domains: [
      "blog.evanagee.com",
      "res.cloudinary.com",
      "wordpressevanage-mcxpt59328.live-website.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/tag/:slug",
        destination: "/search/:slug",
        permanent: true,
      },
    ];
  },
};
