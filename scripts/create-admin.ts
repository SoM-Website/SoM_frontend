// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123!@#', 10)
  
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      passwordHash: hashedPassword,
      role: 'ADMIN'
    },
    create: {
      username: 'admin',
      email: 'admin@example.com',
      name: '관리자',
      passwordHash: hashedPassword,
      role: 'ADMIN'
    }
  })
  
  console.log('관리자 계정 생성/업데이트 완료:')
  console.log('   아이디: admin')
  console.log('   비밀번호: admin123!@#')
  console.log('   권한:', admin.role)
}

main()
  .catch((e) => {
    console.error('❌ 에러:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })