import { Controller, Get } from "@nestjs/common";
import { OrchestratorService } from "./orchestrator.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EVENTS, FundTransferDto, TransactionUpdateDto } from "@digital-wallet/shared-types";

@Controller('orch')
export class OrchestratorController {
  constructor(private readonly orchestratorService: OrchestratorService) {}

  @Get()
  helloWorld() {
    return this.orchestratorService.helloWorld();
  }

  @EventPattern(EVENTS.INITIATE_FUND_TRANSFER)
  handleFundTransfer(@Payload() fundTransferObj: FundTransferDto) {
    this.orchestratorService.handleFundTransfer(fundTransferObj);
  }

  @EventPattern(EVENTS.BALANCE_UPDATE_COMPLETE)
  handleBalanceUpdate(@Payload() transactionUpdate: TransactionUpdateDto) {
    this.orchestratorService.handleBalanceUpdateComplete(transactionUpdate);
  }
}