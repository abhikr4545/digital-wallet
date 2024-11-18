import { Inject, Injectable } from "@nestjs/common";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { Balance } from "./balance.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EVENTS, FundTransferDto } from "@digital-wallet/shared-types";
import { ClientKafka } from "@nestjs/microservices";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
    private readonly dataSource: DataSource,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  addData(obj: any) {
    const data = this.balanceRepository.create({
      userId: obj.userId,
      currentBalance: obj.currentBalance
    })

    this.balanceRepository.insert(data);
  }

  async handleBalanceUpdate(balanceUpdate: FundTransferDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.debitFromUseraccount(balanceUpdate, queryRunner);
      await this.creditIntoUseraccount(balanceUpdate, queryRunner);

      await queryRunner.commitTransaction();

      this.kafkaClient.emit(EVENTS.BALANCE_UPDATE_COMPLETE, JSON.stringify({
        amount: balanceUpdate.amount, 
        counterparty: balanceUpdate.receiverId,
        userId: balanceUpdate.senderId,
        transferId: balanceUpdate.transferId
      }))

      this.logger.log('info', { 
        amount: balanceUpdate.amount, 
        counterparty: balanceUpdate.receiverId,
        userId: balanceUpdate.senderId,
        transferId: balanceUpdate.transferId,
        message: `Balance update success for transfer id ${balanceUpdate.transferId}`
      })
    } catch(error) {
      await queryRunner.rollbackTransaction()
      console.log(error);
    } finally {
      await queryRunner.release();
    }
  }

  private async debitFromUseraccount(fundTranferDto :FundTransferDto, queryRunner: QueryRunner) {
    const user = await this.findUserById(fundTranferDto.senderId, queryRunner);

    if (!user) {
      this.logger.warn('warn', { transferId: fundTranferDto.transferId, message: 'User does not exist.' })
      throw new Error('User does not exixts');
    }

    const currentBalance = parseFloat(user.currentBalance);
    const transferAmount = parseFloat(fundTranferDto.amount);

    if (currentBalance < transferAmount) {
      this.logger.warn('warn', { transferId: fundTranferDto.transferId, message: 'Insufficient balance in user\'s account.' });
      throw new Error('Insufficient balance');
    }

    const updatedBalance = (currentBalance - transferAmount).toString();

    await queryRunner.manager.update(Balance, user.userId, { currentBalance: updatedBalance });
    this.logger.log('info', { transferId: fundTranferDto.transferId, message: 'Debit transaction success.' });
  }

  private async creditIntoUseraccount(fundTranferDto :FundTransferDto, queryRunner: QueryRunner) {
    const user = await this.findUserById(fundTranferDto.receiverId, queryRunner);

    if (!user) {
      this.logger.warn('warn', { transferId: fundTranferDto.transferId, message: 'User does not exist.' })
      throw new Error('User does not exixts');
    }

    const currentBalance = parseFloat(user.currentBalance);
    const transferAmount = parseFloat(fundTranferDto.amount);
    
    const updatedBalance = (currentBalance + transferAmount).toString();

    await queryRunner.manager.update(Balance, fundTranferDto.receiverId, {currentBalance: updatedBalance});
    this.logger.log('info', { transferId: fundTranferDto.transferId, message: 'Credit transaction success.' });
  }

  private async findUserById(userId: string, queryRunner: QueryRunner): Promise<Balance> {
    const user = await queryRunner.manager.findOneBy(Balance, {
      userId
    })

    return user;
  }
}