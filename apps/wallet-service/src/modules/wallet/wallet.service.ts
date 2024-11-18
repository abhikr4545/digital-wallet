import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "./wallet.entity";
import KSUID from "ksuid";
import { FundTransferDto, EVENTS, FundTransferUpdateDto } from "@digital-wallet/shared-types";
import { ClientKafka } from "@nestjs/microservices";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async transferFund(transferRequest: FundTransferDto): Promise<void> {
    const transferId: string = await this.generateId();

    const transferObj = this.walletRepository.create({
      transferId: transferId,
      senderId: transferRequest.senderId,
      receiverId: transferRequest.receiverId,
      amount: transferRequest.amount,
      currency: transferRequest.currency
    })

    try {
      await this.walletRepository.insert(transferObj);
      this.kafkaClient.emit(EVENTS.INITIATE_FUND_TRANSFER, JSON.stringify(transferObj));
      this.logger.log('info', 
        { details: { 
          transferId, 
          senderId: transferRequest.senderId, 
          receiverId: transferRequest.receiverId,
          amount: transferRequest.amount,
          currency: transferRequest.currency 
        } 
      });
      
    } catch (error) {
      this.logger.error(`Failed to transfer funds: ${error.message}`, error.stack);
      throw error;
    }
  }

  async handleFundTransferStatusUpdate(transferStatus: FundTransferUpdateDto) {
    try {
      await this.walletRepository.update(transferStatus.transferId, {
        fundTransferStatus: transferStatus.status,
      });
      this.logger.log('info', `Transfer status updated: ${transferStatus.transferId}`);
    } catch (error) {
      this.logger.error(`Failed to update transfer status: ${error.message}`, error.stack);
      throw error;
    }
  }

  private async generateId(): Promise<string> {
    return (await KSUID.random()).string;
  }
}