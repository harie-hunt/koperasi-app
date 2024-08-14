import { Kelamin } from '@prisma/client';
import { z } from 'zod';

export const anggotaSchema = z.object({
	nama: z.string().min(4).max(32).toUpperCase().trim(),
	kelamin: z.nativeEnum(Kelamin),
	nik: z.string().min(16).max(16).pipe(z.coerce.number()),
	kk: z
		.string()
		.pipe(z.coerce.number())
		.optional()
		.refine((val) => (!val ? true : val.toString().length === 16), {
			message: 'Harus 16 digit',
			path: ['kk']
		}),
	tempatLahir: z.string().toUpperCase().trim().optional(),
	tanggalLahir: z.string().pipe(z.coerce.date()),
	pekerjaan: z.string().toUpperCase().trim().optional(),
	alamat: z.string().toUpperCase().trim().optional(),
	tanggalMasuk: z.string().pipe(z.coerce.date())
});
