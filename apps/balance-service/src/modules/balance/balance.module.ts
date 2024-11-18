import { Module } from "@nestjs/common";
import { BalanceService } from "./balance.service";
import { BalanceController } from "./balance.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "./balance.entity";
import { BalanceEventhandler } from "./balance-event-handler.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Balance]),
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'balance-service',
            brokers: ['localhost:9092']
          },
          producer: {
            allowAutoTopicCreation: true
          }
        }
      }
    ])
  ],
  providers: [BalanceService, BalanceEventhandler],
  controllers: [BalanceController]
})
export class BalanceModule {}