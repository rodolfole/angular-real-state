import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { ListingDto } from './dto/listing.dto';
import { ListingService } from './listing.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('listings')
export class ListingController {
  constructor(private readonly _listingService: ListingService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  create(@Body() listing: ListingDto, @GetCurrentUserId() userId: string) {
    return this._listingService.create(listing, userId);
  }

  @Public()
  @Get(':listingId')
  @HttpCode(HttpStatus.OK)
  listing(@Param('listingId') listingId: string) {
    console.log({ listingId });

    return this._listingService.getOneListing(listingId);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  listings() {
    return this._listingService.getListings();
  }
}
