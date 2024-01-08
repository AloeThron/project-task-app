import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

// กำหนดให้ InputType เป็นชนิดข้อมูล (type) ที่ถูกดึงออกมา (inferred) จากการใช้งานของ CreateBoard ซึ่งเป็น schema หรือแบบแจ้งเตือนข้อมูล
export type InputType = z.infer<typeof CreateBoard>;
// กำหนดให้ ReturnType เป็นชนิดข้อมูล (type) ที่เกี่ยวข้องกับ ActionState จากไฟล์ create-safe-action
export type ReturnType = ActionState<InputType, Board>;