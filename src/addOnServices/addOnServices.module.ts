import { Module } from '@nestjs/common';
import { AddOnServicesService } from './addOnServices.service';
import { AddOnServicesController } from './addOnServices.controller';

@Module({
  controllers: [AddOnServicesController],
  providers: [AddOnServicesService],
})
export class AddOnServicesModule {}
