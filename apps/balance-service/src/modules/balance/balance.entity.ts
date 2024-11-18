import { AccountStatus } from "@digital-wallet/shared-types";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Balance {
  @PrimaryColumn({
    name: 'user_id'
  })
  userId: string;

  @Column({
    name: 'current_balance'
  })
  currentBalance: string;

  @Column({
    name: 'account_status',
    type: 'enum',
    default: AccountStatus.ACTIVE,
    enum: AccountStatus
  })
  accountStatus: AccountStatus
}