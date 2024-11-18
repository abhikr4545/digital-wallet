import { TransactionType } from "@digital-wallet/shared-types";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryColumn({
    name: 'transaction_id'
  })
  transactionId: string;

  @Column()
  userId: string;

  @Column({
    name: 'transaction_type',
    type: 'enum',
    enum: TransactionType
  })
  transactionType: string;

  @Column({ type: 'timestamptz', name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date

  @Column()
  counterparty: string;
  
  @Column()
  amount: string;

  @Column({ name: 'transfer_id', nullable: true })
  transferId: string;
}