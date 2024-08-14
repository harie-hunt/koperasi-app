<script lang="ts">
	export let name: string, selectted: string;
</script>

<input
	type="checkbox"
	{name}
	on:change={(e) => {
		selectted = e.currentTarget.checked ? name : '';
	}}
/>
