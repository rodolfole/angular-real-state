import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

import { listings } from './mock';

const prisma = new PrismaClient();

async function start() {
  listings.forEach(({ userId, location, features, ...listing }) => {
    (async () => {
      userId.hashedPassword = await argon.hash('123456');
      await prisma.listing.create({
        data: {
          ...listing,
          user: { create: userId },
          features: { create: features},
          location: { create: location },
        },
      });
    })();
  });
}

start()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
