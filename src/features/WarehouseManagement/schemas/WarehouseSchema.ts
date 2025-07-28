import { msg } from "@/constants/errormessage";
import z from "zod";

export const warehouseSchema = z.object({
  warehouseCode: z.string().optional(),
  warehouseName: z.string().min(1, { message: msg.required("Warehouse name is required") }),
  address: z.string().min(1, { message: msg.required("Address is required") }),
  allowNegativeStock: z.boolean(),
  binLocationCount: z.number().min(0, { message: msg.required("Bin location count must be a non-negative number") })
});

