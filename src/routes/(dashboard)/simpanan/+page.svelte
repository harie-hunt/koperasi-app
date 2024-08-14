<script lang="ts">
	import { TabelSimpanan } from '$lib/co-pages/pages-simpanan';
	import type { PageData } from './$types';
	import { Button } from '$lib/ui/button';

	export let data: PageData;
	$: ({ simpanans } = data);
</script>

<h1 class="text-4xl">Simpanan</h1>

<hr class="my-3" />

<Button href="/simpanan/input">Input Baru</Button>

<hr class="my-3" />

<TabelSimpanan {simpanans} />
