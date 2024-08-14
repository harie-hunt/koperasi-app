<script lang="ts">
	import { loginSchema } from '$lib/schema/user';
	import { Button } from '$lib/ui/button';
	import { Form } from '$lib/ui/form';
	import { Input } from '$lib/ui/input';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="px-6">
	<Form let:loading class="mx-auto mt-20 max-w-sm space-y-6 bg-white p-6">
		<header class="text-center">
			<h1 class="text-4xl font-bold">Login</h1>
			<p>Silakan login terlebih dahulu !</p>
		</header>

		<Input
			label="Username"
			name="username"
			errors={form?.errors?.username}
			schema={loginSchema.shape.username}
		/>
		<Input
			label="Password"
			name="password"
			type="password"
			errors={form?.errors?.password}
			schema={loginSchema.shape.password}
		/>

		<footer class="">
			<Button disabled={loading} type="submit" class="w-full">Login</Button>
		</footer>
	</Form>
</div>
