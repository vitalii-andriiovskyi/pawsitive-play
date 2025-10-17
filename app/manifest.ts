import CONFIG from "@/config/config";

export default function manifest() {
  return {
    name: `${CONFIG.website.siteName} App`,
    short_name: CONFIG.website.siteName,
    description: CONFIG.website.siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
