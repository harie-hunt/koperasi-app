import { lucia } from '$lib/server/auth';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return error(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(303, '/login?messageOK=Berhasil logout');
	}
} satisfies Actions;
