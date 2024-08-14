import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { useForm } from '$lib/schema';
import { delay } from '$lib/utils/delay';
import { createSimpananSchema, createSimpananSchemaRefine } from '$lib/schema/simpanan';
import { errorHandle } from '$lib/utils/handle';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent }) => {
	const { partAnggota } = await parent();
	return { partAnggota };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { user } }) => {
		if (!user) return error(404, 'User tidak ditemukan !');
		const userId = user.id;
		await delay();
		try {
			const data = await useForm(request, createSimpananSchemaRefine);
			// return { data };
			const simpanan = await prisma.simpanan.create({
				data: { ...data, userId }
			});
			return { id: simpanan.id, message: 'Berhasil input simpanan' };
		} catch (e) {
			const err = errorHandle<typeof createSimpananSchema>(e);
			return fail(400, err);
		}
	}
} satisfies Actions;
