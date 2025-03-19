import { json as jsonResponse } from '@sveltejs/kit'

/**
 * Returns a JSON response with the given data.
 *
 * The status code is set to 200 OK and the error code is set to OK.
 *
 * @example
 * json({ foo: 'bar' })
 * @param {unknown} data The data to include in the response.
 * @returns {Response}
 */
export const json = <T extends unknown>(data: T) => {
	return jsonResponse({
		status: 200,
		code: 'OK',
		data
	})
}
/**
 * Returns a JSON response with the given status code and error code.
 *
 * If a message is given, it will be included in the response.
 * If data is given, it will be included in the response.
 *
 * @example
 * error(400, 'BAD_REQUEST', 'The request was invalid')
 * @example
 * error(500, 'INTERNAL_ERROR', 'Something went wrong', { foo: 'bar' })
 * @param {number} status The HTTP status code for the response.
 * @param {string} code The error code for the response.
 * @param {string} [message] The error message for the response.
 * @param {unknown} [data] Additional data to include in the response.
 */

export const error = (status: number, code: string, message?: string, data?: unknown) => {
	return jsonResponse(
		{
			status,
			code,
			message,
			data
		},
		{ status }
	)
}
