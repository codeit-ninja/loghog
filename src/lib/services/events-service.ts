import slugify from 'slugify'
import { BaseService } from './base-service'
import { PUBLIC_SOCKET_URL } from '$env/static/public'
import { publish } from '$app/server'
import { prisma } from '$lib/server/app'

export class EventsService extends BaseService {
	/**
	 * Inserts a new event into the database, creating the log if it doesn't exist.
	 *
	 * @param log - The name of the log to which the event belongs.
	 * @param level - The severity level of the event (e.g., error, warn, info, debug).
	 * @param message - The message describing the event.
	 * @param timestamp - The timestamp when the event occurred.
	 * @param meta - Additional metadata related to the event, in JSON format.
	 *
	 * @returns A promise that resolves to the created event record.
	 */
	async insert(
		log: string,
		group: string | undefined,
		level: string,
		message: string,
		timestamp: string,
		meta: string
	) {
		const path = slugify(group ? `${group}/${log}` : log, {
			lower: true,
			trim: true,
			remove: /[*+~()'"!:#@]/g
		})

		const event = await prisma.events.create({
			data: {
				level,
				message,
				meta,
				timestamp,
				logs: {
					connectOrCreate: {
						create: {
							name: log,
							group,
							path
						},
						where: {
							path
						}
					}
				}
			},
			include: {
				logs: true
			}
		})

		publish(event.logs.path, JSON.stringify({ log, level, message, timestamp, meta }))

		return event
	}
}
