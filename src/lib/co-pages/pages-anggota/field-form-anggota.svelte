<script lang="ts">
	import { anggotaSchema } from '$lib/schema/anggota';
	import { Input, Radio } from '$lib/ui/input';
	import { formatInputDate } from '$lib/utils/format';
	import type { Anggota } from '@prisma/client';
	import type { z } from 'zod';

	export let errors: z.inferFlattenedErrors<typeof anggotaSchema>['fieldErrors'] | undefined,
		anggota: Partial<Anggota> | null = null;

	let values = anggota;
	let tglMasuk = formatInputDate(values?.tanggalMasuk);
	let tglLahir = formatInputDate(values?.tanggalLahir);
</script>

<div class="grid gap-x-6 gap-y-3 md:grid-cols-2">
	<div class="space-y-3">
		<Input
			label="Tanggal Masuk"
			name="tanggalMasuk"
			type="date"
			errors={errors?.tanggalMasuk}
			value={tglMasuk}
			schema={anggotaSchema.shape.tanggalMasuk}
		/>
		<Input
			label="Nama"
			name="nama"
			errors={errors?.nama}
			value={values?.nama}
			schema={anggotaSchema.shape.nama}
		/>
		<Radio
			label="Jenis Kelamin"
			name="kelamin"
			radios={[
				{ label: 'Laki-laki', value: 'L' },
				{ label: 'Perempuan', value: 'P' }
			]}
			errors={errors?.kelamin}
			selected={values?.kelamin}
			schema={anggotaSchema.shape.kelamin}
		/>
		<Input
			label="Tempat Lahir"
			name="tempatLahir"
			errors={errors?.tempatLahir}
			value={values?.tempatLahir}
			schema={anggotaSchema.shape.tempatLahir}
		/>
		<Input
			label="Tanggal Lahir"
			name="tanggalLahir"
			type="date"
			errors={errors?.tanggalLahir}
			value={tglLahir}
			schema={anggotaSchema.shape.tanggalLahir}
		/>
	</div>
	<div class="space-y-3">
		<Input
			label="NIK KTP"
			name="nik"
			type="number"
			errors={errors?.nik}
			value={values?.nik}
			schema={anggotaSchema.shape.nik}
		/>
		<Input
			label="No KK"
			name="kk"
			type="number"
			errors={errors?.kk}
			value={values?.kk}
			schema={anggotaSchema.shape.kk}
		/>
		<Input
			label="Pekerjaan"
			name="pekerjaan"
			errors={errors?.pekerjaan}
			value={values?.pekerjaan}
			schema={anggotaSchema.shape.pekerjaan}
		/>
		<Input
			label="Alamat"
			name="alamat"
			errors={errors?.alamat}
			value={values?.alamat}
			schema={anggotaSchema.shape.alamat}
		/>
	</div>
</div>
