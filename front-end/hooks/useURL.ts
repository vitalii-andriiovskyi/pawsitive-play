"use client";
import { useSearchParams, usePathname } from "next/navigation";

const useURL = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const url = new URL(pathname);
  url.search = searchParams.toString();
  return url;
};

export default useURL;
