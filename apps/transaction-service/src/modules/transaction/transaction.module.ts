import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./transaction.entity";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Transaction]),
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'transaction-service',
            brokers: ['localhost:9092']
          },
          producer: {
            allowAutoTopicCreation: true
          }
        }
      }
    ])
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}