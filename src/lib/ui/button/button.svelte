<script lang="ts">
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils/cn';
	import { createEventDispatcher } from 'svelte';
	import { varButton } from '.';
	import type { VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	const dispatch = createEventDispatcher();

	interface OtherProps {
		href?: string;
	}

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof varButton>, OtherProps {}

	export let variant: $$Props['variant'] = undefined,
		href: $$Props['href'] = undefined;

	function handleClick() {
		if (href) return goto(href);
		dispatch('click');
	}
</script>

<button
	type="button"
	on:click={handleClick}
	{...$$props}
	class={cn(varButton({ variant }), $$props.class)}
>
	<slot />
</button>

<style lang="postcss">
	.base {
		@apply min-h-9 rounded border px-4 font-medium active:opacity-80 disabled:opacity-60;
		&.display {
			@apply inline-flex items-center justify-center;
		}
	}

	.default {
		@apply bg-gray-600 text-white;
	}
	.primary {
		@apply bg-blue-600 text-white;
	}
</style>
