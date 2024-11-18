import { Injectable } from "@nestjs/common";
import { BalanceService } from "./balance.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EVENTS, FundTransferDto } from "@digital-wallet/shared-types";

@Injectable()
export class BalanceEventhandler {
  constructor(private readonly balanceService: BalanceService) {}
}