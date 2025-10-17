import { last } from "lodash-es";

import { SEO } from "@/shared/features/seo/domain/seo.model";
import CONFIG from "@/config/config";

const defineImgUrl =
  (url: string, defaultUrl: string) =>
    ({ w = 1200, h = 630, q = 80 }) =>
      `/responsive-image?url=${url || defaultUrl}&w=${w}&h=${h}&q=${q}`;

export const getMetadata = (seo?: SEO) => {
  const { title, description, image } = seo || {};
  const defaultTitle = CONFIG.website.siteTitle;
  const defaultDescription = CONFIG.website.siteDescription;
  const DOMAIN = CONFIG.website.domain;
  const CANONICAL_DOMAIN =
    CONFIG.website.server === "production"
      ? `${DOMAIN}/`
      : "https://subtitles.com/";
  const STAGING_DOMAIN = "https://subtitles.staging.com/";

  const defaultOgImage = CONFIG.website.defaultOgImage || '/default-og-image.png';
  const fileName = last(image?.src?.split("/")) || '';
  const getOgImageURL = defineImgUrl(fileName, defaultOgImage);
  const ogImageSrc = getOgImageURL({});

  const siteName = CONFIG.website.siteName;

  return {
    CANONICAL_DOMAIN,
    STAGING_DOMAIN,
    title: title || defaultTitle,
    description: description || defaultDescription,
    ogImageSrc,
    siteName,
    title404: `404 - Page not found | ${siteName}`,
  };
};