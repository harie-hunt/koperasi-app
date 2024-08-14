import { Argon2id } from 'oslo/password';
const argon2id = new Argon2id();
export const oslo = {
	hash: async (pass: string): Promise<string> => {
		return await argon2id.hash(pass);
	},
	verify: async (hash: string, pass: string): Promise<boolean> => {
		return await argon2id.verify(hash, pass);
	}
};
