import type { Services } from '.'

export class BaseService {
	constructor(
		protected services: Services,
		protected locals: App.Locals
	) {}
}
