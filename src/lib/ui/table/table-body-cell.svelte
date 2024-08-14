<script lang="ts">
	import { cn } from '$lib/utils/cn';
	export let right: boolean = false,
		center: boolean = false;
</script>

<td class={cn('base', { right, center })}><slot /></td>

<style lang="postcss">
	.base {
		@apply p-3;
		&.right {
			@apply text-right;
		}
		&.center {
			@apply text-center;
		}
	}
</style>
