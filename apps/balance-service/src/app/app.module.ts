import { Module } from '@nestjs/common';
import { BalanceModule } from '../modules/balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import envConfig from '../config/env.config';
import { DatabaseConfig } from '../config/database.config';
import { WinstonModule } from 'nest-winston';
import { logger } from '@digital-wallet/config';
import { SeedModule } from '../modules/seed/seed.module';


@Module({
  imports: [
    BalanceModule,
    SeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig]
    }),
    DatabaseConfig,
    WinstonModule.forRoot(logger)
  ]
})
export class AppModule {}
