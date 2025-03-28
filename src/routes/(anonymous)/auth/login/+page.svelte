<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { H } from '$lib/components/ui/heading'
	import { Input } from '$lib/components/ui/input'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { loginSchema } from '../schema'
	import * as Form from '$lib/components/ui/form'
	import { Button } from '$lib/components/ui/button'

	let { data } = $props()

	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	})
	const { form: formData, enhance } = form

	$inspect($formData)
</script>

<div class="flex flex-grow items-center justify-center">
	<form class="flex min-w-sm flex-col space-y-2" method="POST" use:enhance>
		<H level={1} class="mb-6 text-center">Login</H>
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Username</Form.Label>
					<Input
						{...props}
						type="text"
						placeholder="info@codeit.ninja"
						bind:value={$formData.email}
					/>
				{/snippet}
			</Form.Control>
			<Form.Errors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Password</Form.Label>
					<Input
						{...props}
						type="password"
						placeholder="Enter your password"
						bind:value={$formData.password}
					/>
				{/snippet}
			</Form.Control>
			<Form.Errors />
		</Form.Field>
		<Button>Submit</Button>
		<!-- <div class="flex flex-col space-y-1">
			<Label>Password</Label>
			<Input type="password" name="username" placeholder="Enter yout password" />
		</div> -->
	</form>
</div>
