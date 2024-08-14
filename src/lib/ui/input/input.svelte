<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ZodType } from 'zod';

	interface OtherProps {
		label: string;
		schema?: ZodType;
		errors?: string[];
	}

	interface $$Props extends HTMLInputAttributes, OtherProps {}

	export let label: $$Props['label'],
		value: $$Props['value'] = undefined,
		schema: $$Props['schema'] = undefined,
		errors: $$Props['errors'] = undefined;

	let isValid: boolean = false;

	function handleBlur() {
		if (!schema) return;
		const result = schema.safeParse(value);
		if (!result.success) return (errors = result.error.flatten().formErrors);

		if (result.success) {
			isValid = true;
			errors = undefined;
		}
	}
</script>

<label class="block">
	<span class="label">{label}</span>
	<input
		type="text"
		bind:value
		on:blur={handleBlur}
		{...$$props}
		class={cn('base', { errors, isValid: isValid && !errors }, $$props.class)}
	/>

	{#if errors}
		<div class="msg error">{errors}</div>
	{/if}
</label>

<style lang="postcss">
	.label {
		@apply mb-1 block font-medium;
	}

	.base {
		@apply h-9 w-full rounded border border-gray-400 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200;
		&.errors {
			@apply border-red-500 focus:ring-red-200;
		}
		&.isValid {
			@apply border-green-500 focus:ring-green-200;
		}
	}

	.msg {
		&.error {
			@apply text-red-500;
		}
	}
</style>
