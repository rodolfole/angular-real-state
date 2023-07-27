import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ListingDto } from './dto/listing.dto';

interface QueryListing {
  category: string;
  userId: string;
}

@Injectable()
export class ListingService {
  constructor(private readonly _prismaService: PrismaService) {}

  async addRemoveFavorite(
    listingId: string,
    userId: string,
    type: 'ADD' | 'REMOVE',
  ) {
    const currentUser = await this._prismaService.user.findFirst({
      where: { id: userId },
    });

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    if (type === 'ADD') {
      favoriteIds.push(listingId);
    } else {
      favoriteIds = favoriteIds.filter((id) => id !== listingId);
    }

    const userDB = await this._prismaService.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return { ok: true, user: userDB };
  }

  removeFavorite() {}

  async create(
    { features, images, location, ...listing }: ListingDto,
    userId: string,
  ) {
    return await this._prismaService.listing.create({
      data: {
        ...listing,
        features: { create: features },
        images: { create: images },
        location: { create: location },
        user: { connect: { id: userId } },
      },
    });
  }

  async getOneListing(listingId: string) {
    return await this._prismaService.listing.findUnique({
      where: {
        id: listingId,
      },
      include: { images: true, location: true, user: true, features: true },
    });
  }

  async getListings({ category, userId }: QueryListing) {
    return await this._prismaService.listing.findMany({
      where: {
        ...(category ? { categories: { has: category } } : {}),
        ...(userId ? { userId } : {}),
      },
      include: { images: true, features: true, location: true, user: true },
    });
  }
}
