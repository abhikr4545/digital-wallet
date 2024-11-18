import { z } from 'zod';

export const transactionUpdateSchema = z.object({
  transferId: z.string().min(1),
  amount: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: 'Amount must be a valid number with up to 2 decimal places'
    }),
  counterparty: z.string().min(1),
  userId: z.string().min(1)
});

export type TransactionUpdateDto = z.infer<typeof transactionUpdateSchema>;