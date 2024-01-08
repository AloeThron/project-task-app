import { PrismaClient } from "@prisma/client";

// การประกาศ global scope ใน TypeScript เพื่อกำหนดตัวแปร prisma ที่อาจจะมีค่าเป็น PrismaClient หรือ undefined
declare global {
  var prisma: PrismaClient | undefined;
};

// สร้างตัวแปร db ซึ่งจะใช้ PrismaClient โดยการเช็คค่าของ globalThis.prisma ถ้ามีค่าจะใช้ค่านั้น ถ้าไม่มีก็จะสร้าง instance ใหม่ของ PrismaClient ขึ้นมา
export const db = globalThis.prisma || new PrismaClient();

// เช็คว่าเราอยู่ใน environment ที่ไม่ใช่ production แล้วก็กำหนดค่า globalThis.prisma ให้เป็น db (PrismaClient instance) เพื่อให้สามารถเรียกใช้ได้ทั่วไปในโปรแกรม
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;