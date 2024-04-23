import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');

  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle('Groomate APIs')
    .setDescription('Groomate APIs')
    .setVersion('1.0')
    .addTag('Groomate')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
