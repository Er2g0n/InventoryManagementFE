import { msg } from "@/constants/errormessage";
import { z } from "zod";

export const productTypeSchema = z.object({
    productTypeCode: z.string().optional(),
    productTypeName: z.string().min(1, { message: msg.required('Tên loại sản phẩm') }),
});