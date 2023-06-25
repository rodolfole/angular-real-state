import { Listing } from "../types/listing";

export const listings: Listing[] = [
    {
        createdAt: "2023/06/22",
        id: "1",
        title: "Buckingham Palace",
        description: "Fames tincidunt volutpat elit malesuada senectus. Interdum purus, iaculis feugiat duis nunc aliquam. Feugiat diam quam augue vel pharetra adipiscing. Ultricies ridiculus venenatis non erat nunc volutpat, odio a, ante. Volutpat pharetra rhoncus cras malesuada a ipsum. Phasellus a, arcu, amet purus phasellus tristique.",
        images: [],
        amenities: [
            "air_conditioner",
            "fridge",
            "garage",
            "security_box",
            "security_camera",
            "tv",
        ],
        category: "Residential",
        roomCount: 8,
        bathroomCount: 4,
        guestCount: 3,
        locationValue: "Peshastin, Washington, Estados Unidos",
        propertyArea: 530,
        userId: "1",
        price: "270,000"
    },
    {
        createdAt: "2023/03/16",
        id: "2",
        title: "Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion",
        description: "Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.",
        images: [],
        amenities: [
            "air_conditioner",
            "fridge",
            "garage",
            "gym",
            "security_box",
            "security_camera",
            "tv",
            "washing_machine"
        ],
        category: "Bungalow",
        roomCount: 3,
        bathroomCount: 2,
        guestCount: 1,
        locationValue: "Hildale, Utah, Estados Unidos",
        propertyArea: 320,
        userId: "1",
        price: "320,000"
    }
]