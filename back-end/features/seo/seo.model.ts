import { SEO } from "@/shared/features/seo/domain/seo.model";
import ImageSchema from "@/back-end/features/image/image.model";
import { Schema } from "mongoose";

const SEOSchema = new Schema<SEO>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: ImageSchema, required: true },
  keywords: { type: [String], required: false },
}, { _id: false });

export default SEOSchema;