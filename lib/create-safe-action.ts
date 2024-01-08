import { z } from "zod";

// ชนิดข้อมูลที่ใช้สำหรับเก็บข้อผิดพลาดของแต่ละฟิลด์ในอ็อบเจกต์ของ type T (อาจเป็น object ใด ๆ) เก็บข้อผิดพลาดของแต่ละฟิลด์ไว้ในรูปแบบของอาร์เรย์ของสตริง
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

// ชนิดข้อมูลที่ใช้เก็บสถานะของการดำเนินการ (action) ซึ่งประกอบด้วย fieldErrors สำหรับข้อผิดพลาดของฟิลด์, error สำหรับข้อผิดพลาดทั่วไป, และ data สำหรับข้อมูลผลลัพธ์จากการดำเนินการนั้นๆ
export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

// ฟังก์ชันที่สร้างการดำเนินการที่ปลอดภัย (safe action) โดยรับ schema เป็น schema ของข้อมูลที่ใช้ในการ validate และ handler เป็นฟังก์ชันที่รับข้อมูลที่ผ่านการ validate และทำการดำเนินการต่างๆ กับข้อมูลนั้นๆ
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    // ทำการ validate ข้อมูลที่รับเข้ามาด้วย schema.safeParse(data)
    const validationResult = schema.safeParse(data);
    // ถ้าการ validate ไม่สำเร็จ จะส่งข้อมูลเกี่ยวกับข้อผิดพลาดของฟิลด์ที่ผิดพลาดกลับไปเป็นผลลัพธ์ (fieldErrors) เพื่อให้ผู้ใช้งานได้ทราบถึงข้อผิดพลาดที่เกิดขึ้นในข้อมูลที่ส่งเข้ามาในฟังก์ชัน createSafeAction
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
      };
    }
    // ถ้าการ validate สำเร็จ จะส่งข้อมูลที่ผ่านการ validate ไปให้ handler เพื่อดำเนินการต่อ
    return handler(validationResult.data);
  };
};
