import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ListingDto } from './dto/listing.dto';

interface QueryListing {
  category: string;
  userId: string;
}

@Injectable()
export class ListingService {
  constructor(private readonly _prismaService: PrismaService) { }

  async create({ location, ...listing }: ListingDto, userId: string) {
    return await this._prismaService.listing.create({
      data: {
        ...listing,
        user: { create: { id: userId } },
        location: {
          create: location,
        },
      },
    });
  }

  async getOneListing(listingId: string) {
    return await this._prismaService.listing.findUnique({
      where: {
        id: listingId,
      },
      include: { location: true, user: true },
    });
  }

  async getListings({ category, userId }: QueryListing) {
    return await this._prismaService.listing.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(userId ? { userId } : {}),
      },
      include: { location: true, user: true, features: true },
    });
  }
}
