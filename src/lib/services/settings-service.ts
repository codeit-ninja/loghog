import { prisma } from '$lib/server/app'
import { BaseService } from './base-service'

export class SettingsService extends BaseService {
	/**
	 * Get a setting by key
	 *
	 * @param key The key of the setting to get
	 *
	 * @returns The setting
	 */
	async get(key: string) {
		const setting = await prisma.settings.findFirst({ where: { key } })

		if (!setting) {
			return null
		}

		return JSON.parse(setting.value)
	}
	/**
	 * Set a setting by key
	 *
	 * @param key The key of the setting to set
	 * @param value The value of the setting to set
	 *
	 * @returns The setting value
	 */
	async set(key: string, value: any) {
		const setting = await prisma.settings.upsert({
			where: { key },
			update: { value: JSON.stringify(value) },
			create: { key, value: JSON.stringify(value) }
		})

		return JSON.parse(setting.value)
	}
	/**
	 * Delete a setting by key
	 *
	 * @param key The key of the setting to delete
	 *
	 * @returns The setting
	 */
	delete(key: string) {
		return prisma.settings.delete({ where: { key } })
	}
	/**
	 * Get all settings
	 *
	 * @returns All settings
	 */
	async getAll() {
		return await Promise.all(
			(await prisma.settings.findMany()).map((setting) => {
				return {
					key: setting.key,
					value: JSON.parse(setting.value)
				}
			})
		)
	}
}
