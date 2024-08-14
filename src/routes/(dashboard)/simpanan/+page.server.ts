import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const simpanans = await prisma.simpanan.findMany({
		include: {
			anggota: { select: { no: true, nama: true } }
		}
	});

	return { simpanans };
}) satisfies PageServerLoad;
