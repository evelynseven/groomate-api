import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [PrismaModule, CustomersModule, BreedsModule],
})
export class AppModule {}
