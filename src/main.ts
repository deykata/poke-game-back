import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
// import { SocketIoAdapter } from './socket-io.adapter';

const port = process.env.PORT ? Number(process.env.port) : 8080;
const host = process.env.HOST || '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  // app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  app.setGlobalPrefix('wrapper-poke');

  let options: CorsOptions = {
    origin: '*',
    credentials: false
  }

  app.enableCors(options);

  await app.listen(port, host, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${address}`);
  });
}
bootstrap();
