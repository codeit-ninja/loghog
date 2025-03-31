import { error } from '@sveltejs/kit'

export const load = async ({ params, locals }) => {
	const result = await locals.services.logs().get(params.path)

	if (result.isErr()) {
		return error(404, result.error.type)
	}

	locals.breadcrumbs.push({ title: result.value.name, path: `/logs/${result.value.path}` })

	if (result.value.group) {
		locals.breadcrumbs.push({ title: result.value.group, path: `/logs/${result.value.path}` })
	}

	return result.value
}
