import { Module } from '@nestjs/common';
import { TransactionModule } from '../modules/transaction/transaction.module';
import { DatabaseConfig } from '../config/database.config';
import { ConfigModule } from '@nestjs/config';
import envConfig from '../config/env.config';
import { logger } from '@digital-wallet/config';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    TransactionModule,
    DatabaseConfig,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig]
    }),
    WinstonModule.forRoot(logger)
  ],
})
export class AppModule {}
