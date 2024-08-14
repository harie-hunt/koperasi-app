<script lang="ts">
	import { cn } from '$lib/utils/cn';
	export let right: boolean = false,
		center: boolean = false;
</script>

<th class={cn('base', { right, center })}><slot /></th>

<style lang="postcss">
	.base {
		@apply p-3 text-sm font-medium;
		&.right {
			@apply text-right;
		}
		&.center {
			@apply text-center;
		}
	}
</style>
