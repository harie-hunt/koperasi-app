import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const anggotas = await prisma.anggota.findMany();
	return { anggotas };
}) satisfies PageServerLoad;
