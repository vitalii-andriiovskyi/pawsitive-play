/* eslint-disable @typescript-eslint/no-explicit-any */

import { Image } from "@/shared/features/image/domain/image.model";

export interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  image: Image;
  availableFrom: Date | null;
  pet: string;
  serviceType?: string;
  isRecurring: boolean;
  phone: string;
}

export const serviceData: ServiceData = {
  title: '',
  subtitle: '',
  description: '',
  image: {
    id: '',
    src: '',
    alt: '',
    width: 0,
    height: 0,
  },
  availableFrom: null, // date
  pet: '', // dropdown
  serviceType: '', // radio
  isRecurring: false, // switch
  phone: '',
};