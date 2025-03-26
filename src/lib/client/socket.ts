import { env } from '$env/dynamic/public'

export class Socket {
	socket: WebSocket

	connected = false

	disconnected = true

	/**
	 * Constructor for the Socket class.
	 * Establishes a connection to the server at the given path.
	 * @param {string} path - The path to connect to.
	 */
	constructor(path: string) {
		console.log(`🔗 Connecting to /ws${path}`)

		this.socket = new WebSocket(`/ws${path}`)
		this.socket.addEventListener('open', this.connect.bind(this))
		this.socket.addEventListener('close', this.disconnect.bind(this))
	}

	/**
	 * Event handler that gets called when the websocket connection is established.
	 * When this happens, the `connected` property is set to `true` and the
	 * `disconnected` property is set to `false`.
	 *
	 * @param {Event} ev
	 */
	connect(ev: Event) {
		console.log(`✅ Connected to ${this.socket.url}`)

		this.connected = true
		this.disconnected = false
	}

	/**
	 * Event handler that gets called when the websocket connection is closed.
	 * When this happens, the `connected` property is set to `false` and the
	 * `disconnected` property is set to `true`.
	 *
	 * @param {Event} ev
	 */
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
