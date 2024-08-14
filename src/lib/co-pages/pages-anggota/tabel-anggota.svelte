<script lang="ts">
	import { Button } from '$lib/ui/button';
	import * as T from '$lib/ui/table';
	import { formatDateIndo, formatDateTimeIndo } from '$lib/utils/format';
	import type { Anggota } from '@prisma/client';

	type Views = {
		title: string;
		name: keyof Anggota;
		func?: (arg?: any) => void;
	};

	export let anggotas: Anggota[];

	const views: Views[] = [
		{ name: 'no', title: 'No' },
		{ name: 'nama', title: 'Nama' },
		{ name: 'kelamin', title: 'JK' },
		{ name: 'tanggalMasuk', title: 'Tgl. Masuk', func: formatDateIndo },
		{ name: 'createdAt', title: 'Dibuat', func: formatDateTimeIndo }
	];

	let selectted: string;
</script>

<div class="flex items-center">
	{#if selectted}
		<Button href="/anggota/{selectted}/ubah">Ubah</Button>
		<Button>Non Aktifkan</Button>
	{/if}
	<slot />
</div>
<hr class="my-3" />

<T.Table>
	<T.Head>
		<T.HeadCell>o</T.HeadCell>
		{#each views as { title }}
			<T.HeadCell>{title}</T.HeadCell>
		{/each}
	</T.Head>
	<T.Body>
		{#each anggotas as anggota}
			<T.BodyRow>
				<T.BodyCell>
					<T.TableBox name={anggota.id} bind:selectted />
				</T.BodyCell>

				{#each views as { name, func }}
					<T.BodyCell>{func ? func(anggota[name]) : anggota[name]}</T.BodyCell>
				{/each}
			</T.BodyRow>
		{/each}
	</T.Body>
</T.Table>

{#if selectted}
	<hr class="my-3" />
	<div class="flex items-center">
		<Button href="/anggota/{selectted}/ubah">Ubah</Button>
		<Button>Non Aktifkan</Button>
	</div>
{/if}
