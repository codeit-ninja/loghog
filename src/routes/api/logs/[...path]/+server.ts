import type { Prisma } from '@prisma/client'
import { error, json } from '$lib/server/response'
import QueryString from 'qs'
import { subMilliseconds } from 'date-fns'

type QueryParams = {
	orderBy?: string
	levels?: string
	range?: string
	query?: string
	take?: string
	skip?: string
}

export const GET = async ({ params, locals, url }) => {
	const searchParams = url.searchParams.toString()
	const {
		orderBy: orderByRaw,
		levels: levelsRaw,
		range: rangeRaw,
		query,
		take,
		skip
	} = QueryString.parse(searchParams) as QueryParams

	const levels = levelsRaw?.split(',')
	const range = rangeRaw ? parseInt(rangeRaw, 10) : 0

	// Parse orderBy field
	let orderBy: Prisma.eventsOrderByWithRelationInput = {
		timestamp: 'desc'
	}
	if (orderByRaw) {
		const [field, direction] = orderByRaw.split('-')
		orderBy = { [direction ? direction : field]: direction ? 'desc' : 'asc' }
	}

	// Parse skip and take
	const takeNumber = take ? parseInt(take, 10) : 25
	const skipNumber = skip ? parseInt(skip, 10) : 0

	// Construct where conditions
	let where: Prisma.eventsWhereInput = {}

	if (levels?.includes('all')) {
		delete where.level
	} else if (levels?.length) {
		where.OR = levels.map((level) => ({ level }))
	}

	if (range > 0) {
		where.timestamp = { gte: subMilliseconds(new Date(), range) }
	}

	if (query) {
		const queryCondition = { contains: query, mode: 'insensitive' }
		// @ts-ignore
		where.OR = where.OR
			? [...where.OR, { message: queryCondition }, { level: queryCondition }]
			: [{ message: queryCondition }, { level: queryCondition }]
	}

	const log = await locals.services.logs().get(params.path, {
		include: {
			_count: {
				select: { events: { where } }
			},
			events: {
				orderBy,
				where,
				take: takeNumber,
				skip: skipNumber
			}
		}
	})

	if (log.isErr()) {
		console.error('Error fetching logs:', log.error)
		return error(404, 'NOT_FOUND')
	}

	return json(log.value, {
		// @ts-ignore
		count: log.value._count.events,
		// @ts-ignore
		cursor: log.value.events.length ? log.value.events[log.value.events.length - 1].id : null,
		skip: skipNumber,
		take: takeNumber
	})
}
