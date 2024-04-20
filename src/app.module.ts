import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { BreedsModule } from './breeds/breeds.module';
import { PetsModule } from './pets/pets.module';
import { BaseServicesModule } from './baseServices/baseServices.module';
import { AddOnServicesModule } from './addOnServices/addOnServices.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    CustomersModule,
    BreedsModule,
    PetsModule,
    BaseServicesModule,
    AddOnServicesModule,
    AppointmentsModule,
    UsersModule,
  ],
})
export class AppModule {}
