export type Location = {
  coordinates: number[];
  country: string;
  place: string;
  postCode: number;
  region: string;
  street: string;
};

export class ListingDto {
  amenities: string[];
  bathroomCount: number;
  category: string;
  description: string;
  guestCount: number;
  images: string[];
  location: Location;
  price: string;
  propertyArea: number;
  rating: number;
  roomCount: number;
  title: string;
}
