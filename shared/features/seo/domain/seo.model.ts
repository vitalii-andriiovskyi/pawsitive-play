import { Image } from "@/shared/features/image/domain/image.model";

export interface SEO {
  title: string;
  description: string;
  image: Image;
}

export type MetadataProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}