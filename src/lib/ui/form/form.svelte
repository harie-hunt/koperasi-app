<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils/cn';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { toast } from '../toast';

	interface OtherProps {}

	interface $$Props extends HTMLFormAttributes, OtherProps {}

	let loading: boolean = false;

	function hasMessage(value: Record<string, unknown> | undefined): value is { message: string } {
		return !!value && 'message' in value && typeof value['message'] === 'string';
	}
</script>

<form
	action=""
	method="post"
	{...$$props}
	class={cn('', $$props.class)}
	use:enhance={({ formElement }) => {
		loading = true;
		const toastLaoadingId = toast.loading('Proses data..');
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
			toast.delete(toastLaoadingId);
			if (result.type === 'failure') {
				if (hasMessage(result.data)) {
					toast.set({ type: 'error', message: result.data.message });
				}
				console.error(result.data);
			}

			if (result.type === 'success') {
				formElement.reset();

				if (hasMessage(result.data)) {
					toast.set({ type: 'success', message: result.data.message });
				}
				console.info(result.data);
			}

			if (result.type === 'redirect') return goto(result.location);
		};
	}}
>
	<slot {loading} />
</form>
