import { Services } from '$lib/services'

export const handle = async ({ event, resolve }) => {
	event.locals.services = new Services(event)

	return resolve(event)
}
