import { SafeUser } from './index';

export type Location = {
  coordinates: number[];
  country: string;
  region?: string;
  place?: string;
  postCode?: number;
  address?: string;
  placeName: string;
};

export type ListingImage = {
  url: string;
  public_id: string;
}

export type Listing = {
  amenities?: string[];
  category: string;
  createdAt: string;
  description: string;
  id: string;
  images: ListingImage[];
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
