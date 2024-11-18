import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "../modules/wallet/wallet.entity";

export const DatabaseConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('WALLET_SERVICE_POSTGRES_HOST'),
    port: +configService.get<number>('WALLET_SERVICE_POSTGRES_PORT'),
    username: configService.get<string>('WALLET_SERVICE_POSTGRES_USER'),
    password: configService.get<string>('WALLET_SERVICE_POSTGRES_PASSWORD'),
    database: configService.get<string>('WALLET_SERVICE_POSTGRES_DATABASE'),
    entities: [Wallet],
    synchronize: true,
  })
})