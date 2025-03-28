import type { Prisma, tokens, users } from '@prisma/client'
import { err, ok, ResultAsync } from 'neverthrow'
import { BaseService } from './base-service'
import { prisma } from '$lib/server/app'
import { hash, verify } from 'argon2'

export type USER_ALREADY_EXISTS = {
	type: 'USER_ALREADY_EXISTS'
	error: Prisma.PrismaClientKnownRequestError
}

export type UNKNOWN_ERROR = {
	type: 'UNKNOWN_ERROR'
}

export type USER_NOT_FOUND = {
	type: 'USER_NOT_FOUND'
	error: Prisma.PrismaClientKnownRequestError
}

export type PASSWORD_INCORRECT = {
	type: 'PASSWORD_INCORRECT'
}

export type TOKEN_CREATION_FAILED = {
	type: 'TOKEN_CREATION_FAILED'
	error: Prisma.PrismaClientKnownRequestError
}

export class AuthService extends BaseService {
	/**
	 * Logs a user in by verifying their credentials and generating a token.
	 *
	 * @param email - The email address of the user to log in.
	 * @param password - The password of the user to log in.
	 * @returns A ResultAsync containing the token on success, or an error on failure.
	 */
	async login(
		email: string,
		password: string
	): Promise<ResultAsync<tokens, USER_NOT_FOUND | PASSWORD_INCORRECT | TOKEN_CREATION_FAILED>> {
		// Helper function to create consistent error results
		const createError = <T extends USER_NOT_FOUND | PASSWORD_INCORRECT | TOKEN_CREATION_FAILED>(
			type: T['type'],
			error?: any
		) => err({ type, error })

		const userResult = await this.services.users().get(email)
		if (userResult.isErr()) {
			return createError('USER_NOT_FOUND', userResult.error.error)
		}

		const isPasswordCorrect = await this.verifyPassword(password, userResult.value.password)
		if (!isPasswordCorrect) {
			return createError('PASSWORD_INCORRECT')
		}

		const createTokenResult = await this.services.tokens().create(email)
		if (createTokenResult.isErr()) {
			return createError('TOKEN_CREATION_FAILED', createTokenResult.error.error)
		}

		return ok(createTokenResult.value)
	}

	/**
	 * Sign up a new user
	 *
	 * @param email
	 * @param name
	 * @param password
	 * @param role
	 *
	 * @returns The created user
	 */
	async signup(
		email: string,
		name: string,
		password: string,
		role?: string
	): Promise<ResultAsync<Omit<users, 'password'>, USER_ALREADY_EXISTS | UNKNOWN_ERROR>> {
		const hashedPassword = await hash(password)

		return ResultAsync.fromPromise(
			prisma.users.create({
				data: {
					email,
					name,
					password: hashedPassword,
					role
				},
				select: {
					id: true,
					email: true,
					name: true,
					role: true,
					createdAt: true,
					updatedAt: true
				}
			}),
			(e) => e as Prisma.PrismaClientKnownRequestError
		)
			.map((user) => {
				return {
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt
				}
			})
			.mapErr((e) => {
				if (e.code === 'P2002') {
					return {
						type: 'USER_ALREADY_EXISTS',
						error: e
					}
				}

				return {
					type: 'UNKNOWN_ERROR',
					error: e
				}
			})
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
