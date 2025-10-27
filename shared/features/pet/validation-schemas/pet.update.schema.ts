import * as yup from "yup";

const PetUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  species: yup.string().optional(),
  breed: yup.string().optional(),
  age: yup.number().positive("Age must be positive").optional(),
  description: yup.string().optional(),
  available: yup.boolean().optional(),
  images: yup.array().of(yup.string()).optional(),
});

export default PetUpdateSchema;
