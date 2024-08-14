import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { user } }) => {
	const partAnggota = await prisma.anggota.findMany({
		select: { id: true, no: true, nama: true }
	});
	return { user, partAnggota };
}) satisfies LayoutServerLoad;
