import { msg } from "@/constants/errormessage";
import { z } from "zod";

export const UoMSchema = z.object({
    uoMCode: z.string().optional(),
    uoMName: z.string().min(1, { message: msg.required('Tên đơn vị') }),
    uoMDescription: z.string().min(1, { message: msg.required('Mô tả') }),
});