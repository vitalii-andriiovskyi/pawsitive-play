import * as yup from "yup";

const PetCreateSchema = yup.object().shape({
  name: yup.string().required("Pet name is required"),
  species: yup.string().required("Species is required"),
  breed: yup.string().optional(),
  age: yup.number().positive("Age must be positive").optional(),
  description: yup.string().optional(),
  available: yup.boolean().optional(),
  images: yup.array().of(yup.object().shape({
    id: yup.string().required("Image ID is required"),
    src: yup.string().url("Invalid URL").required("Image URL is required"),
    alt: yup.string().optional(),
  })).optional(),
  abilities: yup.array().of(yup.string()).optional(),
  content: yup.string().required("Content is required"),
  url: yup.string().required("URL is required"),
  previewImage: yup.object().shape({
    id: yup.string().required("Image ID is required"),
    src: yup.string().url("Invalid URL").required("Image URL is required"),
    alt: yup.string().optional(),
  }).required("Preview image is required"),
  seo: yup.object().shape({
    title: yup.string().required("SEO title is required"),
    description: yup.string().required("SEO description is required"),
    keywords: yup.array().of(yup.string()).optional(),
  }).required("SEO is required"),
  videos: yup.array().of(yup.string().url("Invalid video URL")).optional(),
});

export default PetCreateSchema;
