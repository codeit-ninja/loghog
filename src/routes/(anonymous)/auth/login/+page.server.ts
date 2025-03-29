import { fail, setError, superValidate } from 'sveltekit-superforms'
import { arktype, zod } from 'sveltekit-superforms/adapters'
import { loginSchema, loginSchemaDefaults } from '../schema'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	locals.breadcrumbs.push(
		{ title: 'account', path: '/auth/login' },
		{ title: 'login', path: '/auth/login' }
	)

	return {
		form: await superValidate(arktype(loginSchema, { defaults: loginSchemaDefaults }))
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, arktype(loginSchema, { defaults: loginSchemaDefaults }))

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		const result = await event.locals.services.auth().login(form.data.email, form.data.password)

		if (result.isErr()) {
			if (result.error.type === 'PASSWORD_INCORRECT') {
				return setError(form, 'password', 'Password is incorrect')
			}

			return setError(form, 'email', 'Email is incorrect')
		}

		event.cookies.set('auth', JSON.stringify(result.value), { path: '/' })

		return redirect(303, '/')
	}
}
