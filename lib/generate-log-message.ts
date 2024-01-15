import { ACTION, AuditLog } from "@prisma/client";

// ใช้ข้อมูลจาก AuditLog สร้างข้อความบันทึกเหตุการณ์ (log message) จากข้อมูลที่เกี่ยวข้องกับการกระทำ (action) ที่เกิดขึ้นบน entities ต่างๆ ในระบบ โดยใช้ Prisma library
export function generateLogMessage(log: AuditLog) {
  // นำข้อมูลจากอ็อบเจ็กต์
  const { action, entityTitle, entityType } = log;

  // ตรวจสอบค่าของ action และดำเนินการตามเงื่อนไขต่างๆ
  switch (action) {
    // กรณีที่ action เป็นการสร้าง (CREATE) จะสร้างข้อความที่บอกว่า "created" พร้อมกับประเภทของ entity และชื่อของ entity
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;
    // กรณีที่ action เป็นการอัปเดต (UPDATE) จะสร้างข้อความที่บอกว่า "updated" พร้อมกับประเภทของ entity และชื่อของ entity
    case ACTION.UPDATE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    // กรณีที่ action เป็นการลบ (DELETE) จะสร้างข้อความที่บอกว่า "deleted" พร้อมกับประเภทของ entity และชื่อของ entity
    case ACTION.DELETE:
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    // กรณีที่ action ไม่ตรงกับทุกเคสข้างต้น จะสร้างข้อความที่บอกว่า "unknown action" พร้อมกับประเภทของ entity และชื่อของ entity
    default:
      return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
  }
}
