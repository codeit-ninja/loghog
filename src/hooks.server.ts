import { Services } from '$lib/services'
import { redirect } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {
	event.locals.breadcrumbs = []
	event.locals.services = new Services(event)
	event.locals.user = null

	const authCookie = event.cookies.get('auth')

	if (authCookie) {
		const auth = JSON.parse(authCookie)
		const userResult = await event.locals.services.auth().getUserByToken(auth.token)

		if (userResult.isOk()) {
			event.locals.user = userResult.value
		}

		if (userResult.isErr()) {
			event.cookies.delete('auth', { path: '/' })
			event.locals.user = null
		}
	}

	if (event.locals.user === null && event.route.id?.startsWith('/(app)')) {
		redirect(302, '/auth/login')
	}

	return resolve(event)
}
