import { json } from '@sveltejs/kit'

export const POST = async ({ request, url, locals }) => {
	const body = await request.json()
	const name = url.searchParams.get('name') as string
	const group = url.searchParams.get('group') as string | undefined
	const message = body.message as string
	const level = body.level as string
	const timestamp = body.timestamp as string

	delete body.message
	delete body.level
	delete body.timestamp

	await locals.services.events().insert(name, group, level, message, timestamp, body)

	return json('OK')
}
