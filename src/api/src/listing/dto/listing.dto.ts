export type Feature = {
  bathroomCount: number;
  propertyArea: number;
  roomCount: number;
};

export type Image = {
  publicId: string;
  url: string;
};

export type Location = {
  address: string;
  coordinates: number[];
  country: string;
  place: string;
  placeName: string;
  postCode: number;
  region: string;
};

export class ListingDto {
  amenities: string[];
  categories: string[];
  description: string;
  features: Feature;
  images: Image[];
  location: Location;
  price: string;
  rating: number;
  title: string;
}
