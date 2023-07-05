import { SafeUser } from './index';

export type Listing = {
  amenities?: string[];
  bathroomCount: number;
  category: string;
  createdAt: Date;
  description: string;
  guestCount: number;
  id: string;
  images: string[];
  locationCoordinates: number[];
  locationValue: string;
  price: string;
  propertyArea: number;
  rating: number;
  roomCount: number;
  title: string;
  userId: string | SafeUser;
};
