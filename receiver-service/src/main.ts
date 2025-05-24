import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.modules';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add security with helmet
  app.use(helmet());
  
  // Add validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  await app.listen(3000);
  console.log(`Receiver service is running on: ${await app.getUrl()}`);
}
bootstrap();