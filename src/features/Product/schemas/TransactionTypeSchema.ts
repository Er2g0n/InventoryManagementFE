import { msg } from '@/constants/errormessage';
import { z } from 'zod';

export const TransactionTypeSchema = z.object({
  transactionTypeCode: z.string().optional(),
  transactionTypeName: z.string().min(1, { message: msg.required('Tên danh mục') }),
});