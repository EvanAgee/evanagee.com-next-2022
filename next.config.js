module.exports = {
  images: {
    domains: ["blog.evanagee.com", "res.cloudinary.com"],
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
