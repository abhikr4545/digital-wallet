import { Module } from '@nestjs/common';
import { WalletModule } from '../modules/wallet/wallet.module';
import { ConfigModule } from '@nestjs/config';
import envConfig from '../config/env.config';
import { DatabaseConfig } from '../config/database.config';
import { WinstonModule } from 'nest-winston';
import { logger } from '@digital-wallet/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../interceptors/logger.interceptor';


@Module({
  imports: [WalletModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig]
    }),
    DatabaseConfig,
    WinstonModule.forRoot(logger)
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
