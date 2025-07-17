import { msg } from "@/constants/errormessage";
import z from "zod";

export const vehicleModelSchema = z.object({
  modelCode: z.string().optional(),
  modelName: z.string().min(1, { message: msg.required("Model name is required") }),
  brandCode: z.string().min(1, { message: msg.required("Brand is required") })
});