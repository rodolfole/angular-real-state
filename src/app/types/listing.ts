import { SafeUser } from './index';

export type Location = {
  coordinates: number[];
  country: string;
  region: string;
  postCode: number;
  place: string;
  street: string;
};

export type Listing = {
  amenities?: string[];
  category: string;
  createdAt: string;
  description: string;
  id: string;
  images: string[];
  location: Location;
  price: string;
  rating: number;
  title: string;
  user: SafeUser;
  features: {
    roomCount: number;
    bathroomCount: number;
    propertyArea: number;
  },
};
