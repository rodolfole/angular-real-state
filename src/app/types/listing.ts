import { SafeUser } from './index';
export type ListingCategory = "House" | "Residential" | "Apartment" | "Townhouse" | "Building" | "Condominium" | "Villa" | "Bungalow";

export type Listing = {
    createdAt: string;
    id: string;
    title: string;
    description: string;
    images: string[];
    amenities?: string[];
    category: ListingCategory;
    roomCount: number;
    bathroomCount: number;
    propertyArea: number;
    guestCount: number;
    locationValue: string;
    locationCoordinates: number[];
    userId: string | SafeUser;
    price: string;
    rating: number;
}