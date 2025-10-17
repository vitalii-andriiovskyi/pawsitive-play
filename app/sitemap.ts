// import Content from "@/modules/content-pages/content.module";

import CONFIG from "@/config/config";
import listStaticRoutes from "@/shared/lib/listStaticRoutes";

export default async function sitemap() {
  const routes = listStaticRoutes(process.cwd() + "/app");

  // const everyAlternativePage =
  //   await Content.getActiveAlternativeLandingPagesURLs();
  // const everyAlternativePageUrl = everyAlternativePage
  //   .filter((el) => el?.data?.common?.url)
  //   .map((el) => `/join/${el?.data?.common?.url}`);

  // return routes.concat(everyAlternativePageUrl).map((el) => ({
  return routes.map((el) => ({
    url: `${CONFIG.website.domain}${el}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));
}
