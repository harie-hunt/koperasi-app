import { z } from 'zod';

/**
 * function get data from input form request with zod validate
 * T is typeOf Schema
 * @param request formdata
 * @param schema zod schema
 * @returns data valid by zod
 */
export async function useForm<T extends z.Schema>(request: Request, schema: T) {
	const form = Object.fromEntries(await request.formData());
	const data: z.infer<T> = await schema.parseAsync(form);
	return data;
}
