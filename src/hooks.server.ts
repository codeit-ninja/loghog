import { PrismaClient } from '@prisma/client'
import { Services } from '$lib/services'

export const handle = async ({ event, resolve }) => {
	if (event.locals.prisma) {
		return resolve(event)
	}

	event.locals.prisma = new PrismaClient()
	event.locals.services = new Services(event)

	return resolve(event)
}
