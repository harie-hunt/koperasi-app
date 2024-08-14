<script lang="ts">
	import { createSimpananSchema } from '$lib/schema/simpanan';
	import { Input, Select, SelectAnggota } from '$lib/ui/input';
	import type { Anggota } from '@prisma/client';
	import { z } from 'zod';

	type PartAnggota = Pick<Anggota, 'id' | 'no' | 'nama'>;

	export let partAnggota: PartAnggota[],
		errors: z.inferFlattenedErrors<typeof createSimpananSchema>['fieldErrors'] | undefined =
			undefined;

	let jenisSimpanan: string;
</script>

<SelectAnggota
	label="Anggota"
	listPartAnggota={partAnggota}
	errors={errors?.anggotaId}
	schema={createSimpananSchema.shape.anggotaId}
/>
<Select
	label="Jenis Simpanan"
	name="jenis"
	bind:selected={jenisSimpanan}
	options={[
		{ label: 'Simpanan Pokok', value: 'pokok' },
		{ label: 'Simpanan Wajib', value: 'wajib' },
		{ label: 'Simpanan Tabungan', value: 'tabungan' }
	]}
	errors={errors?.jenis}
	schema={createSimpananSchema.shape.jenis}
/>
<Input
	label="Tanggal"
	name="tanggal"
	type="date"
	errors={errors?.tanggal}
	schema={createSimpananSchema.shape.tanggal}
/>
{#if jenisSimpanan && jenisSimpanan != 'tabungan'}
	<Input
		label="Tahun"
		name="tahun"
		type="number"
		errors={errors?.tahun}
		schema={createSimpananSchema.shape.tahun}
	/>
	{#if jenisSimpanan == 'wajib'}
		<Input
			label="Bulan"
			name="bulan"
			type="number"
			errors={errors?.bulan}
			schema={createSimpananSchema.shape.bulan}
		/>
	{/if}
{/if}
<Input
	label="Nilai"
	name="nilai"
	type="number"
	errors={errors?.nilai}
	schema={createSimpananSchema.shape.nilai}
/>
