import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "../modules/balance/balance.entity";

export const DatabaseConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('BALANCE_SERVICE_POSTGRES_HOST'),
    port: +configService.get<number>('BALANCE_SERVICE_POSTGRES_PORT'),
    username: configService.get<string>('BALANCE_SERVICE_POSTGRES_USER'),
    password: configService.get<string>('BALANCE_SERVICE_POSTGRES_PASSWORD'),
    database: configService.get<string>('BALANCE_SERVICE_POSTGRES_DATABASE'),
    synchronize: true,
    entities: [Balance]
  })
})