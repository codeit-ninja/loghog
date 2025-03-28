<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { H } from '$lib/components/ui/heading'
	import { Input } from '$lib/components/ui/input'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { loginSchema } from '../schema'
	import * as Form from '$lib/components/ui/form'
	import { Button } from '$lib/components/ui/button'
	import { cn } from '$lib/utils'
	import { Alert } from '$lib/components/ui/alert'
	import { goto } from '$app/navigation'

	let { data } = $props()

	const form = superForm(data.form, {
		validators: zodClient(loginSchema),
		invalidateAll: true
	})
	const { form: formData, enhance } = form
</script>

<div class="flex flex-grow flex-col items-center justify-center gap-4">
	<form class="min-w-sm" method="POST" use:enhance>
		<div class={cn('flex flex-col space-y-2 rounded-lg')}>
			<H level={1} class="mb-8 text-center">Register account</H>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input
							{...props}
							type="text"
							placeholder="info@codeit.ninja"
							bind:value={$formData.email}
							class={cn('dark:bg-neutral-800')}
						/>
					{/snippet}
				</Form.Control>
				<Form.Errors />
			</Form.Field>
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Name</Form.Label>
						<Input
							{...props}
							type="text"
							placeholder="Enter your name"
							bind:value={$formData.name}
							class={cn('dark:bg-neutral-800')}
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
							class={cn('dark:bg-neutral-800')}
						/>
					{/snippet}
				</Form.Control>
				<Form.Errors />
			</Form.Field>
			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm Password</Form.Label>
						<Input
							{...props}
							type="password"
							placeholder="Confirm your password"
							bind:value={$formData.confirmPassword}
							class={cn('dark:bg-neutral-800')}
						/>
					{/snippet}
				</Form.Control>
				<Form.Errors />
			</Form.Field>
			<Button>Register</Button>
		</div>
	</form>
</div>
