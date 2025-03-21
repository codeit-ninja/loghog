import { Services } from '$lib/services'

export const handle = async ({ event, resolve }) => {
	event.locals.breadcrumbs = []
	event.locals.services = new Services(event)

	return resolve(event)
}
