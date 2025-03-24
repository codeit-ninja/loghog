import { logger } from '$lib/logger'

export const load = async ({ locals, url, route }) => {
	const groups = await locals.services.logs().groups()
	const logs = await locals.services.logs().list({ where: { group: null } })

    // logger.log('info', 'Loading layout', { groups, logs })

	// setTimeout(() => {
	// 	logger.log('info', 'Loaded layout', { groups, logs })
	// }, 2000)

	return {
		groups,
		logs,
		breadcrumbs: locals.breadcrumbs
	}
}
