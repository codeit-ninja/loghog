import type { Prisma, users } from '@prisma/client'
import type { DefaultArgs } from '@prisma/client/runtime/client'
import { err, ok, ResultAsync } from 'neverthrow'
import { BaseService } from './base-service'
import { prisma } from '$lib/server/app'

export class UsersService extends BaseService {
	/**
	 * Gets a user by their email address.
	 *
	 * @param email The email address of the user to retrieve
	 * @param filters An object containing filters to apply to the user
	 *
	 * @returns The user
	 */
	async get(
		email: string,
		filters?: Omit<Prisma.usersFindUniqueOrThrowArgs<DefaultArgs>, 'where'>
	) {
		const logResult = await ResultAsync.fromPromise<users, Prisma.PrismaClientKnownRequestError>(
			prisma.users.findUniqueOrThrow({ where: { email }, ...filters }),
			(e) => e as Prisma.PrismaClientKnownRequestError
		)

		if (logResult.isErr()) {
			return err({
				type: 'USER_NOT_FOUND',
				error: logResult.error
			})
		}

		return ok(logResult.value)
	}
}
