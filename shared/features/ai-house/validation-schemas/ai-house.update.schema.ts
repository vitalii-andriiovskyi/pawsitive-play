import { object, string, number, boolean, array, mixed, date } from "yup";

const AIHouseUpdateSchema = object({
  _id: string().required("ID is required"),
  name: string().required("Name is required"),
  address: object({
    street: string().required("Street is required"),
    city: string().required("City is required"),
    state: string().required("State is required"),
    zip: number().required("Zip is required"),
    country: string().required("Country is required"),
    apt: string().nullable(),
  }).required(),
  ownerId: string().required("OwnerId is required"),
  rooms: number().required("Rooms is required").min(1),
  area: number().required("Area is required").min(1),
  price: number().required("Price is required").min(0),
  available: boolean().required(),
  features: array().of(string()),
  images: array().of(object({
    src: string().required("Image src is required"),
    alt: string().required("Image alt is required"),
  })).required(),
  builtYear: date().required("Built year is required"),
  lastRenovation: date(),
  metadata: mixed(),
});

export default AIHouseUpdateSchema;
