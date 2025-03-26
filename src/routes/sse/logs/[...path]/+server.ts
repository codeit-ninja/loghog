import { clients } from '$lib/server/sse'
import { produce } from 'sveltekit-sse'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const POST = ({ params }) => {
	return produce(
		function start({ emit }) {
			clients.set(params.path, emit)
		},
		{
			stop() {
				clients.delete(params.path)
			}
		}
	)
}
