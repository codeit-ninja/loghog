import type { Prisma, logs } from '@prisma/client'
import type { DefaultArgs } from '@prisma/client/runtime/client'
import { BaseService } from './base-service'
import { prisma } from '$lib/server/app'
import { err, errAsync, ok, ResultAsync } from 'neverthrow'

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
	async get(path: string, filters?: Omit<Prisma.logsFindUniqueOrThrowArgs<DefaultArgs>, 'where'>) {
		const logResult = await ResultAsync.fromPromise<logs, Prisma.PrismaClientKnownRequestError>(
			prisma.logs.findUniqueOrThrow({ where: { path }, ...filters }),
			(e) => e as Prisma.PrismaClientKnownRequestError
		)

		if (logResult.isErr()) {
			return err({
				type: 'LOG_NOT_FOUND',
				error: logResult.error
			})
		}

		return ok(logResult.value)
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
