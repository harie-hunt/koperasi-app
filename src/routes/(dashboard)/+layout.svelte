<script lang="ts">
	import type { LayoutData } from './$types';

	import { Button } from '$lib/ui/button';
	import { Form } from '$lib/ui/form';
	import { SideBrand, SideMenu } from '$lib/co-pages';
	import { navigating, page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';

	export let data: LayoutData;
	$: ({ user } = data);
</script>

<div class="flex">
	<aside class="sticky top-0 hidden h-dvh min-w-64 flex-col bg-white md:flex">
		<SideBrand />
		<SideMenu />
	</aside>

	<div class="flex-1">
		<header class="sticky top-0 flex h-12 items-center border-b bg-white">
			<Form let:loading action="/auth/logout" class="ms-auto px-3">
				<div>
					<span>{user?.nama}</span>
					<Button disabled={loading} type="submit">Logout</Button>
				</div>
			</Form>
		</header>

		{#if $navigating}
			<div class="absolute flex items-center gap-2 bg-white p-6">
				<Icon icon="mdi:loading" class="h-6 w-6 animate-spin" />
				Loading
			</div>
		{/if}
		{#key $page.url.pathname}
			<main
				in:fly={{ y: 20, duration: 200, delay: 200 }}
				out:fly={{ y: 20, duration: 200, delay: 0 }}
				class="p-6"
			>
				<slot />
			</main>
		{/key}
	</div>
</div>
