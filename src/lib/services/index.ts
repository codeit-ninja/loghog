import type { RequestEvent } from '@sveltejs/kit'
import { LogsService } from './logs-service'
import { EventsService } from './events-service'
import { AuthService } from './auth-server'
import { UsersService } from './users-server'
import { TokensService } from './tokens-service'
import { SettingsService } from './settings-service'

export class Services {
	constructor(readonly event: RequestEvent) {}

	auth() {
		return new AuthService(this, this.event.locals)
	}

	logs() {
		return new LogsService(this, this.event.locals)
	}

	events() {
		return new EventsService(this, this.event.locals)
	}

	users() {
		return new UsersService(this, this.event.locals)
	}

	tokens() {
		return new TokensService(this, this.event.locals)
	}

	settings() {
		return new SettingsService(this, this.event.locals)
	}
}
