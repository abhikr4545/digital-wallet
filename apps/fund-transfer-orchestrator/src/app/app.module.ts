import { Module } from '@nestjs/common';
import { OrchestratorModule } from '../modules/orchestrator/orchestrator.module';
import { logger } from '@digital-wallet/config';
import { WinstonModule } from 'nest-winston';


@Module({
  imports: [OrchestratorModule, WinstonModule.forRoot(logger)],
})
export class AppModule {}
