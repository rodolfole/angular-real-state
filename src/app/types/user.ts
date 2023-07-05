export type Role = 'Admin' | 'Agent' | 'New';

export type User = {
  createdAt: Date;
  email: string | null;
  emailVerified: Date | null;
  favoriteIds: string[];
  hashedPassword: string | null;
  id: string;
  image: string | null;
  name: string | null;
  phone: string | null;
  role: Role;
  updatedAt: Date;
};
