import { Controller, Get, Param } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EVENTS, TransactionsRecordsDto, TransactionUpdateDto } from "@digital-wallet/shared-types";

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':id')
  async getTransactionRecord(@Param('id') id: string): Promise<TransactionsRecordsDto[]> {
    return await this.transactionService.getTransactionRecords(id);
  }

  @EventPattern(EVENTS.INITIATE_TRANSACTION_UPDATE)
  handleTransactionUpdate(@Payload() transactioUpdate: TransactionUpdateDto) {
    this.transactionService.handleTransactionUpdate(transactioUpdate);
  }
}