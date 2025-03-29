import { type } from 'arktype'
import { z } from 'zod'

// export const loginSchema = z.object({
// 	email: z.string().email().min(1),
// 	password: z.string().min(8)
// })

// export const signupSchema = z.object({
// 	email: z.string().email().min(1),
// 	name: z.string().min(1),
// 	password: z.string().min(8),
// 	confirmPassword: z.string().min(8)
// })

export const loginSchema = type({
    email: 'string.email',
    password: 'string >= 8'
})

export const loginSchemaDefaults: typeof loginSchema.infer = {
     email: '',
     password: ''
}

export const signupSchema = type({
    email: 'string.email',
    name: 'string > 1',
    password: 'string >= 8',
    confirmPassword: 'string >= 8'
}).narrow((data, ctx) => {
	if (data.password === data.confirmPassword) {
		return true
	}
	return ctx.reject({
		expected: "identical to password",
		// don't display the password in the error message!
		actual: "",
		path: ["confirmPassword"]
	})
})

export const signupSchemaDefaults: typeof signupSchema.infer = {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
}