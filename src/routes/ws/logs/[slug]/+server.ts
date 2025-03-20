import { type Socket } from '@sveltejs/kit'
import { publish } from '$app/server'

export const socket: Socket = {
	upgrade(req) {
		console.log(req.params.slug)
		req.context.log = req.params.slug
	},

	open(peer) {
		peer.subscribe(peer.context.log as string)
	},

	// message(peer, message) {
	// 	peer.peers.forEach((peer) => peer.send(message.data!.toString()))
	// },

	close(peer, event) {
		peer.terminate()
	}

	// error(peer, error) {
	// 	//... handle socket error
	// }
}
