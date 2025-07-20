import { z } from "zod";

export const productUoMConversionSchema = z.object({
    productUoMConversionCode: z.string().optional(),
    productCode: z.string().min(1, "Hãy chọn sản phẩm."),
    fromUoMID: z.number().min(1),
    toUoMID: z.number().min(1),
    conversionRate: z.number().min(0, { message: "Conversion rate must be a positive number" }),
}); 