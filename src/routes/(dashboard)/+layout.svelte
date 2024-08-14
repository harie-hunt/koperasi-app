<script lang="ts">
	import type { LayoutData } from './$types';

	import { Button } from '$lib/ui/button';
	import { Form } from '$lib/ui/form';
	import { SideBrand, SideMenu } from '$lib/co-pages';

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

		<main class="p-6">
			<slot />
		</main>
	</div>
</div>
