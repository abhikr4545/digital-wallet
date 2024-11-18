import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "./wallet.entity";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Wallet]),
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'wallet-service',
            brokers: ['localhost:9092']
          },
          producer: {
            allowAutoTopicCreation: true
          }
        }
      }
    ])
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}