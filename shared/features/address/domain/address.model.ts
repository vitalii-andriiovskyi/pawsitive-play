export interface Address {
  _id: string; // db sets it
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  apt: string;
  createdAt: Date; // db sets it
  updatedAt: Date; // db sets it
}

export type AddressBasic = Omit<Address, '_id' | 'createdAt' | 'updatedAt'>;