import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(createValidationPipe());

  // CORS configuration
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://your-domain.com']
        : ['http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
