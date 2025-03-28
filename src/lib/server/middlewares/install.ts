import { redirect, type Handle } from '@sveltejs/kit'
import { prisma } from '../app'

export const install: Handle = async ({ event, resolve }) => {
	const hasSettings = await prisma.settings.findFirst({ where: { key: 'didSetup' } })

	if (!hasSettings && event.route.id?.endsWith('/auth/signup') === false) {
		redirect(302, '/auth/signup')
	}

	return resolve(event)
}
