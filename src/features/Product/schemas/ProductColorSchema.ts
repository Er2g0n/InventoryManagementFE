import { msg } from "@/constants/errormessage";
import { z } from "zod";

export const productColorSchema = z.object({
    colorCode: z.string().regex(/^#[0-9A-F]{6}$/i, "Mã màu không hợp lệ. Vui lòng nhập mã hex (ví dụ: #FF5733)"),
    colorName: z.string().min(1, { message: msg.required('Màu sắc') }),
});