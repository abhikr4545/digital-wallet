import { z } from 'zod';
import { FundTransferStatus } from '../enums';

export const fundTransferUpdateSchema = z.object({
  transferId: z.string().min(1),
  status: z.enum(Object.values(FundTransferStatus) as [FundTransferStatus, ...FundTransferStatus[]])
});

export type FundTransferUpdateDto = z.infer<typeof fundTransferUpdateSchema>;
