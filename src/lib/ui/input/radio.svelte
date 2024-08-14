<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ZodType } from 'zod';

	interface OtherProps {
		label: string;
		schema?: ZodType;
		errors?: string[];
		selected?: string;
		radios: {
			label: string;
			value: string;
		}[];
	}

	interface $$Props extends HTMLInputAttributes, OtherProps {}

	export let label: $$Props['label'],
		schema: $$Props['schema'] = undefined,
		errors: $$Props['errors'] = undefined,
		selected: $$Props['selected'] = undefined,
		radios: $$Props['radios'];

	let isValid: boolean = false;

	function handleBlur() {
		if (!schema) return;
		const result = schema.safeParse(selected);
		if (!result.success) return (errors = result.error.flatten().formErrors);

		if (result.success) {
			isValid = true;
			errors = undefined;
		}
	}
</script>

<div>
	<span class="label">{label}</span>

	{#each radios as r}
		<label class={cn('base', { errors })}>
			<input
				type="radio"
				bind:group={selected}
				value={r.value}
				on:blur={handleBlur}
				{...$$props}
				class=""
			/>
			<span>{r.label}</span>
		</label>
	{/each}

	{#if errors}
		<div class="msg error">{errors}</div>
	{/if}
</div>

<style lang="postcss">
	.label {
		@apply mb-1 block font-medium;
	}

	.base {
		@apply mr-3;
		&.errors {
			@apply text-red-500;
		}
	}

	.msg {
		&.error {
			@apply text-red-500;
		}
	}
</style>
