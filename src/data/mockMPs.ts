// src/data/mockMPs.ts
import type { MPFormData } from "../schema/mpschema";

const positionPriority: Record<string, number> = {
  "นายกรัฐมนตรี": 1,
  "รองนายกรัฐมนตรี": 2,
  "ประธานสภาฯ": 3,
  "รองประธานสภาฯ": 4,
  "รัฐมนตรี": 5,
  "รัฐมนตรีช่วย": 6,
  "สมาชิกสภาฯ": 7,
};

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMockMPs(count: number = 500): MPFormData[] {
  const prefixes = ["นาย", "นาง", "นางสาว"];
  const firstNames = ["สมชาย", "สมศรี", "วิชัย", "ปวีณา", "อาทิตย์", "จันทร์เพ็ญ", "ธนาธร", "สุดารัตน์", "ประยุทธ์", "อภิสิทธิ์", "ยิ่งลักษณ์", "ชวน"];
  const lastNames = ["ไทยดี", "สุขใจ", "สมบูรณ์", "ประเสริฐ", "รุ่งเรือง", "ทรงชัย", "จึงรุ่งเรืองกิจ", "เกยุราพันธุ์", "จันทร์โอชา", "เวชชาชีวะ", "ชินวัตร", "หลีกภัย"];
  const parties = ["พรรคประชาธิปัตย์", "พรรคเพื่อไทย", "พรรคก้าวไกล", "พรรคชาติไทยพัฒนา", "พรรครวมไทยสร้างชาติ", "พรรคพลังประชารัฐ", "พรรคภูมิใจไทย"];
  const ministries = ["กระทรวงการคลัง", "กระทรวงศึกษาธิการ", "กระทรวงสาธารณสุข", "กระทรวงมหาดไทย", "กระทรวงกลาโหม", "กระทรวงยุติธรรม", "กระทรวงการต่างประเทศ"];

  const mps: MPFormData[] = [];
  
  // 1. นายกรัฐมนตรี (1 คน)
  mps.push({
    prefix: "นาย",
    firstName: "อาทิตย์",
    lastName: "รุ่งเรือง",
    photo: "",
    photoDisplay: "",
    workHistory: "ประสบการณ์ทำงานหลายปีในรัฐสภา",
    pastWorks: "ผลงานเด่นในสภา",
    ministerialPosition: "นายกรัฐมนตรี",
    ministry: "",
    politicalParty: randomChoice(parties),
  });
  
  // 2. รองนายกรัฐมนตรี (6 คน)
  for (let i = 0; i < 6; i++) {
    mps.push({
      prefix: randomChoice(prefixes),
      firstName: randomChoice(firstNames),
      lastName: randomChoice(lastNames),
      photo: "",
      photoDisplay: "",
      workHistory: "ประสบการณ์ทำงานหลายปีในรัฐสภา",
      pastWorks: "ผลงานเด่นในสภา",
      ministerialPosition: "รองนายกรัฐมนตรี",
      ministry: randomChoice(ministries),
      politicalParty: randomChoice(parties),
    });
  }

  // 3. ประธานสภาฯ และ รองประธานสภาฯ (อย่างละ 1 คน)
  mps.push({
    prefix: randomChoice(prefixes),
    firstName: randomChoice(firstNames),
    lastName: randomChoice(lastNames),
    photo: "",
    photoDisplay: "",
    workHistory: "ผู้ทรงคุณวุฒิ",
    pastWorks: "ประธานการประชุมสภา",
    ministerialPosition: "ประธานสภาฯ",
    ministry: "",
    politicalParty: randomChoice(parties),
  });
  
  mps.push({
    prefix: randomChoice(prefixes),
    firstName: randomChoice(firstNames),
    lastName: randomChoice(lastNames),
    photo: "",
    photoDisplay: "",
    workHistory: "ประสบการณ์ในกรรมาธิการ",
    pastWorks: "รองประธานการประชุมสภา",
    ministerialPosition: "รองประธานสภาฯ",
    ministry: "",
    politicalParty: randomChoice(parties),
  });

  // 4. รัฐมนตรี (20 คน)
  for (let i = 0; i < 20; i++) {
    mps.push({
      prefix: randomChoice(prefixes),
      firstName: randomChoice(firstNames),
      lastName: randomChoice(lastNames),
      photo: "",
      photoDisplay: "",
      workHistory: "ประสบการณ์ทำงานหลายปีในรัฐสภา",
      pastWorks: "ผลงานเด่นในสภา",
      ministerialPosition: "รัฐมนตรี",
      ministry: randomChoice(ministries),
      politicalParty: randomChoice(parties),
    });
  }

  // 5. รัฐมนตรีช่วย (11 คน)
  for (let i = 0; i < 11; i++) {
    mps.push({
      prefix: randomChoice(prefixes),
      firstName: randomChoice(firstNames),
      lastName: randomChoice(lastNames),
      photo: "",
      photoDisplay: "",
      workHistory: "ประสบการณ์ทำงานหลายปีในรัฐสภา",
      pastWorks: "ผลงานเด่นในสภา",
      ministerialPosition: "รัฐมนตรีช่วย",
      ministry: randomChoice(ministries),
      politicalParty: randomChoice(parties),
    });
  }

  // 6. สมาชิกสภาฯ ที่เหลือ
  const remainingCount = count - mps.length;
  for (let i = 0; i < remainingCount; i++) {
    mps.push({
      prefix: randomChoice(prefixes),
      firstName: randomChoice(firstNames),
      lastName: randomChoice(lastNames),
      photo: "",
      photoDisplay: "",
      workHistory: "ประสบการณ์ทำงานหลายปีในรัฐสภา",
      pastWorks: "ผลงานเด่นในสภา",
      ministerialPosition: "สมาชิกสภาฯ",
      ministry: "",
      politicalParty: randomChoice(parties),
    });
  }

  // เรียงตามความสำคัญของตำแหน่ง
  mps.sort((a, b) => {
    const priorityA = positionPriority[a.ministerialPosition] || 99;
    const priorityB = positionPriority[b.ministerialPosition] || 99;
    return priorityA - priorityB;
  });

  return mps;
}

export const mockMPs = generateMockMPs();