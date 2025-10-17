import getId from "@/front-end/utils/getId";
import { Image } from "@/shared/features/image/domain/image.model";


export const getDefaultImage = (): Image => ({
  id: getId(),
  src: "",
  alt: "",
});
