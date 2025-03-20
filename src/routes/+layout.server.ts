import { logger } from '$lib/logger'

export const load = async ({ locals, request, cookies, getClientAddress }) => {
	const groups = await locals.services.logs().groups()
	const logs = await locals.services.logs().list()

	// setTimeout(() => {
	// 	logger.log('warn', 'Loaded layout', { groups, logs })
	// }, 2000)

	return {
		groups,
		logs
	}
}
