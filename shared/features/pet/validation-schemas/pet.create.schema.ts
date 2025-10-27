import * as yup from "yup";

const PetCreateSchema = yup.object().shape({
  name: yup.string().required("Pet name is required"),
  species: yup.string().required("Species is required"),
  breed: yup.string().optional(),
  age: yup.number().positive("Age must be positive").optional(),
  description: yup.string().optional(),
  available: yup.boolean().optional(),
  images: yup.array().of(yup.string()).optional(),
});

export default PetCreateSchema;
