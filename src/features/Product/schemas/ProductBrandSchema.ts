import { msg } from "@/constants/errormessage";
import z from "zod";

export const productBrandSchema = z.object({
  brandCode: z.string().optional(),
  brandName: z.string().min(1, { message: msg.required("Brand name is required") })
});