import { Body, Controller, Post } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { EVENTS, FundTransferDto, FundTransferUpdateDto } from "@digital-wallet/shared-types";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('transfer')
  transferFunc(@Body() transferRequest: FundTransferDto) {
    this.walletService.transferFund(transferRequest);
  }

  @EventPattern(EVENTS.FUND_TRANSFER_COMPLETE)
  handleFundTransferStatusUpdate(@Payload() fundTranserUpdate: FundTransferUpdateDto) {
    this.walletService.handleFundTransferStatusUpdate(fundTranserUpdate);
  }
}