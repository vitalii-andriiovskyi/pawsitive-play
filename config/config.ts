const CONFIG = {
  website: {
    domain: process.env.DOMAIN,
    server: process.env.SERVER,
    siteName: process.env.SITE_NAME,
    siteTitle: process.env.SITE_TITLE,
    siteDescription: process.env.SITE_DESCRIPTION,
    defaultOgImage: process.env.DEFAULT_OG_IMAGE,
  },
  db: {
    mongodbUri: process.env.MONGODB_URI,
  }
};

export default CONFIG;