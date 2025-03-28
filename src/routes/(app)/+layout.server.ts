export const load = async ({ locals }) => {
	const groups = await locals.services.logs().groups()
	const logs = await locals.services.logs().list({ where: { group: null } })

	return {
		groups,
		logs
	}
}
