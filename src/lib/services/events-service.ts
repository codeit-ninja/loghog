import slugify from 'slugify'
import { BaseService } from './base-service'
import WebSocket from 'ws'
import { PUBLIC_SOCKET_URL } from '$env/static/public'

export class EventsService extends BaseService {
	async insert(log: string, level: string, message: string, timestamp: string, meta: string) {
		const slug = slugify(log, { lower: true, trim: true })
		const websocket = new WebSocket(`${PUBLIC_SOCKET_URL}/logs/${slug}`)

		websocket.on('open', () => {
			websocket.send(
				JSON.stringify({
					level,
					message,
					meta,
					timestamp
				})
			)

			websocket.close()
		})

		return this.locals.prisma.events.create({
			data: {
				level,
				message,
				meta,
				timestamp,
				logs: {
					connectOrCreate: {
						create: {
							name: log,
							slug
						},
						where: {
							slug
						}
					}
				}
			}
		})
	}
}
