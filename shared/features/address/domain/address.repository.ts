import { AddressBasic } from "@/shared/features/address/domain/address.model";

export const getEmptyAddress = (): AddressBasic => ({
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
  apt: "",
});

