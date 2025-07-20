import { msg } from "@/constants/errormessage";
import { z } from "zod";


export const StatusMasterSchema = z.object({
  // statusCode: z.string().nonempty(msg.required()),
  statusName: z.string().nonempty(msg.required()),
  description: z.string().optional()
});

export type StatusMasterFormValues = z.infer<typeof StatusMasterSchema>;

export type tableMeta = {
  filterVariant: "select" | "range";
};