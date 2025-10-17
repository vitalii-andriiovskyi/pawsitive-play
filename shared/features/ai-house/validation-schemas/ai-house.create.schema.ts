/* eslint-disable @typescript-eslint/no-explicit-any */
import { object, string, number, boolean, array, mixed, date } from "yup";

const AIHouseCreateSchema = object({
  name: string().required("Name is required"),
  address: object({
    street: string().required("Street is required"),
    city: string().required("City is required"),
    state: string().when('country', {
      is: (val: string) => val === 'US',
      then: () => string().required("State is required"),
      otherwise: () => string().optional()
    } as any),
    zip: number().required("Zip is required"),
    country: string().required("Country is required"),
    apt: string().optional(),
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
  lastRenovation: date().nullable(),
  metadata: mixed(),
});

export default AIHouseCreateSchema;
