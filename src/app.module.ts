import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { BreedsModule } from './breeds/breeds.module';
import { PetsModule } from './pets/pets.module';
import { BaseServicesModule } from './baseServices/baseServices.module';
import { AddOnServicesModule } from './addOnServices/addOnServices.module';

@Module({
  imports: [
    PrismaModule,
    CustomersModule,
    BreedsModule,
    PetsModule,
    BaseServicesModule,
    AddOnServicesModule,
  ],
})
export class AppModule {}
