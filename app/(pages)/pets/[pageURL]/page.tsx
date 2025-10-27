import { Metadata, ResolvingMetadata } from "next";
import UserService from "@/back-end/features/user/user.service";
import SWRProvider from "@/front-end/context/swr-provider";
import { getUserSWRKey } from "@/front-end/features/user/use-cases/user.swr.keys";
import Layout from "@/front-end/components/core/layout/Layout";
import { getMetadata } from "@/shared/features/seo/domain/seo.repository";
import { MetadataProps, SEO } from "@/shared/features/seo/domain/seo.model";
import CONFIG from "@/config/config";
import PetService from "@/back-end/features/pet/pet.service";

const getData = async (pageURL: string) => {
  const [user, pet] = await Promise.all([
    UserService.getSessionUser(),
    PetService.getByUrl(pageURL),
  ]);
  return {
    user,
    swr: {
      fallback: { [getUserSWRKey()]: user, pet_draft: pet },
    },
  };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { pageURL } = await params;
  const pet = await PetService.getByUrl(pageURL as string);
  const { seo: petSEO } = pet || {};
  const seo: SEO = {
    title: petSEO?.title || "Not Found | PawTime",
    description:
      petSEO?.description ||
      "Discover your perfect companion from our diverse range of pets, each waiting for a loving home.",
    image: {
      id: petSEO?.image?.id || "",
      alt: petSEO?.image?.alt || "Pets",
      src: petSEO?.image?.src || "",
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
interface PageProps {
  params: Promise<{ pageURL: string }>;
}
export default async function Pet({ params }: PageProps) {
  const { pageURL } = await params;
  const { swr } = await getData(pageURL);
  return (
    <SWRProvider value={swr}>
      <Layout>
        <section>
          <div className="container mx-auto h-(--section-height) p-5">
            <h1 className="text-primary-900 font-primary text-5xl font-bold capitalize md:text-7xl">
              Pet Details
            </h1>
          </div>
        </section>
      </Layout>
    </SWRProvider>
  );
}
