import type { Socket } from '@sveltejs/kit'

export const socket: Socket = {
	upgrade(req) {
		req.context.log = req.params.path
	},

	message(peer, message) {
		console.log(message)
	},

	open(peer) {
		peer.subscribe(peer.context.log as string)
	},

	close(peer, event) {
		peer.unsubscribe(peer.context.log as string)
	}
}
