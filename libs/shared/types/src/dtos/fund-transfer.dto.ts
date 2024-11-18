import { z } from 'zod';

export const fundTransferSchema = z.object({
  transferId: z.string(),
  senderId: z.string().min(1),
  receiverId: z.string().min(1),
  amount: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: 'Amount must be a valid number with up to 2 decimal places'
    }),
  currency: z.string()
    .length(3)
    .toUpperCase()
    .refine((val) => /^[A-Z]{3}$/.test(val), {
      message: 'Currency must be a valid 3-letter code'
    })
});

export type FundTransferDto = z.infer<typeof fundTransferSchema>;