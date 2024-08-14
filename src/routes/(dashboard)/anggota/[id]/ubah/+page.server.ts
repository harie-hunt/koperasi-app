import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { errorHandle } from '$lib/utils/handle';
import { useForm } from '$lib/schema';
import { anggotaSchema } from '$lib/schema/anggota';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

export const load = (async ({ params }) => {
	const anggota = await prisma.anggota.findUnique({
		where: { id: params.id }
	});
	return { anggota };
}) satisfies PageServerLoad;

const optionalAnggotaSchema = z.optional(anggotaSchema);

export const actions = {
	default: async ({ request, params, locals: { user } }) => {
		if (!user) return error(404, 'User tidak ditemukan');
		try {
			const data = await useForm(request, optionalAnggotaSchema);

			// update anggota
			const anggota = await prisma.anggota.update({
				where: { id: params.id },
				data: { ...data }
			});
			return { id: anggota.id, message: 'Berhasil ubah anggota' };
		} catch (e) {
			const err = errorHandle<typeof optionalAnggotaSchema>(e);
			return fail(400, err);
		}
	}
} satisfies Actions;
