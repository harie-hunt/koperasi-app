import { Prisma } from '@prisma/client';
import { z } from 'zod';

type HandleError<T extends z.ZodType> = {
	message: string;
	errors?: z.inferFlattenedErrors<T>['fieldErrors'];
};

export const errorHandle = <T extends z.ZodType>(err: unknown): HandleError<T> => {
	if (err instanceof z.ZodError) return zodErrorHandle<T>(err);

	if (err instanceof Prisma.PrismaClientKnownRequestError) return prismaErrorHandle(err);

	if (err instanceof Error) {
		return {
			message: `${err.name} ${err.message}`
		};
	}
	return {
		message: 'Ada kesalahan !'
	};
};

const zodErrorHandle = <T extends z.ZodType>(err: z.ZodError): HandleError<T> => {
	return {
		message: 'Gagal validasi form !',
		errors: err.flatten().fieldErrors
	};
};

const prismaErrorHandle = (err: Prisma.PrismaClientKnownRequestError) => {
	let name;
	if (err.meta && err.meta.target && Array.isArray(err.meta.target)) name = err.meta.target[0];

	return {
		message: err.message,
		errors: { [name]: ['Sudah ada.'] }
	};
};
