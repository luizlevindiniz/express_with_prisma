import { PrismaClient } from 'prisma/prisma-client'
import { createApp } from './app'

const port = 3001

export const prisma = new PrismaClient()

async function index() {
    createApp().listen(port, () => console.log(`App running - http://localhost:${port}/health`))
}

index()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })