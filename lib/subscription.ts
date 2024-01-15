import { auth } from "@clerk/nextjs";

import { db } from "@/lib/database";

// ค่าคงที่ในการคำนวณเวลาในรูปแบบของ millisecond สำหรับการตรวจสอบว่าการสมัครสมาชิกยังคงมีผลอยู่หรือไม่
// ค่า 86,400,000 หมายถึงจำนวน millisecond ที่เท่ากับหนึ่งวัน (24 ชั่วโมง)
const DAY_IN_MS = 86_400_000;

export async function checkSubscription() {
  const { orgId } = auth();

  // ตรวจสอบว่ามี orgId หรือไม่
  if (!orgId) {
    return false;
  }

  // ดึงข้อมูลการสมัครสมาชิกขององค์กรจากฐานข้อมูล
  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  // ถ้าไม่พบข้อมูลการสมัครสมาชิก
  if (!orgSubscription) {
    return false;
  }

  // ตรวจสอบว่าการสมัครสมาชิกยังคงมีผลหรือไม่
  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  // คืนค่า true ถ้าการสมัครสมาชิกยังคงมีผล, มิฉะนั้นคืนค่า false
  return !!isValid;
}
