import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { ListingDto } from './dto/listing.dto';
import { ListingService } from './listing.service';
import { Public } from '../auth/decorators/public.decorator';
import { GetCurrentUser } from 'src/auth/decorators/get-current-user.decorator';

@Controller('listings')
export class ListingController {
  constructor(private readonly _listingService: ListingService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  create(@Body() listing: ListingDto, @GetCurrentUserId() userId: string) {
    return this._listingService.create(listing, userId);
  }

  @Post('favorites/:listingId')
  @HttpCode(HttpStatus.OK)
  addFavorite(
    @Param('listingId') listingId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this._listingService.addRemoveFavorite(listingId, userId, 'ADD');
  }

  @Delete('favorites/:listingId')
  @HttpCode(HttpStatus.OK)
  removeFavorite(
    @Param('listingId') listingId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this._listingService.addRemoveFavorite(listingId, userId, 'REMOVE');
  }

  @Public()
  @Get(':listingId')
  @HttpCode(HttpStatus.OK)
  listing(@Param('listingId') listingId: string) {
    return this._listingService.getOneListing(listingId);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  listings(@Query() query) {
    return this._listingService.getListings(query);
  }
}
