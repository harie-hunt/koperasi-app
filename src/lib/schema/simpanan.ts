import { z } from 'zod';

export const createSimpananSchema = z.object({
	anggotaId: z.string().min(1, 'Wajib diisi !').uuid(),
	jenis: z.enum(['pokok', 'wajib', 'tabungan']),
	tanggal: z.string().min(1, 'Wajib diisi !').pipe(z.coerce.date()),
	nilai: z.string().min(1, 'Wajib diisi !').pipe(z.coerce.number()),
	tahun: z.string().pipe(z.coerce.number()).catch(0),
	bulan: z.string().pipe(z.coerce.number()).catch(0)
});

export const createSimpananSchemaRefine = createSimpananSchema.superRefine((val, ctx) => {
	if (val.jenis == 'pokok' && val.tahun == 0) {
		ctx.addIssue({
			path: ['tahun'],
			code: 'custom',
			message: 'Wajib diisi !'
		});
	}
	if (val.jenis == 'wajib' && (val.tahun == 0 || val.bulan == 0)) {
		ctx.addIssue({
			path: ['tahun'],
			code: 'custom',
			message: 'Wajib diisi !'
		});
		ctx.addIssue({
			path: ['bulan'],
			code: 'custom',
			message: 'Wajib diisi !'
		});
	}
});

// export const createSimpananSchemaRefine = createSimpananSchema.refine(
// 	(val) => {
// 		return (
// 			(val.jenis == 'pokok' && val.tahun != 0) ||
// 			(val.jenis == 'wajib' && val.tahun != 0 && val.bulan != 0)
// 		);
// 	},
// 	{
// 		message: 'Wajib diisi !',
// 		path: ['tahun']
// 	}
// )
