import { msg } from '@/constants/errormessage';
import { z } from 'zod';

export const productCategorySchema = z.object({
  categoryCode: z.string().optional(),
  categoryName: z.string().min(1, { message: msg.required('Tên loại sản phẩm') }),
});