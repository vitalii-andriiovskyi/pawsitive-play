import { COUNTRIES } from "@/shared/features/country/domain/countries";

export const getCountry = (code: string) => COUNTRIES.find(c => c.code === code);

