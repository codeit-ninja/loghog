import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()

async function main() {
	const alice = await prisma.users.upsert({
		where: { email: 'alice@prisma.io' },
		update: {},
		create: {
			email: 'richard@codeit.ninja',
			name: 'Richard Mauritz',
			password: await hash('password')
		}
	})
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
