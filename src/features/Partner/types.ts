import { msg } from "@/constants/errormessage";
import { z } from "zod";
export const PartnerSchema = z.object({
  partnerCode: z.string().nonempty(msg.required()),
  partnerName: z.string().nonempty(msg.required()),
  isSupplier: z.boolean(),
  isCustomer: z.boolean(),
  contactInfo: z.string().nonempty(msg.required()),
  statusID: z.number().int().min(0, msg.minNumber("status", 3))
});
export type PartnerFormValues = z.infer<typeof PartnerSchema>;


export type tableMeta = {
  filterVariant : "select" | "range" ;

};
