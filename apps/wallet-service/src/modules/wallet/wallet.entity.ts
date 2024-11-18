import { Column, Entity, PrimaryColumn } from "typeorm";
import { FundTransferStatus } from '@digital-wallet/shared-types';

@Entity()
export class Wallet {
  @PrimaryColumn({
    name: 'transfer_id'
  })
  transferId: string;

  @Column({
    name: 'sender_id'
  })
  senderId: string;

  @Column({
    name: 'receiver_id'
  })
  receiverId: string;

  @Column({
    name: 'amount'
  })
  amount: string;

  @Column()
  currency: string;

  @Column({
    name: 'fund_transfer_status',
    type: 'enum',
    default: FundTransferStatus.PENDING,
    enum: FundTransferStatus
  })
  fundTransferStatus: FundTransferStatus
}