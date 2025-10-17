export interface Image {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}