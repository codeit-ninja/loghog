import { logger } from '$lib/logger.js'
import { error } from '@sveltejs/kit'

let interval: NodeJS.Timeout | undefined = undefined

export const load = async ({ params, locals, request }) => {
	if (interval) {
		console.log(interval)
		clearInterval(interval)
	}

	// const levels = ['debug', 'info', 'warn', 'error']
	// const randomLevel = () => levels[Math.floor(Math.random() * levels.length)]

	// interval = setInterval(() => {
	// 	const level = randomLevel()
	// 	logger.log(level, 'TEST_LOG_ERROR_' + level.toUpperCase(), { data: locals.services })
	// }, 250)

	//await locals.services.logs().clear(params.slug)

	try {
		const log = await locals.services.logs().get(params.path)

		return {
			log
		}
	} catch (e) {
		return error(404, 'LOG_NOT_FOUD')
	}
}
