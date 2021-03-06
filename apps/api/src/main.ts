/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';



const configureSwagger = (app) =>{
  const config = new DocumentBuilder()
    .setTitle('Todo Api')
    .setDescription('The TODO application ApI')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  configureSwagger(app);


  const port = process.env.PORT || 3333;
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
