import { Controller, Get, Param } from '@nestjs/common';
import { RatingService } from '../../services/rating/rating.service';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Get('/id')
  async getUser(@Param('id') id: string) {
    const user = await this.ratingService.findOne(+id);
    return user;
  }
}
