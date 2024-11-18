import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { BalanceModule } from "../balance/balance.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "../balance/balance.entity";

@Module({
  providers: [SeedService],
  imports: [BalanceModule, TypeOrmModule.forFeature([Balance]),],
})
export class SeedModule {}