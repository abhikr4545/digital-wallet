import { z } from "zod";

export const transactionRecordsSchema = z.object({
  transactionId: z.string(),
  transactionType: z.string(),
  createdAt: z.string(),
  counterparty: z.string(),
  amount: z.string()
});

export type TransactionsRecordsDto = z.infer<typeof transactionRecordsSchema>;