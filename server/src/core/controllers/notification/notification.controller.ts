import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from '../../services/notification/notification.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('notification')
@ApiTags('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get('/id')
  async getUser(@Param('id') id: string) {
    const notification = await this.notificationService.findOne(+id);
    return notification;
  }
}
