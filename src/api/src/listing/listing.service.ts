import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ListingDto } from './dto/listing.dto';

interface QueryListing {
  category: string | string;
  userId: string | string;
  locationParams: string[] | string
}

@Injectable()
export class ListingService {
  constructor(private readonly _prismaService: PrismaService) { }

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

  async createListing(
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

  async updateListing(
    { features, images, location, ...listing }: ListingDto,
    listingId: string,
  ) {
    return await this._prismaService.listing.update({
      where: {
        id: listingId
      },
      data: {
        ...listing,
        features: { update: features },
        images: { deleteMany: {}, create: images },
        location: { update: location },
      },
    });
  }

  async deleteListing(listingId: string) {

    await this._prismaService.listing.delete({
      where: {
        id: listingId
      }
    });

    return { ok: true };
  }

  async getOneListing(listingId: string) {
    return await this._prismaService.listing.findUnique({
      where: {
        id: listingId,
      },
      include: { images: true, location: true, user: true, features: true },
    });
  }

  async getListings({ category, userId, locationParams }: QueryListing) {
    return await this._prismaService.listing.findMany({
      where: {
        ...(category && category !== "undefined" ? { categories: { has: category } } : {}),
        ...(userId && userId !== "undefined" ? { userId } : {}),
        ...(locationParams && locationParams !== "undefined" ? {
          location: {
            OR: [
              {
                placeName: { in: locationParams },
              },
              {
                place: { in: locationParams },
              },
              {
                region: { in: locationParams }
              }
            ]
          }
        } : {})
      },
      include: { images: true, features: true, location: true, user: true },
    });
  }

  async getFavoriteListings({ listingIds }: { listingIds: string[] }) {

    return await this._prismaService.listing.findMany({
      where: {
        id: { in: listingIds }
      },
      include: { images: true, features: true, location: true, user: true },
    });
  }

  async getAgentProperties({ userId }: { userId: string }) {

    return await this._prismaService.listing.findMany({
      where: {
        userId: userId
      },
      include: { images: true, features: true, location: true, user: true },
    });
  }

}
