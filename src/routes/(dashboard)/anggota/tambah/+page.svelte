<script lang="ts">
	import { FieldFormAnggota } from '$lib/co-pages/pages-anggota';
	import { Button } from '$lib/ui/button';
	import { Form } from '$lib/ui/form';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="text-4xl">Tambah Anggota Baru</h1>

<hr class="my-3" />

<Form class="space-y-6 rounded bg-white p-6">
	<FieldFormAnggota errors={form?.errors} />
	<div class="">
		<Button type="submit">Tambah</Button>
		<Button type="reset">Reset</Button>
	</div>
</Form>
