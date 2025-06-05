import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // Enregistrement du plugin cookie pour Fastify
  await app.register(require('@fastify/cookie'), {
    secret: process.env.COOKIE_SECRET || 'dev-secret-key',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
