import { msg } from "@/constants/errormessage";
import { z } from "zod";

export const StatusMasterSchema = z.object({
  statusName: z.string().nonempty(msg.required()),
  description: z.string().nonempty("")
  // description: z.string().nullable().optional() nếu để như thế này thì  nó sẽ báo tất cả là undefine

});

export type StatusMasterFormValues = z.infer<typeof StatusMasterSchema>;

export type tableMeta = {
  filterVariant: "select" | "range";
};