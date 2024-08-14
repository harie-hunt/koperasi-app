import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Lucia, TimeSpan } from 'lucia';
import { prisma } from './prisma';
import { dev } from '$app/environment';
import type { Role } from '@prisma/client';

const adapter = new PrismaAdapter(prisma.session, prisma.user);
const lucia = new Lucia(adapter, {
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			nama: attributes.nama,
			role: attributes.role
		};
	},
	sessionExpiresIn: new TimeSpan(30, 'd'), // no more active/idle
	sessionCookie: {
		name: 'session',
		expires: false, // session cookies have very long lifespan (2 years)
		attributes: {
			secure: !dev
			// sameSite: 'strict',
			// domain: 'localhost:5173'
		}
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	nama: string;
	id: string;
	role: Role;
}

export { lucia };
