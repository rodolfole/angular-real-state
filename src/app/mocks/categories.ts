export interface Category {
    label: string;
    icon: string;
    description: string;
}

export const categories: Category[] = [
    {
        label: "Beach",
        icon: "far fa-umbrella-beach",
        description: "This property is close to the beach!",
    },
    {
        label: "Windmills",
        icon: "fas fa-wind-turbine",
        description: "This property is has windmills!",
    },
    {
        label: "Pools",
        icon: "fas fa-swimming-pool",
        description: "This is property has a beautiful pool!",
    },
    {
        label: "Islands",
        icon: "fal fa-island-tropical",
        description: "This property is on an island!",
    },
    {
        label: "Skiing",
        icon: "fas fa-skiing",
        description: "This property has skiing activies!",
    },
    {
        label: "Castles",
        icon: "far fa-chess-rook-alt",
        description: "This property is an ancient castle!",
    },
];
