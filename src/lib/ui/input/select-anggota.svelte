<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Anggota } from '@prisma/client';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';
	import type { ZodType } from 'zod';

	interface OtherProps {
		label: string;
		schema?: ZodType;
		selected?: string;
		errors?: string[];
		listPartAnggota: Pick<Anggota, 'id' | 'no' | 'nama'>[];
	}

	interface $$Props extends HTMLInputAttributes, OtherProps {}

	export let label: $$Props['label'],
		schema: $$Props['schema'] = undefined,
		selected: $$Props['selected'] = '',
		listPartAnggota: $$Props['listPartAnggota'],
		errors: $$Props['errors'] = undefined;

	let isValid: boolean = false;

	function handleBlur() {
		if (selected) setTimeout(() => (open = false), 200);
		if (!schema || open) return;
		const result = schema.safeParse(selected);
		if (!result.success) return (errors = result.error.flatten().formErrors);

		if (result.success) {
			isValid = true;
			errors = undefined;
		}
	}

	let value = selected ? listPartAnggota.filter((l) => l.id == selected)[0].nama : '',
		open = false;

	function handleSelect(anggota: $$Props['listPartAnggota'][0]) {
		value = anggota.nama;
		selected = anggota.id;
		errors = undefined;
		setTimeout(() => (open = false), 200);
	}
</script>

<div class="relative">
	<label class="block">
		<span class="label">{label}</span>
		<input type="hidden" name="anggotaId" value={selected} />

		<input
			type="text"
			on:focus={() => (open = true)}
			on:blur={handleBlur}
			value={value || 'Pilih !'}
			{...$$props}
			name="x_anggota_id"
			readonly
			class={cn('base')}
		/>

		{#if errors}
			<div class="msg error">{errors}</div>
		{/if}
	</label>

	{#if open}
		<ul in:fly={{ y: 20 }} out:fade class="ul-list">
			{#each listPartAnggota as anggota}
				<li>
					<label>
						<input
							type="radio"
							name="radio_name"
							on:click={() => handleSelect(anggota)}
							checked={selected == anggota.id}
						/>
						<span>{anggota.no}</span>
						<span>{anggota.nama}</span>
					</label>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.label {
		@apply mb-1 block font-medium;
	}

	.base {
		@apply h-9 w-full rounded border border-gray-400 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200;
		&.errors {
			@apply border-red-500 focus:ring-red-200;
		}
		&.isValid {
			@apply border-green-500 focus:ring-green-200;
		}
	}

	.msg {
		&.error {
			@apply text-red-500;
		}
	}

	.ul-list {
		@apply absolute inset-x-0 top-full z-10 mt-1 divide-y rounded border border-gray-400 bg-white shadow;
		& li {
			& label {
				@apply block p-3;
			}
		}
	}
</style>
