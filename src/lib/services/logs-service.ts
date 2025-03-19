import type { Prisma } from '@prisma/client'
import { BaseService } from './base-service'
import type { DefaultArgs } from '@prisma/client/runtime/client'

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
	get(slug: string, filters?: Omit<Prisma.logsFindUniqueOrThrowArgs<DefaultArgs>, 'where'>) {
		return this.locals.prisma.logs.findUniqueOrThrow({
			where: { slug },
			...filters
		})
	}

	list(args?: Prisma.logsFindManyArgs<DefaultArgs>) {
		return this.locals.prisma.logs.findMany(args)
	}

	clear(slug: string) {
		return this.locals.prisma.events.deleteMany({ where: { logs: { slug } } })
	}
}
