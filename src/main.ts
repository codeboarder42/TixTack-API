import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyHelmet from '@fastify/helmet';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('TixTrack')
    .setDescription('Track your tickets')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  // Fastify cookie plugin
  await app.register(require('@fastify/cookie'), {
    secret: process.env.COOKIE_SECRET || 'dev-secret-key',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Équivalent de excludeExtraneousValues
      forbidNonWhitelisted: true, // Rejette si propriétés non autorisées
      transform: true, // Active class-transformer
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
