<script lang="ts">
	import * as T from '$lib/ui/table';
	import { formatDateIndo, formatNumberRibuan } from '$lib/utils/format';
	import type { Simpanan } from '@prisma/client';

	type Anggota = {
		no: string;
		nama: string;
	};

	type Views = {
		title: string;
		name: keyof Simpanan;
		func?: (arg?: any) => void;
		right?: boolean;
		center?: boolean;
	};

	export let simpanans: Array<Simpanan & { anggota: Anggota }>;

	let views: Views[] = [
		{ name: 'tanggal', title: 'Tanggal', func: formatDateIndo },
		{ name: 'jenis', title: 'Jenis' },
		{ name: 'tahun', title: 'Tahun', right: true },
		{ name: 'bulan', title: 'Bulan', right: true },
		{ name: 'nilai', title: 'Nilai', right: true, func: formatNumberRibuan }
	];
</script>

<T.Table>
	<T.Head>
		<T.HeadCell>No</T.HeadCell>
		<T.HeadCell>Nama</T.HeadCell>
		{#each views as { title, name, func, ...rest }}
			<T.HeadCell {...rest}>{title}</T.HeadCell>
		{/each}
	</T.Head>
	<T.Body>
		{#each simpanans as value}
			<T.BodyRow>
				<T.BodyCell>{value.anggota.no}</T.BodyCell>
				<T.BodyCell>{value.anggota.nama}</T.BodyCell>
				{#each views as { name, func, title, ...rest }}
					<T.BodyCell {...rest}>{func ? func(value[name]) : value[name]}</T.BodyCell>
				{/each}
			</T.BodyRow>
		{/each}
	</T.Body>
</T.Table>
