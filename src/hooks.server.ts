import { sequence } from '@sveltejs/kit/hooks'
import { app } from '$lib/server/middlewares/app'
import { auth } from '$lib/server/middlewares/auth'

export const handle = sequence(app, auth)
