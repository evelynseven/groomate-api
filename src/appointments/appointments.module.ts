import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { BaseServicesService } from '../baseServices/baseServices.service';
import { PetsService } from '../pets/pets.service';
import { BreedsService } from '../breeds/breeds.service';

@Module({
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    BaseServicesService,
    PetsService,
    BreedsService,
  ],
})
export class AppointmentsModule {}
