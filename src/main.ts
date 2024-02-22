import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/global-filters/http-exception-filter';
import { ConfigService } from '@nestjs/config';
// import { AllExceptionsFilter } from './global-filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new HttpExceptionFilter(configService),
    // new AllExceptionsFilter(httpAdapterHost),   TODO: Correct it later 
  )

  await app.listen(3000);
}
bootstrap();
