import { Metadata, ResolvingMetadata } from "next";
import UserService from "@/back-end/features/user/user.service";
import SWRProvider from "@/front-end/context/swr-provider";
import { getUserSWRKey } from "@/front-end/features/user/use-cases/user.swr.keys";
import Layout from "@/front-end/components/core/layout/Layout";
import { getMetadata } from "@/shared/features/seo/domain/seo.repository";
import { MetadataProps, SEO } from "@/shared/features/seo/domain/seo.model";
import CONFIG from "@/config/config";
import AIHouseRepository from "@/back-end/features/ai-house/ai-house.repository";
import AIHouses from "@/front-end/features/ai-house/components/AIHouses";
import { getAIHousesSWRKey } from "@/front-end/features/ai-house/use-cases/ai-house.swr.keys";

const getData = async () => {
  const [user, aiHouses] = await Promise.all([
    UserService.getSessionUser(),
    AIHouseRepository.getAll(),
  ]);
  return {
    user,
    swr: {
      fallback: { [getUserSWRKey()]: user, [getAIHousesSWRKey()]: aiHouses },
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
    title: "AI Houses | PawTime",
    description:
      "Explore our collection of AI-generated house designs, perfect for your next project or inspiration.",
    image: {
      id: "",
      alt: "AI Houses",
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

export default async function Home() {
  const { swr } = await getData();
  return (
    <SWRProvider value={swr}>
      <Layout>
        <section>
          <div className="container mx-auto h-(--section-height) p-5">
            <h1 className="text-primary-900 font-primary text-5xl font-bold capitalize md:text-7xl">
              AI Houses
            </h1>
            <AIHouses />
          </div>
        </section>
      </Layout>
    </SWRProvider>
  );
}
