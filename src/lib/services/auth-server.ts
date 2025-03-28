import type { Prisma, users } from '@prisma/client'
import { err, ok, ResultAsync } from 'neverthrow'
import { BaseService } from './base-service'
import { prisma } from '$lib/server/app'
import { verify } from 'argon2'

export class AuthService extends BaseService {
	/**
	 * Logs a user in.
	 *
	 * @param email The email address of the user to log in
	 * @param password The password of the user to log in
	 *
	 * @returns The token
	 */
	async login(email: string, password: string) {
		const userResult = await this.services.users().get(email)

		if (userResult.isErr()) {
			return err({
				type: 'USER_NOT_FOUND',
				error: userResult.error.error
			})
		}

		const isPasswordCorrect = await this.verifyPassword(password, userResult.value.password)

		if (isPasswordCorrect === false) {
			return err({
				type: 'PASSWORD_INCORRECT'
			})
		}

		const createTokenResult = await this.services.tokens().create(email)

		if (createTokenResult.isErr()) {
			return err({
				type: 'TOKEN_CREATION_FAILED',
				error: createTokenResult.error.error
			})
		}

		return ok(createTokenResult.value)
	}

	/**
	 * Logs a user out.
	 *
	 * @param token The token of the user to log out
	 *
	 * @returns Whether the logout was successful
	 */
	async getUserByToken(token: string) {
		const userResult = await ResultAsync.fromPromise<
			Omit<users, 'password'> | null,
			Prisma.PrismaClientKnownRequestError
		>(
			prisma.users.findFirst({
				where: { tokens: { some: { token } } },
				select: {
					name: true,
					id: true,
					email: true,
					role: true,
					createdAt: true,
					updatedAt: true
				}
			}),
			(e) => e as Prisma.PrismaClientKnownRequestError
		)

		if (userResult.isErr()) {
			return err({
				type: 'USER_NOT_FOUND',
				error: userResult.error
			})
		}

		if (userResult.value === null) {
			return err({
				type: 'USER_NOT_FOUND'
			})
		}

		return ok(userResult.value)
	}

	/**
	 * Verifies a password against a hash.
	 *
	 * @param password The password to verify
	 * @param hash The hash to verify against
	 *
	 * @returns Whether the password is correct
	 */
	async verifyPassword(password: string, hash: string) {
		const passwordResult = await ResultAsync.fromPromise<boolean, Error>(
			verify(hash, password),
			(e) => e as Error
		)

		if (passwordResult.isErr()) {
			return false
		}

		return passwordResult.value
	}
}
