import { z } from 'zod';

const userCreateValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Min length 6' })
      .max(16, { message: 'Max length 16' }),
  }),
});

const userUpdateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Invalid email' }).optional(),
    password: z
      .string()
      .min(6, { message: 'Min length 6' })
      .max(16, { message: 'Max length 16' })
      .optional(),
  }),
});

export const UserValidations = {
  userCreateValidation,
  userUpdateValidation,
};
