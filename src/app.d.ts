// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			services: import('./lib/services').Services
			prisma: import('@prisma/client').PrismaClient
			socket: import('ws').WebSocket
			breadcrumbs: { title: string; path: string }[]
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
