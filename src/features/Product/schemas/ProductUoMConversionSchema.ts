import { z } from "zod";

export const productUoMConversionSchema = z.object({
    productUoMConversionCode: z.string().optional(),
    productCode: z.string().min(1, "Hãy chọn sản phẩm."),
    fromUoMID: z.number().min(1, { message: "Hãy chọn đơn vị chuyển đổi" }),
    toUoMID: z.number().min(1, { message: "Hãy chọn đơn vị chuyển đổi" }),
    conversionRate: z.number().min(0, { message: "Hệ số chuyển đổi hãy là số dương >= 0" }),
}); 