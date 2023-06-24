export type ListingCategory = "House" | "Residential" | "Apartment" | "Townhouse" | "Building" | "Condominium" | "Villa" | "Bungalow";

export type Listing = {
    createdAt: string;
    id: string;
    title: string;
    description: string;
    images: string[];
    category: ListingCategory;
    roomCount: number;
    bathroomCount: number;
    propertyArea: number;
    guestCount: number;
    locationValue: string;
    userId: string;
    price: string;
}