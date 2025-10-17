import { Image } from "@/shared/models/image";

interface Pet {
  name: string;
  age: number;
  breed: string;
  vaccinated: boolean;
  image: Image;
}

interface Product {
  name: string;
  description: string;
  image: Image;
  price: number;
  inStock: boolean;
}