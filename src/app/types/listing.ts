import { SafeUser } from './index';

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
    locationValue: string;
    locationCoordinates: number[];
    userId: string | SafeUser;
    price: string;
    rating: number;
}