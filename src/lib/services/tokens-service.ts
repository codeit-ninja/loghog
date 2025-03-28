import { prisma } from '$lib/server/app'
import { err, ok, ResultAsync } from 'neverthrow'
import { BaseService } from './base-service'
import type { Prisma, tokens } from '@prisma/client'
import { randomUUID } from 'crypto'

export class TokensService extends BaseService {
	/**
	 * Gets a token by its value.
	 *
	 * @param token The token to retrieve
	 *
	 * @returns The token
	 */
	async get(token: string) {
		const logResult = await ResultAsync.fromPromise<tokens, Prisma.PrismaClientKnownRequestError>(
			prisma.tokens.findUniqueOrThrow({ where: { token } }),
			(e) => e as Prisma.PrismaClientKnownRequestError
		)

		if (logResult.isErr()) {
			return err({
				type: 'TOKEN_NOT_FOUND',
				error: logResult.error
			})
		}

		return ok(logResult.value)
	}

	/**
	 * Generates a new token.
	 *
	 * @returns The generated token
	 */
	async create(email: string) {
		const token = randomUUID()
		const response = prisma.tokens.create({
			data: {
				token,
				users: { connect: { email } }
			}
		})
		const createResult = await ResultAsync.fromPromise<
			tokens,
			Prisma.PrismaClientKnownRequestError
		>(response, (e) => e as Prisma.PrismaClientKnownRequestError)

		if (createResult.isErr()) {
			return err({
				type: 'TOKEN_CREATION_FAILED',
				error: createResult.error
			})
		}

		return ok(createResult.value)
	}
}
