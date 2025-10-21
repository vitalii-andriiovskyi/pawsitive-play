/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata, ResolvingMetadata } from "next";
import { MetadataProps, SEO } from "@/shared/features/seo/domain/seo.model";
import { getMetadata } from "@/shared/features/seo/domain/seo.repository";

import UserService from "@/back-end/features/user/user.service";
import SWRProvider from "@/front-end/context/swr-provider";
import { getUserSWRKey } from "@/front-end/features/user/use-cases/user.swr.keys";
import Layout from "@/front-end/components/core/layout/Layout";
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
  { params }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const data: any = null;
  try {
    // data = await Repository.getById(id, "name");
  } catch (error) {
    console.log("error", error);
  }
  const seo: SEO = {
    title: `${data?.name || "Service"} | PawTime`,
    description: data?.description,
    image: {
      id: "",
      alt: data?.name,
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
    metadataBase: new URL(
      `${CONFIG.website.domain}/dashboard/pawsy-times/${id}`,
    ),
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PawPlayPage(props: PageProps) {
  const params = await props.params;
  const { swr } = await getData();
  return (
    <SWRProvider value={swr}>
      <Layout>
        <div className="container mx-auto p-5">{params.id}</div>
      </Layout>
    </SWRProvider>
  );
}
