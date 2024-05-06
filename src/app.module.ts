import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { BreedsModule } from './breeds/breeds.module';
import { PetsModule } from './pets/pets.module';
import { BaseServicesModule } from './baseServices/baseServices.module';
import { AddOnServicesModule } from './addOnServices/addOnServices.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

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
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
