export const msg = {
  required:      (f: string) => `${f} là bắt buộc.`,
  min:           (f: string, n: number) => `${f} phải có ít nhất ${n} ký tự.`,
  max:           (f: string, n: number) => `${f} không được vượt quá ${n} ký tự.`,
  email:         (f: string) => `${f} không hợp lệ.`,
  minNumber:     (f: string, n: number) => `${f} phải lớn hơn hoặc bằng ${n}.`,
  maxNumber:     (f: string, n: number) => `${f} phải nhỏ hơn hoặc bằng ${n}.`,
  pattern:       (f: string) => `${f} không hợp lệ.`,
  date:          (f: string) => `${f} không hợp lệ.`,
  minDate:       (f: string, d: string) => `${f} phải từ ngày ${d} trở đi.`,
  maxDate:       (f: string, d: string) => `${f} phải trước ngày ${d}.`,
  phone:         (f: string) => `${f} không đúng định dạng số điện thoại.`,
  url:           (f: string) => `${f} không đúng định dạng URL.`,
  positive:      (f: string) => `${f} phải là số dương.`,
  negative:      (f: string) => `${f} phải là số âm.`,
  integer:       (f: string) => `${f} phải là số nguyên.`,
  custom:        (msg: string) => msg, // Dùng cho custom message
};