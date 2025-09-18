// src/schema/mpschema.ts
import { z } from 'zod';

export const MPSchema = z.object({
  id: z.number().optional(),
  
  // คำนำหน้า: ต้องเลือก
  prefix: z.string().min(1, 'กรุณาเลือกคำนำหน้า'),
  
  // ชื่อ: ต้องกรอก และมีอย่างน้อย 1 ตัวอักษร
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  
  // นามสกุล: ต้องกรอก และมีอย่างน้อย 1 ตัวอักษร
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),

  // รูปถ่าย: แก้ไขการตรวจสอบ validation ให้รองรับ FileList
  photo: z.any().refine(val => {
    // เงื่อนไขที่ 1: ตรวจสอบว่าเป็น URL (string) ที่ไม่ว่างเปล่า
    if (typeof val === 'string' && val.length > 0) {
      return true;
    }
    // เงื่อนไขที่ 2: ตรวจสอบว่าเป็น FileList ที่มีไฟล์อยู่ภายใน
    // val.length > 0 เช็คว่ามีการเลือกไฟล์มาหรือไม่
    // val[0] instanceof File เช็คว่าไฟล์ที่เลือกมาเป็น File object จริงๆ
    if (val && val.length > 0 && val[0] instanceof File) {
      return true;
    }
    return false;
  }, { message: 'กรุณาเลือกหรืออัปโหลดรูปภาพ' }),
  
  photoDisplay: z.string().optional(),
  
  // ประวัติการทำงาน: ต้องกรอก และมีอย่างน้อย 1 ตัวอักษร
  workHistory: z.string().min(1, 'กรุณากรอกประวัติการทำงาน'),
  
  // ผลงานที่ผ่านมา: ต้องกรอก และมีอย่างน้อย 1 ตัวอักษร
  pastWorks: z.string().min(1, 'กรุณากรอกผลงานที่ผ่านมา'),
  
  // ตำแหน่งรัฐมนตรี: ต้องกรอก และมีอย่างน้อย 1 ตัวอักษร
  ministerialPosition: z.string().min(1, 'กรุณากรอกตำแหน่งรัฐมนตรี'),
  
  // กระทรวง: ต้องกรอก และมีอย่างน้อย 1 ตัวอักษร
  ministry: z.string().min(1, 'กรุณากรอกกระทรวง'),
  
  // สังกัดพรรคการเมือง: ต้องกรอก และมีอย่างน้อย 1 ตัวอักษร
  politicalParty: z.string().min(1, 'กรุณากรอกสังกัดพรรคการเมือง'),
});

export type MPFormData = z.infer<typeof MPSchema>;