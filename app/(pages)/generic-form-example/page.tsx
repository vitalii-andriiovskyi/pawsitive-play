import { Metadata, ResolvingMetadata } from "next";
import UserService from "@/back-end/features/users/user.service";
import SWRProvider from "@/front-end/context/swr-provider";
import { getUserSWRKey } from "@/front-end/features/user/use-cases/user.swr.keys";
import Layout from "@/front-end/components/core/layout/Layout";
import { getMetadata } from "@/shared/features/seo/domain/seo.repository";
import { MetadataProps, SEO } from "@/shared/features/seo/domain/seo.model";
import CONFIG from "@/config/config";
import GenericForm from "@/front-end/components/ai-samples/generic-form/GenericForm";

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
    title: "Generic Form | PawTime",
    description:
      "A pet play café and activity center where people can come to play, cuddle, train, or even participate in games with dogs and cats — without owning one. Perfect for those who love animals but can't keep pets due to lifestyle, allergies, housing rules, or time constraints.",
    image: {
      id: "",
      alt: "A pet play café and activity center",
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
    metadataBase: new URL(`${CONFIG.website.domain}`),
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

export default async function GenericFormExample() {
  const { swr } = await getData();
  return (
    <SWRProvider value={swr}>
      <Layout>
        <GenericForm />
      </Layout>
    </SWRProvider>
  );
}
