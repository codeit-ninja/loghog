import type { Prisma } from '@prisma/client'
import { BaseService } from './base-service'
import type { DefaultArgs } from '@prisma/client/runtime/client'
import { prisma } from '$lib/server/app'

export type GetLogsFilters = {
	orderBy?: Prisma.eventsOrderByWithRelationInput
}

export class LogsService extends BaseService {
	/**
	 * Gets a log by its slug, along with its 100 most recent events.
	 *
	 * @param slug The slug of the log to retrieve.
	 * @param filters An object containing filters to apply to the events.
	 * @returns The log and its 100 most recent events.
	 */
	get(path: string, filters?: Omit<Prisma.logsFindUniqueOrThrowArgs<DefaultArgs>, 'where'>) {
		return prisma.logs.findUniqueOrThrow({
			where: { path },
			...filters
		})
	}

	list(args?: Prisma.logsFindManyArgs<DefaultArgs>) {
		return prisma.logs.findMany(args)
	}

	async groups() {
		const groups = await prisma.logs.groupBy({
			by: ['group']
		})

		return await Promise.all(
			groups.map(async ({ group }) => {
				const logs = await this.list({
					where: { group }
				})

				return {
					name: group!,
					logs
				}
			})
		)
	}

	clear(path: string) {
		return prisma.events.deleteMany({ where: { logs: { path } } })
	}
}
