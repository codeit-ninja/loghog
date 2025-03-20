import { PUBLIC_SOCKET_URL } from '$env/dynamic/public'

export class Socket {
	socket: WebSocket

	connected = false

	disconnected = true

	constructor(path: string) {
		this.socket = new WebSocket(`${PUBLIC_SOCKET_URL}${path}`)
		this.socket.addEventListener('open', this.connect.bind(this))
		this.socket.addEventListener('close', this.disconnect.bind(this))
	}

	connect(ev: Event) {
		console.log(`✅ Connected to ${this.socket.url}`)

		this.connected = true
		this.disconnected = false
	}

	disconnect(ev: Event) {
		console.log(`❌ Disconnected from ${this.socket.url}`)

		this.connected = false
		this.disconnected = true
	}

	/**
	 * Async generator that yields messages as they are received from the websocket.
	 * It will wait indefinitely until a message is received.
	 *
	 * @yields {string} The message received from the websocket
	 */
	async *message() {
		const queue: MessageEvent[] = []
		const listener = (event: MessageEvent) => queue.push(event)

		this.socket.addEventListener('message', listener)

		try {
			while (true) {
				if (queue.length > 0) {
					yield queue.shift()!.data
				} else {
					await new Promise((resolve) => setTimeout(resolve, 10)) // Prevents busy-waiting
				}
			}
		} finally {
			this.socket.removeEventListener('message', listener)
		}
	}
}
