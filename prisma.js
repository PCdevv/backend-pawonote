const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({ log: ['query'] })
// const prisma =
//   global.prisma ||
//   new PrismaClient({
//     log: ['query'],
  // })

async function main() {
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
}

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

module.exports = prisma