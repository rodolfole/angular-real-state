import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ListingDto } from './dto/listing.dto';

@Injectable()
export class ListingService {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(listing: ListingDto, userId: string) {
    return await this._prismaService.listing.create({
      data: {
        ...listing,
        userId,
      },
    });
  }

  async getOneListing(listingId: string) {
    return await this._prismaService.listing.findUnique({
      where: {
        id: listingId,
      },
      include: { user: true },
    });
  }

  async getListings() {
    return await this._prismaService.listing.findMany({
      include: { user: true },
    });
  }
}
