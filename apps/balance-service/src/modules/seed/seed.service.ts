import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Repository } from "typeorm";
import { Balance } from "../balance/balance.entity";
import { AccountStatus } from "@digital-wallet/shared-types";

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async seed() {
    const existing = await this.balanceRepository.count();

    if (existing === 0) {
      await this.balanceRepository.save([
        { userId: '2oFQCNYCmqFHPLZze3vGya8IHGp' , currentBalance: '1000', accountStatus: AccountStatus.ACTIVE },
        { userId: '2nzHxoW12YZCx0estbxVYZdLy6y' , currentBalance: '1000', accountStatus: AccountStatus.ACTIVE },
        { userId: '2oFQCNJZteaD7i03Ci8vQOBZ01z' , currentBalance: '1000', accountStatus: AccountStatus.ACTIVE },
        { userId: '2nzHxouvGUYH00H6K4qRoXOybEc' , currentBalance: '1000', accountStatus: AccountStatus.ACTIVE },
      ])

      this.logger.log('info', {
        message: 'Seeding of balance database completed.'
      })
    } else {
      this.logger.log('info', {
        message: 'Balance data already present.'
      })
    }
  }
}