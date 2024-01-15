import { auth } from "@clerk/nextjs";

import { db } from "@/lib/database";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export async function incrementAvailableCount() {
  // ดึงข้อมูลการยืนยันตัวตน (authentication) และนำ orgId มาเก็บไว้
  const { orgId } = auth();

  // ตรวจสอบว่า orgId ไม่เป็นค่าว่าง
  if (!orgId) {
    throw new Error("Unauthorized");
  }

  // ค้นหาข้อมูลที่มี orgId ตรงกับ orgId ที่ดึงมาจากการยืนยันตัวตน
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // ถ้ามีข้อมูล orgLimit อยู่แล้ว จะทำการอัปเดต count โดยเพิ่มขึ้น 1 หน่วย หากไม่มีจะสร้างข้อมูลใหม่พร้อมกำหนด count เป็น 1
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
}

export const decreaseAvailableCount = async () => {
  // ดึงข้อมูลการยืนยันตัวตน (authentication) และนำ orgId มาเก็บไว้ในตัวแปร
  const { orgId } = auth();

  // ตรวจสอบว่า orgId ไม่เป็นค่าว่าง
  if (!orgId) {
    throw new Error("Unauthorized");
  }

  // ค้นหาข้อมูลที่มี orgId ตรงกับ orgId ที่ดึงมาจากการยืนยันตัวตน
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // ถ้ามีข้อมูล orgLimit อยู่แล้ว จะทำการอัปเดต count โดยลดลง 1 หน่วย หาก count มีค่ามากกว่า 0, หาก count เป็น 0 จะไม่ลดลงและจะเป็น 0 ตลอด
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const hasAvailableCount = async () => {
// ดึงข้อมูลการยืนยันตัวตน (authentication) และนำ orgId มาเก็บไว้ในตัวแปร
  const { orgId } = auth();

  // ตรวจสอบว่า orgId ไม่เป็นค่าว่าง
  if (!orgId) {
    throw new Error("Unauthorized");
  }

  // ค้นหาข้อมูลที่มี orgId ตรงกับ orgId ที่ดึงมาจากการยืนยันตัวตน
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // ถ้าไม่มีข้อมูล orgLimit หรือ count น้อยกว่า MAX_FREE_BOARDS จะคืนค่า true แทนถ้า count มีค่ามากกว่าหรือเท่ากับ MAX_FREE_BOARDS จะคืนค่า false
  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async () => {
  // ดึงข้อมูลการยืนยันตัวตน (authentication) และนำ orgId มาเก็บไว้ในตัวแปร
  const { orgId } = auth();

  // ตรวจสอบว่า orgId ไม่เป็นค่าว่าง
  if (!orgId) {
    return 0;
  }

  // ค้นหาข้อมูลที่มี orgId ตรงกับ orgId ที่ดึงมาจากการยืนยันตัวตน
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });
  // const orgLimit2 = await db.orgLimit.findMany({
  //   where: { orgId },
  // });

  // ถ้าไม่มีข้อมูล orgLimit จะทำการคืนค่า 0 เพื่อแสดงว่าไม่มีข้อมูลที่สามารถดึงมาได้
  if (!orgLimit) {
    return 0;
  }

  // คืนค่า count ที่อยู่ในข้อมูล orgLimit
  return orgLimit.count;
};
