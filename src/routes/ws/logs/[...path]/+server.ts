import type { Socket } from '@sveltejs/kit'

export const socket: Socket = {
	upgrade(req) {
		req.context.log = req.params.path
	},

	open(peer) {
		peer.subscribe(peer.context.log as string)
	},

	close(peer, event) {
		peer.terminate()
	}
}
