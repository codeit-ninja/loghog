import { type Socket } from '@sveltejs/kit'

export const socket: Socket = {
	upgrade(req) {},

	open(peer) {
		console.log(peer.id)
	},

	message(peer, message) {
		peer.peers.forEach((peer) => peer.send(message.data!.toString()))
	},

	close(peer, event) {
		//... handle socket close
	},

	error(peer, error) {
		//... handle socket error
	}
}
