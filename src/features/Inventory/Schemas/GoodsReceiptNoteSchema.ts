import { msg } from '@/constants/errormessage';
import { z } from 'zod';

export const GoodsReceiptNoteSchema = z.object({
  grnCode: z.string().optional(),
  notes: z.string().min(1, { message: msg.required('Tên danh mục') }),
});