import { sequence } from '@sveltejs/kit/hooks'
import { install } from '$lib/server/middlewares/install'
import { app } from '$lib/server/middlewares/app'
import { auth } from '$lib/server/middlewares/auth'

export const handle = sequence(install, app, auth)
