import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(8)
})

export const signupSchema = z.object({
	email: z.string().email().min(1),
	name: z.string().min(1),
	password: z.string().min(8),
	confirmPassword: z.string().min(8)
})
