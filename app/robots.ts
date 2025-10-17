import CONFIG from "@/config/config";

export default function robots() {
  if (CONFIG.website.server !== "production") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    // sitemap: 'https://acme.com/sitemap.xml',
  };
}
