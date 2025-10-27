import { Metadata, ResolvingMetadata } from "next";
import UserService from "@/back-end/features/user/user.service";
import SWRProvider from "@/front-end/context/swr-provider";
import { getUserSWRKey } from "@/front-end/features/user/use-cases/user.swr.keys";
import Layout from "@/front-end/components/core/layout/Layout";
import { getMetadata } from "@/shared/features/seo/domain/seo.repository";
import { MetadataProps, SEO } from "@/shared/features/seo/domain/seo.model";
import CONFIG from "@/config/config";
import PetService from "@/back-end/features/pet/pet.service";

const getData = async () => {
  const [user, pets] = await Promise.all([
    UserService.getSessionUser(),
    PetService.getAll(),
  ]);
  return {
    user,
    swr: {
      fallback: {
        [getUserSWRKey()]: user,
        pets_draft: pets,
      },
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
    title: "Pets | PawTime",
    description:
      "Discover your perfect companion from our diverse range of pets, each waiting for a loving home.",
    image: {
      id: "",
      alt: "Pets",
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

export default async function PetsPage() {
  const { swr } = await getData();
  return (
    <SWRProvider value={swr}>
      <Layout>
        <section>
          <div className="container mx-auto h-(--section-height) p-5">
            <h1 className="text-primary-900 font-primary text-5xl font-bold capitalize md:text-7xl">
              Pets
            </h1>
            ...{/* Add your pets listing component here */}
          </div>
        </section>
      </Layout>
    </SWRProvider>
  );
}
