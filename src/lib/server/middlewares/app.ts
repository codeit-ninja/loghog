import { Services } from '$lib/services'
import type { Handle } from '@sveltejs/kit'

export const app: Handle = async ({ event, resolve }) => {
	event.locals.breadcrumbs = []
	event.locals.services = new Services(event)

	return resolve(event)
}
