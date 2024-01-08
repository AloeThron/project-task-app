import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void; // ถูกเรียกเมื่อ Action ทำงานเสร็จ ไม่ว่าจะสำเร็จหรือไม่ก็ตาม
}

// นำไปใช้งานในโค้ดอื่น ๆ โดยการเรียกใช้ useAction แล้วรับค่าที่ return กลับมา เพื่อให้สามารถเรียกใช้ execute และเข้าถึง fieldErrors, error, data, isLoading ได้ตามต้องการ

// ใช้สำหรับการจัดการการเรียกใช้งาน Action โดยมีการรับ parameter เป็น action และ options โดย action คือฟังก์ชันที่รับ input และส่ง output กลับมา และ options คือการตั้งค่าต่าง ๆ สำหรับการจัดการผลลัพธ์ของ Action นั้น ๆ
export function useAction<TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      // ตั้งค่า isLoading เป็น true เพื่อแสดงว่ากำลังโหลดข้อมูล
      setIsLoading(true);

      try {
        // เรียกใช้ action โดยส่ง input เข้าไปและรอให้ข้อมูลที่ถูกดึงมาจาก action ส่งคืนมาในตัวแปร result
        const result = await action(input);

        // ตรวจสอบ result ว่ามีค่าหรือไม่ หากไม่มีค่าก็จะสิ้นสุดการทำงาน
        if (!result) {
          return;
        }

        // ใช้ข้อมูลที่ได้รับจาก result เพื่อตั้งค่า fieldErrors ให้กับ state setFieldErrors
        setFieldErrors(result.fieldErrors);

        // ตรวจสอบว่ามี error ใน result หรือไม่ ถ้ามีก็จะตั้งค่า error และเรียกใช้ options.onError หากมีการระบุ
        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        // ตรวจสอบว่ามี data ใน result หรือไม่ ถ้ามีก็จะตั้งค่า data และเรียกใช้ options.onSuccess หากมีการระบุ
        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        // ตั้งค่า isLoading เป็น false เพื่อบอกว่าเสร็จสิ้นการโหลดข้อมูลแล้ว
        setIsLoading(false);
        // เรียกใช้ options.onComplete
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
}
