<script lang="ts">
	import { FieldFormSimpanan } from '$lib/co-pages/pages-simpanan';
	import { Button } from '$lib/ui/button';
	import { Form } from '$lib/ui/form';
	import type { ActionData, PageData } from './$types';

	export let data: PageData, form: ActionData;
	$: ({ partAnggota } = data);
</script>

<h1 class="text-4xl">Input Simpanan</h1>

<hr class="my-3" />

<Form class="space-y-6 rounded bg-white p-6" let:loading>
	<FieldFormSimpanan {partAnggota} errors={form?.errors} />
	<div class="">
		<Button disabled={loading} type="submit">Simpan</Button>
	</div>
</Form>
