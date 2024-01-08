import { z } from "zod";

// ใช้ในการตรวจสอบข้อมูลที่รับเข้ามาเพื่อการสร้างบอร์ด (board) ในรูปแบบที่ถูกต้องตาม validation rules ที่กำหนดไว้
export const CreateBoard = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }).min(3, {
    message: "Title is too short."
  }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
});