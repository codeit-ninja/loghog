import { fail, setError, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { loginSchema } from '../schema'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	locals.breadcrumbs.push(
		{ title: 'account', path: '/auth/login' },
		{ title: 'login', path: '/auth/login' }
	)

	return {
		form: await superValidate(zod(loginSchema), {
			defaults: { email: 'richard@codeit.ninja', password: 'password' }
		})
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema))

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
