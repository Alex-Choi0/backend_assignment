import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Junior back-end assignment')
    .setVersion('1.0')
    .setDescription(
      `
    백엔드 주니어 과제
    `,
    )
    .addBearerAuth()
    .build();

  // Swagger Document의 문서를 api(/api-docs)로 설정할수 있게 셋팅
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(+process.env.NESTJS_PORT);
  console.log('NestJS Port : ', process.env.NESTJS_PORT);
}
bootstrap();
