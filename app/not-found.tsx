import { getMetadata } from "@/shared/features/seo/domain/seo.repository";
import Layout from "@/front-end/components/core/layout/Layout";
import ErrorMain from "@/front-end/components/core/error-main/ErrorMain";
import UserService from "@/back-end/features/user/user.service";
import { getUserSWRKey } from "@/front-end/features/user/use-cases/user.swr.keys";
import SWRProvider from "@/front-end/context/swr-provider";

export async function generateMetadata() {
  const { CANONICAL_DOMAIN, title404 } = getMetadata();

  return {
    title: title404,
    alternates: {
      canonical: CANONICAL_DOMAIN,
    },
  };
}

const getData = async () => {
  const user = await UserService.getSessionUser();
  return {
    user,
    swr: {
      fallback: { [getUserSWRKey()]: user },
    },
  };
};

export default async function NotFound() {
  const { swr } = await getData();

  return (
    <SWRProvider value={swr}>
      <Layout>
        <ErrorMain />
      </Layout>
    </SWRProvider>
  );
}
