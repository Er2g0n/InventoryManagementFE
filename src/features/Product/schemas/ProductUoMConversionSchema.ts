import { z } from "zod";

export const productUoMConversionSchema = z.object({
    productUoMConversionCode: z.string().optional(),
    productID: z.number(),
    fromUoMID: z.number(),
    toUoMID: z.number(),
    conversionRate: z.number().min(0, { message: "Conversion rate must be a positive number" }),
}); 