<script lang="ts">
	import { TabelAnggota } from '$lib/co-pages/pages-anggota';
	import { Button } from '$lib/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ anggotas } = data);
</script>

<h1 class="text-4xl">Anggota</h1>

<hr class="my-3" />

<TabelAnggota {anggotas}>
	<Button href="/anggota/tambah" class="ms-auto">Tambah Baru</Button>
</TabelAnggota>
