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
  createdAt: string;
  id: string;
  title: string;
  description: string;
  images: string[];
  amenities?: string[];
  category: string;
  roomCount: number;
  bathroomCount: number;
  propertyArea: number;
  guestCount: number;
  location: Location;
  user: SafeUser;
  price: string;
  rating: number;
};
