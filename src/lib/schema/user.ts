import { z } from 'zod';

export const loginSchema = z.object({
	username: z.string({ message: 'Wajib diisi' }),
	password: z.string({ message: 'Wajib diisi' })
});
