import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' }),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
