import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transaction } from '../modules/transaction/transaction.entity';

export const DatabaseConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('TRANSACTION_SERVICE_POSTGRES_HOST'),
    port: +configService.get<number>('TRANSACTION_SERVICE_POSTGRES_PORT'),
    username: configService.get<string>('TRANSACTION_SERVICE_POSTGRES_USER'),
    password: configService.get<string>('TRANSACTION_SERVICE_POSTGRES_PASSWORD'),
    database: configService.get<string>('TRANSACTION_SERVICE_POSTGRES_DATABASE'),
    entities: [Transaction],
    synchronize: true,
  }),
});