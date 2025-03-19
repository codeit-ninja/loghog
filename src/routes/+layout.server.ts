import { logger } from '$lib/logger'

export const load = async ({ locals, request, cookies, getClientAddress }) => {
	const logs = await locals.services.logs().list()

	return {
		logs
	}
}
