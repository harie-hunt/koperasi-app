<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toasts } from '.';
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import type { Toast } from '.';

	function classType(type: Toast['type']) {
		switch (type) {
			case 'success':
				return ['Success !', 'success'];
			case 'error':
				return ['Error !', 'error'];
			case 'info':
				return ['Info !', 'info'];
			case 'warning':
				return ['Warning !', 'warning'];

			default:
				return [];
		}
	}
</script>

{#if $toasts}
	<section class="container">
		<ul class="base">
			{#each $toasts as t}
				<li in:fly={{ y: -20 }} out:fly={{ y: 20 }} class={cn(classType(t.type)[1])}>
					<span class="font-bold">
						{#if t.loading}
							<Icon icon="mdi:loading" class="inline-flex h-5 w-5 animate-spin" />
							Loading !
						{:else}
							{classType(t.type)[0]}
						{/if}
					</span>
					<span>{t.message}</span>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style lang="postcss">
	.container {
		@apply absolute inset-x-0 left-1/2 top-3 z-50 w-fit -translate-x-1/2;
	}

	ul.base {
		@apply flex flex-col items-center gap-2;
		& li {
			@apply rounded bg-gray-700 px-3 py-1.5 text-white shadow-md;
			&.success {
				@apply bg-green-500 text-white;
			}
			&.error {
				@apply bg-red-500 text-white;
			}
			&.warning {
				@apply bg-yellow-500 text-white;
			}
			&.info {
				@apply bg-blue-500 text-white;
			}
		}
	}
</style>
