import { Metadata, ResolvingMetadata } from "next";
import { MetadataProps, SEO } from "@/shared/features/seo/domain/seo.model";

import UserService from "@/back-end/features/user/user.service";
import SWRProvider from "@/front-end/context/swr-provider";
import { getUserSWRKey } from "@/front-end/features/user/use-cases/user.swr.keys";
import Layout from "@/front-end/components/core/layout/Layout";
import { getMetadata } from "@/shared/features/seo/domain/seo.repository";
import CONFIG from "@/config/config";

const getData = async () => {
  const user = await UserService.getSessionUser();
  return {
    user,
    swr: {
      fallback: { [getUserSWRKey()]: user },
    },
  };
};

export async function generateMetadata(
  {}: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  // const res = await fetch(
  //   `${CONFIG.website.domain}/api/product/homepage?isHomepage=true`,
  //   {
  //     cache: "no-store",
  //   }
  // ).then((res) => res.json());
  // const { seo } = res || {};
  const seo: SEO = {
    title: "My Pawsy Times | PawTime",
    description: "My Pawsy Times",
    image: {
      id: "",
      alt: "My Pawsy Times",
      src: "",
    },
  };
  const { image } = seo || {};
  const { title, description, ogImageSrc, CANONICAL_DOMAIN, siteName } =
    getMetadata(seo || {});

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    description,
    metadataBase: new URL(`${CONFIG.website.domain}/dashboard/pawsy-times`),
    openGraph: {
      title,
      description,
      url: "/",
      siteName,
      images: [
        {
          url: ogImageSrc, // Must be an absolute URL
          width: 1200,
          height: 630,
          alt: image?.alt || "",
        },
        ...previousImages,
      ],
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: CANONICAL_DOMAIN,
    },
  };
}

export default async function PawsyTimesPage() {
  const { swr } = await getData();
  return (
    <SWRProvider value={swr}>
      <Layout>
        <div>PawsyTimesPage</div>
      </Layout>
    </SWRProvider>
  );
}
