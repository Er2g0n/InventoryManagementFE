import { msg } from "@/constants/errormessage";
import z from "zod";

export const warehouseSchema = z.object({
  warehouseCode: z.string().optional(),
  warehouseName: z.string().min(1, { message: msg.required("Warehouse name is required") }),
  address: z.string().min(1, { message: msg.required("Address is required") })
});

