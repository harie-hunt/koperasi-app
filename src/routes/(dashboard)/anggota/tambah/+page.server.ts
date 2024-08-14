import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { errorHandle } from '$lib/utils/handle';
import { useForm } from '$lib/schema';
import { anggotaSchema } from '$lib/schema/anggota';
import { prisma } from '$lib/server/prisma';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { user } }) => {
		if (!user) return error(404, 'User tidak ditemukan');
		try {
			const data = await useForm(request, anggotaSchema);

			// get count anggota
			const countAnggota = await prisma.anggota.count();
			const no = getNewNoAnggota(countAnggota, data.tanggalMasuk);

			// add anggota
			const anggota = await prisma.anggota.create({
				data: { ...data, no, userId: user.id }
			});

			return { id: anggota.id, message: 'Berhasil tambah anggota' };
		} catch (e) {
			const err = errorHandle<typeof anggotaSchema>(e);
			return fail(400, err);
		}
	}
} satisfies Actions;

function getNewNoAnggota(totalAnggota: number, tanggalMasuk: Date): string {
	const d = new Date(tanggalMasuk);
	const formatter = (opt: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('id', opt);
	const th = formatter({ year: '2-digit' }).format(d);
	const bl = formatter({ month: '2-digit' }).format(d);
	const num = Number(`${th}${bl}000`) + totalAnggota + 1;
	return 'A' + num;
}
