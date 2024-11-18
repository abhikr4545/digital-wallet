import { EVENTS, FundTransferDto, TransactionUpdateDto } from "@digital-wallet/shared-types";
import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class OrchestratorService {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  helloWorld() {
    return { msg: 'hello' }
  }

  handleFundTransfer(fundTransfer: FundTransferDto) {
    this.kafkaClient.emit(EVENTS.INITIATE_BALANCE_UPDATE, fundTransfer);
    this.logger.log('info', {
      message: 'Balance update initiated.'
    })
  }

  handleBalanceUpdateComplete(transactionUpdate: TransactionUpdateDto) {
    this.kafkaClient.emit(EVENTS.INITIATE_TRANSACTION_UPDATE, transactionUpdate);
    this.logger.log('info', {
      message: 'Balance update initiated.'
    })
  }
}