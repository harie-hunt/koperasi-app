<script lang="ts">
	import { FieldFormAnggota } from '$lib/co-pages/pages-anggota';
	import { Button } from '$lib/ui/button';
	import { Form } from '$lib/ui/form';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData, data: PageData;
</script>

<h1 class="text-4xl">Ubah Anggota</h1>

<hr class="my-3" />

<Form class="space-y-6 rounded bg-white p-6">
	<FieldFormAnggota errors={form?.errors} anggota={data.anggota} />
	<div class="">
		<Button type="submit">Ubah</Button>
	</div>
</Form>
