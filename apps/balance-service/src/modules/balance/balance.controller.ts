import { Body, Controller, Post } from "@nestjs/common";
import { BalanceService } from "./balance.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EVENTS, FundTransferDto } from "@digital-wallet/shared-types";

@Controller('balance')
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService
  ) {}
  
  @Post('data')
  addData(@Body() obj: any) {
    this.balanceService.addData(obj);
  }

  @EventPattern(EVENTS.INITIATE_BALANCE_UPDATE)
  handleBalanceUpdate(@Payload() balanceUpdate: FundTransferDto) {
    this.balanceService.handleBalanceUpdate(balanceUpdate);
  }
}