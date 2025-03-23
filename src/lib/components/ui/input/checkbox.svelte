<script lang="ts">
	import { cn } from '$lib/utils'
	import { Checkbox, Label, useId, type WithoutChildrenOrChild } from 'bits-ui'
	import Check from 'phosphor-svelte/lib/Check'
	import Minus from 'phosphor-svelte/lib/Minus'

	type Props = {
		value?: string
		label?: string
		indeterminate?: boolean
		checked: boolean
	} & WithoutChildrenOrChild<Checkbox.RootProps>

	let id = useId()
	let {
		value = $bindable(),
		checked = $bindable(false),
		indeterminate,
		label,
		...restProps
	}: Props = $props()
</script>

<div class="flex items-center space-x-3">
	<Checkbox.Root
		{id}
		{indeterminate}
		bind:checked
		{...restProps}
		class={cn(
			'border-muted',
			'data-[state=unchecked]:border-neutral-900',
			'peer inline-flex size-[20px]',
			'items-center justify-center rounded-md border',
			'transition-all duration-150 ease-in-out active:scale-[0.98]',
			'dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black',
			restProps.class
		)}
	>
		{#snippet children({ checked, indeterminate })}
			<div class="text-background inline-flex items-center justify-center">
				{#if indeterminate}
					<Minus class="size-[12px]" weight="bold" />
				{:else if checked}
					<Check class="size-[12px]" weight="bold" />
				{/if}
			</div>
		{/snippet}
	</Checkbox.Root>
	{#if label}
		<Label.Root
			for={id}
			class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			{label}
		</Label.Root>
	{/if}
</div>
