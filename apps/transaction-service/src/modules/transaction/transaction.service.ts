import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "./transaction.entity";
import { Repository } from "typeorm";
import KSUID from "ksuid";
import { 
  EVENTS, 
  FundTransferStatus, 
  transactionRecordsSchema, 
  TransactionsRecordsDto, 
  TransactionType, 
  TransactionUpdateDto 
} from "@digital-wallet/shared-types";
import { ClientKafka } from "@nestjs/microservices";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async handleTransactionUpdate(transactionUpdate: TransactionUpdateDto) {
    const transactionDebit = this.transactionRepository.create({
      transactionId: await this.generateId(),
      userId: transactionUpdate.userId,
      amount: transactionUpdate.amount,
      counterparty: transactionUpdate.counterparty,
      transactionType: TransactionType.DEBIT,
      transferId: transactionUpdate.transferId
    })

    const transactionCredit = this.transactionRepository.create({
      transactionId: await this.generateId(),
      userId: transactionUpdate.counterparty,
      amount: transactionUpdate.amount,
      counterparty: transactionUpdate.userId,
      transactionType: TransactionType.CREDIT,
      transferId: transactionUpdate.transferId
    })

    this.transactionRepository.insert(transactionDebit);

    this.logger.log('info',{
      transactionId: await this.generateId(),
      userId: transactionUpdate.userId,
      amount: transactionUpdate.amount,
      counterparty: transactionUpdate.counterparty,
      transactionType: TransactionType.DEBIT,
      transferId: transactionUpdate.transferId,
      message: 'Debit record completed.'
    })

    this.transactionRepository.insert(transactionCredit);

    this.logger.log('info', {
      transactionId: await this.generateId(),
      userId: transactionUpdate.counterparty,
      amount: transactionUpdate.amount,
      counterparty: transactionUpdate.userId,
      transactionType: TransactionType.CREDIT,
      transferId: transactionUpdate.transferId,
      message: 'Credit record completed.'
    })

    this.kafkaClient.emit(EVENTS.FUND_TRANSFER_COMPLETE, { 
      transferId: transactionUpdate.transferId, 
      status: FundTransferStatus.SUCCESS 
    })
  }

  async getTransactionRecords(userId: string): Promise<TransactionsRecordsDto[]> {
    const result: Transaction[] = await this.transactionRepository.findBy({ userId });
  
    const validatedRecords = result.map((record: Transaction) => {
      const date: string = this.formatDateToDDMMYY(record.createdAt);
  
      return transactionRecordsSchema.parse({
        transactionId: record.transactionId,
        transactionType: record.transactionType,
        createdAt: date,
        counterparty: record.counterparty,
        amount: record.amount.toString(),
      });
    });
    
    return validatedRecords.sort((a, b) => {
      const dateA = new Date(a.createdAt.split('/').reverse().join('-')).getTime();
      const dateB = new Date(b.createdAt.split('/').reverse().join('-')).getTime();
  
      return dateB - dateA;
    });
  }
  

  private async generateId(): Promise<string> {
    return (await KSUID.random()).string;
  }

  private formatDateToDDMMYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
  }
}