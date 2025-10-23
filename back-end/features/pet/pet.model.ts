import { model, models, Schema } from "mongoose";
import dbConnect from "@/back-end/lib/dbConnect";
import { Pet } from "@/shared/features/pet/domain/pet.model";
import ImageSchema from "@/back-end/features/image/image.model";
import SEOSchema from "@/back-end/features/seo/seo.model";

const petSchema = new Schema<Pet>({
  species: { type: String, required: true },
  breed: { type: String, required: true },
  videos: [{ type: String }],
  images: [{ type: ImageSchema }],
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  previewImage: { type: ImageSchema, required: true },
  abilities: [{ type: String }],
  age: { type: Number, required: true },
  seo: { type: SEOSchema, required: true },
}, { timestamps: true });

const fn = async () => {
  await dbConnect();
  return models["pets"] || model("pets", petSchema);
};

export default await fn();
