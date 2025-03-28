<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils'
	import EyeIcon from 'phosphor-svelte/lib/Eye'
	import EyeSlashIcon from 'phosphor-svelte/lib/EyeSlash'

	type Props = {} & HTMLInputAttributes

	let { value = $bindable(), ...restProps }: Props = $props()
	let showPassword = $state(false)
</script>

{#if restProps.type === 'password'}
	<div class="relative">
		<input
			bind:value
			{...restProps}
			class={cn(
				'h-10 w-full rounded-md border-2 border-neutral-200 bg-neutral-50 px-3 pe-6 transition-colors outline-none',
				'dark:border-neutral-900 dark:bg-neutral-900 dark:text-white',
				'focus:border-neutral-300 dark:focus:border-neutral-700',
				restProps.class
			)}
			type={showPassword ? 'text' : 'password'}
		/>
		<button
			class={cn(
				'absolute top-2 right-3 cursor-pointer',
				showPassword ? 'text-neutral-100' : 'text-neutral-500'
			)}
			type="button"
			onclick={() => (showPassword = !showPassword)}
		>
			{#if showPassword}
				<EyeSlashIcon size="24" />
			{:else}
				<EyeIcon size="24" />
			{/if}
		</button>
	</div>
{:else}
	<input
		bind:value
		{...restProps}
		class={cn(
			'h-10 rounded-md border-2 border-neutral-200 bg-neutral-50 px-3 transition-colors outline-none',
			'dark:border-neutral-900 dark:bg-neutral-900 dark:text-white',
			'focus:border-neutral-300 dark:focus:border-neutral-700',
			restProps.class
		)}
	/>
{/if}
