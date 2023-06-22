import { Listing } from "../types/listing";

export const listings: Listing[] = [
    {
        createdAt: "2023/06/22",
        id: "1",
        title: "Ejemplo 1",
        description: "This is the exmaple number 1",
        imageSrc: "../assets/images/house.jpg",
        category: "Mountain",
        roomCount: 8,
        bathroomCount: 4,
        guestCount: 3,
        locationValue: "abc",
        userId: "1",
        price: 9800
    },
    {
        createdAt: "2023/03/16",
        id: "2",
        title: "Ejemplo 2",
        description: "This is the exmaple number 2",
        imageSrc: "../assets/images/house.jpg",
        category: "Beach",
        roomCount: 3,
        bathroomCount: 2,
        guestCount: 1,
        locationValue: "asc",
        userId: "1",
        price: 6600
    }
]