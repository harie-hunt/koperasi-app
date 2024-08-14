<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils/cn';

	type Menus = {
		text: string;
		href: string;
		active?: boolean;
	};

	let menus: Menus[] = [
		{ text: 'Beranda', href: '/', active: true },
		{ text: 'Anggota', href: '/anggota' },
		{ text: 'Simpanan', href: '/simpanan' },
		{ text: 'Pinjaman', href: '/pinjaman' }
	];

	$: menus2 = menus.map((m) => {
		const path = $page.url.pathname;
		m.active = m.href == path || (m.href != '/' && path.includes(m.href));
		return m;
	});
</script>

<nav class="nav flex-1">
	{#each menus2 as { text, href, active }}
		<a {href} class={cn('menu', { active })}>
			{text}
		</a>
	{/each}
</nav>

<style lang="postcss">
	.nav {
		@apply space-y-2 bg-gray-900 px-3 py-6 text-lg font-medium tracking-wide text-gray-300;
	}

	.menu {
		@apply block rounded px-4 py-1.5 hover:bg-blue-900 hover:text-gray-100;
		&.active {
			@apply bg-blue-900 text-gray-100;
		}
	}
</style>
