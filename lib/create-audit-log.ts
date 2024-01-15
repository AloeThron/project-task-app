import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/database";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

// สำหรับบันทึกข้อมูลล็อกการดำเนินการลงในฐานข้อมูล, เพื่อการติดตามและการทำแบบทำสำเนาของการกระทำต่างๆ ที่เกิดขึ้นในระบบ
export async function createAuditLog(props: Props) {
  try {
    // ดึงข้อมูล orgId จาก auth() และ user จาก currentUser()
    const { orgId } = auth();
    const user = await currentUser();

    // ถ้าไม่มี user หรือ orgId จะ throw error
    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    // ดึงข้อมูลจาก props
    const { entityId, entityType, entityTitle, action } = props;

    // บันทึกข้อมูลล็อกการดำเนินการในฐานข้อมูล
    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    // ถ้าเกิด error ในระหว่างกระบวนการ จะถูกบันทึกไว้ใน console
    console.log("[AUDIT_LOG_ERROR]", error);
  }
}
