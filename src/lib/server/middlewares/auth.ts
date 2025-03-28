import type { Handle } from '@sveltejs/kit'

export const auth: Handle = async ({ event, resolve }) => {
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

	return resolve(event)
}
