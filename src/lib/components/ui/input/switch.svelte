<script lang="ts">
	import { cn } from '$lib/utils'
	import { Switch, Label, useId, type WithoutChildrenOrChild } from 'bits-ui'
	import SunIcon from 'phosphor-svelte/lib/Sun'
	import MoonIcon from 'phosphor-svelte/lib/Moon'

	let {
		id = useId(),
		checked = $bindable(false),
		ref = $bindable(null),
		labelText,
		...restProps
	}: WithoutChildrenOrChild<Switch.RootProps> & {
		labelText?: string
	} = $props()
</script>

<div class="flex items-center gap-2">
	<Switch.Root
		bind:checked
		bind:ref
		{id}
		{...restProps}
		class={cn(
			'rounded-full border-2 border-neutral-200 bg-neutral-50',
			'relative h-[22px] min-h-[22px] w-[55px] cursor-pointer',
			'dark:border-neutral-800 dark:bg-neutral-900',
			restProps.class
		)}
	>
		<Switch.Thumb
			class={cn(
				'flex items-center justify-center transition-transform',
				'absolute -top-[6px] -left-[4px] h-[30px] w-[30px] rounded-full border-1 border-neutral-200 bg-neutral-50 shadow-sm',
				'dark:border-neutral-700 dark:bg-neutral-800',
				checked ? 'translate-x-[28px]' : 'translate-x-0'
			)}
		>
			{#if checked}
				<MoonIcon />
			{:else}
				<SunIcon />
			{/if}
		</Switch.Thumb>
	</Switch.Root>
	{#if labelText}
		<Label.Root for={id}>{labelText}</Label.Root>
	{/if}
</div>
