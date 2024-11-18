import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SeedService } from './modules/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        clientId: 'balance-service-kafka-id'
      },
      consumer: {
        groupId: 'balance-service-consumer-group'
      }
    }
  })

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.BALANCE_SERVICE_PORT;
  await app.listen(port);
  await app.startAllMicroservices();
  const seedService = app.get(SeedService);

  await seedService.seed();

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
