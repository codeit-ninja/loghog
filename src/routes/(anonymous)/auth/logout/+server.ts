import { redirect } from '@sveltejs/kit'

export const GET = async ({ cookies }) => {
	cookies.delete('auth', { path: '/' })
	return redirect(302, '/auth/login')
}
