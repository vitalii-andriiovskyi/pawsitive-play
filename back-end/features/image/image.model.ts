import { Image } from "@/shared/features/image/domain/image.model";
import { Schema } from "mongoose";
const ImageSchema = new Schema<Image>({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
}, { _id: false });

export default ImageSchema;

