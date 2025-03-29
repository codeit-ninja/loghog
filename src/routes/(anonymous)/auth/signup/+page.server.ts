import { fail, message, setError, superValidate } from 'sveltekit-superforms'
import { arktype } from 'sveltekit-superforms/adapters'
import { signupSchema, signupSchemaDefaults } from '../schema'
import { error, redirect } from '@sveltejs/kit'
import { prisma } from '$lib/server/app'

export const load = async ({ locals }) => {
	locals.breadcrumbs.push(
		{ title: 'Signup', path: '/auth/signup' },
		{ title: 'Signup', path: '/auth/signup' }
	)

	return {
		form: await superValidate(arktype(signupSchema, { defaults: signupSchemaDefaults }))
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, arktype(signupSchema, { defaults: signupSchemaDefaults }))

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		const result = await event.locals.services
			.auth()
			.signup(form.data.email, form.data.name, form.data.password)

		if (result.isErr()) {
			if (result.error.type === 'USER_ALREADY_EXISTS') {
				return setError(form, 'email', 'Email already exists')
			}

			if (result.error.type === 'UNKNOWN_ERROR') {
				return error(500, {
					message: 'An unknown error occurred'
				})
			}

			return error(500, {
				message: 'An unknown error occurred'
			})
		}

		await event.locals.services.settings().set('didSetup', true)
		return redirect(303, '/auth/login?signup=true')
	}
}
