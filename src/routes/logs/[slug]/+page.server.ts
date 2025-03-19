import { logger } from '$lib/logger.js'

let interval: NodeJS.Timeout | undefined = undefined

export const load = async ({ params, locals, request }) => {
	if (interval) {
		clearInterval(interval)
	}

	//await locals.services.logs().clear(params.slug)
	const log = await locals.services.logs().get(params.slug)

	// const levels = ['debug', 'info', 'warn', 'error']
	// const randomLevel = () => levels[Math.floor(Math.random() * levels.length)]

	// interval = setTimeout(() => {
	// 	logger.log(randomLevel(), 'TEST_LOG_ERROR', { locals })
	// }, 2000)

	return {
		log
	}
}

const objects = {
	string: 'Hello world',
	number: 42,
	boolean: true,
	null: null,
	undefined: undefined,
	object: { key: 'value' },
	array: [1, 2, 3],
	symbol: Symbol('symbol'),
	function: () => {},
	date: new Date(),
	regex: /regex/
}
