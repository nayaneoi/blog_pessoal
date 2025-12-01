import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// Ajustando o Fuso Horario do BD
  process.env.TZ = '-03:00'

// Aplicando os recursos de validação
  app.useGlobalPipes(new ValidationPipe());

// Habilitando cors do projeto
  app.enableCors();

// Indicando qual porta o projeto está sendo executado
  await app.listen(process.env.PORT ?? 4000);
  
}
bootstrap();
