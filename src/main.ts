import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.setGlobalPrefix('wrapper-poke');

  let options: CorsOptions = {
    origin: '*',
    credentials: false
  }

  app.enableCors(options);

  await app.listen(process.env.PORT || 8080, '0.0.0.0', (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${address}`);
  });
}
bootstrap();
