import { msg } from '@/constants/errormessage';
import { z } from 'zod';

export const productMaterialSchema = z.object({
  materialCode: z.string().optional(),
  materialName: z.string().min(1, { message: msg.required('Tên chất liệu') }),
});