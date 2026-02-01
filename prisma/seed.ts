import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function upsertAdmin(email: string, name: string, plainPassword: string) {
  const hash = await bcrypt.hash(plainPassword, 12);
  await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN", name, passwordHash: hash },
    create: { email, role: "ADMIN", name, passwordHash: hash }
  });
}

async function main() {
  // 필요 인원만 추가하세요. 이후에는 관리자 UI나 API로 관리 권장.
  await upsertAdmin("admin@som.kr", "관리자", "change-me-strong!");
  // 예: await upsertAdmin("second@som.kr", "보조관리자", "another-strong-pass");
  console.log("Admin seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
