import type { Prisma } from '@prisma/client'
import { error, json } from '$lib/server/response'
import QueryString from 'qs'
import { subMilliseconds } from 'date-fns'

type QueryParams = {
	orderBy?: string
	level?: string
	range?: string
	query?: string
}

export const GET = async ({ params, locals, url }) => {
	const searchParams = url.searchParams.toString()
	const {
		orderBy: orderByRaw,
		level,
		range: rangeRaw,
		query
	} = QueryString.parse(searchParams) as QueryParams

	const levels = level?.split(',')
	const range = rangeRaw ? parseInt(rangeRaw, 10) : 0

	// Parse orderBy field
	let orderBy: Prisma.eventsOrderByWithRelationInput = {
		timestamp: 'desc'
	}
	if (orderByRaw) {
		const [field, direction] = orderByRaw.split('-')
		orderBy = { [direction ? direction : field]: direction ? 'desc' : 'asc' }
	}

	// Construct where conditions
	let where: Prisma.eventsWhereInput = {}

	if (levels?.includes('all')) {
		where.level = undefined
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
		include: { events: { orderBy, where, take: 100 } }
	})

	if (log.isErr()) {
		console.error('Error fetching logs:', log.error)
		return error(404, 'NOT_FOUND')
	}

	return json(log.value)
}
