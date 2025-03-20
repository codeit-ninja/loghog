import { json, type Socket } from '@sveltejs/kit'

export const socket: Socket = {
	upgrade(req) {
		console.log(req.params.path)
		req.context.log = req.params.path
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
