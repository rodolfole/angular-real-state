export type Role = 'Admin' | 'Agent' | 'New';

export type Location = {
  coordinates: number[];
  country: string;
  region: string;
  postCode: number;
  place: string;
  street: string;
};

export type Listing = {
  amenities?: string[];
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
  userId: User;
};

export type User = {
  email: string | null;
  favoriteIds: string[];
  hashedPassword: string;
  image: string | null;
  name: string | null;
  phone: string | null;
  role: Role;
};

export const listings: Listing[] = [
  {
    title: 'Buckingham Palace',
    description:
      'Fames tincidunt volutpat elit malesuada senectus. Interdum purus, iaculis feugiat duis nunc aliquam. Feugiat diam quam augue vel pharetra adipiscing. Ultricies ridiculus venenatis non erat nunc volutpat, odio a, ante. Volutpat pharetra rhoncus cras malesuada a ipsum. Phasellus a, arcu, amet purus phasellus tristique.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'security_box',
      'security_camera',
      'tv',
    ],
    category: 'Residential',
    roomCount: 8,
    bathroomCount: 4,
    guestCount: 3,
    location: {
      coordinates: [2.2137, 46.2276],
      country: 'United States',
      region: 'Washington',
      postCode: 98847,
      place: 'Peshastin',
      street: 'Allen Lane',
    },
    propertyArea: 530,
    userId: {
      email: 'user1@example.com',

      favoriteIds: [],

      image: 'assets/images/agent.jpg',
      name: 'Camila Herrera',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.1,
    price: '270,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Apartment',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [12.5674, 41.8719],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'Canyon Street',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.2,
    price: '320,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Villa',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [14.5501, 47.5162],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'E Government Avenue N',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.3,
    price: '430,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Townhouse',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [19.1451, 51.9194],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'Memorial Street',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.4,
    price: '670,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Townhouse',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [10.4515, 51.1657],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'W Newel Avenue N',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.5,
    price: '515,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Bungalow',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [4.4699, 50.5039],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'N Willow Street W',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.6,
    price: '632,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'House',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [2.3522, 48.8566],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'Pinion Street',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.7,
    price: '745,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Bungalow',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [27.9534, 53.7098],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'Nibbelink Road',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.8,
    price: '700,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Bungalow',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [24.9668, 45.9432],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'Saunders Road',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 1.9,
    price: '260,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Condominium',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [15.2, 45.1],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'Stewart Ranch Road',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 2,
    price: '380,000',
  },
  {
    title: 'Zion EcoCabin: jacuzzi privado, vistas al cañón de Zion',
    description:
      'Tortor consectetur et pharetra dui interdum gravida. Ullamcorper sit mollis tincidunt ultrices. Consectetur facilisis ac cursus at faucibus. Pellentesque ullamcorper aliquam at donec eu bibendum viverra diam accumsan. Magna lectus id non in aliquam purus, sed luctus eu. Eu eu sit est egestas est sed netus.',
    images: [],
    amenities: [
      'air_conditioner',
      'fridge',
      'garage',
      'gym',
      'security_box',
      'security_camera',
      'tv',
      'washing_machine',
    ],
    category: 'Building',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 1,
    location: {
      coordinates: [13.4065, 52.51],
      country: 'United States',
      region: 'Utah',
      postCode: 84784,
      place: 'Hildale',
      street: 'Old Blewett Pass Highway',
    },
    propertyArea: 320,
    userId: {
      email: 'user2@example.com',

      favoriteIds: [],

      image: 'assets/images/placeholder.jpg',
      name: 'Brenda Flores',
      hashedPassword: '',
      phone: '1234567890',
      role: 'Agent',
    },
    rating: 2.1,
    price: '180,000',
  },
];
