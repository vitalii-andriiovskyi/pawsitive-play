/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, models, ObjectId, Schema } from "mongoose";
import dbConnect from "@/back-end/lib/dbConnect";
import { AIHouse } from "@/shared/features/ai-house/domain/ai-house.model";
import ImageSchema from "@/back-end/features/image/image.model";

interface IAIHouse extends Omit<AIHouse, 'ownerId'> {
  ownerId: ObjectId;
}

const AddressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: Number,
  country: String,
  apt: String,
}, { _id: false });


const aiHouseSchema = new Schema<IAIHouse>({
  name: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "users" },
  rooms: { type: Number, required: true },
  area: { type: Number, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  features: [{ type: String }],
  images: [{ type: ImageSchema }],
  builtYear: { type: Date },
  lastRenovation: { type: Date },
  rating: { type: Number },
  metadata: { type: Schema.Types.Mixed },
  likes: [{ type: String }],
}, { timestamps: true });

const fn = async () => {
  await dbConnect();
  return models["ai-houses"] || model("ai-houses", aiHouseSchema);
};

export default await fn();
