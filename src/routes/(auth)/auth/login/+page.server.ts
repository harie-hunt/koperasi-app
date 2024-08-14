import { useForm } from '$lib/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loginSchema } from '$lib/schema/user';
import { errorHandle } from '$lib/utils/handle';
import { prisma } from '$lib/server/prisma';
import { oslo } from '$lib/server/oslo';
import { lucia } from '$lib/server/auth';
import { delay } from '$lib/utils/delay';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		await delay();
		try {
			const result = await useForm(request, loginSchema);

			const user = await prisma.user.findUnique({
				where: { username: result.username }
			});
			if (!user) throw new Error('Periksa kembali username dan password !');

			const validPassword = await oslo.verify(user.password, result.password);
			if (!validPassword) throw new Error('Periksa kembali username dan password !');

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (e) {
			const err = errorHandle<typeof loginSchema>(e);
			let errors = err.errors || {
				username: ['Periksa kembali !'],
				password: ['Periksa kembali !']
			};
			return fail(400, { ...err, errors });
		}

		redirect(302, '/?messageOK=Berhasil login');
	}
} satisfies Actions;
