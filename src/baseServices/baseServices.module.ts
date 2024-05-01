import { Module } from '@nestjs/common';
import { BaseServicesService } from './baseServices.service';
import { BaseServicesController } from './baseServices.controller';

@Module({
  controllers: [BaseServicesController],
  providers: [BaseServicesService],
})
export class BaseServicesModule {}
