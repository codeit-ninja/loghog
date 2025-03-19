import type { RequestEvent } from '@sveltejs/kit'
import { LogsService } from './logs-service'
import { EventsService } from './events-service'

export class Services {
	constructor(readonly event: RequestEvent) {}

	logs() {
		return new LogsService(this, this.event.locals)
	}

	events() {
		return new EventsService(this, this.event.locals)
	}
}
