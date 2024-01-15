import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// รวมรายการ class names ทั้งหมดเข้าด้วยกันโดยใช้ clsx และ twMerge ในการจัดการ class names และรวมเข้าด้วยกันเป็นสตริงเดียว
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// สำหรับสร้าง absolute URL โดยรวมกับ NEXT_PUBLIC_APP_URL ที่กำหนด URL ของแอปพลิเคชัน
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
};