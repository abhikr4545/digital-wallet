import { Module } from "@nestjs/common";
import { OrchestratorController } from "./orchestrator.controller";
import { OrchestratorService } from "./orchestrator.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'fund-transfer-orchestrator-service',
            brokers: ['localhost:9092']
          },
          producer: {
            allowAutoTopicCreation: true
          }
        }
      }
    ])
  ],
  controllers: [OrchestratorController],
  providers: [OrchestratorService]
})
export class OrchestratorModule {}