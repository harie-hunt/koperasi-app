import { writable } from 'svelte/store';

export { default as Toaster } from './toaster.svelte';

export type Toast = {
	type?: 'success' | 'error' | 'info' | 'warning';
	loading?: boolean;
	message: string;
	id: string;
};

export const toasts = writable<Toast[]>([]);

const DEFAULT_MS = 4000;

export const toast = {
	set: (
		{ type, message }: { type: Toast['type']; message: string },
		ms: boolean | number = DEFAULT_MS
	): string => {
		const id = crypto.randomUUID();
		toasts.update((n) => {
			return [{ id, type, message }, ...n];
		});

		if (typeof ms == 'number') {
			setTimeout(() => {
				toast.delete(id);
			}, ms);
		}

		return id;
	},
	loading: (message: string = ''): string => {
		const id = crypto.randomUUID();
		toasts.update((n) => {
			return [{ id, message, loading: true }, ...n];
		});

		return id;
	},
	delete: (id: string) => {
		toasts.update((n) => n.filter((v) => v.id !== id));
	}
};
