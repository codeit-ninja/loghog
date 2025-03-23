<script lang="ts">
	import type { Snippet } from 'svelte'
	import { cn } from '$lib/utils'
	import { Select, type WithoutChildren } from 'bits-ui'
	import { isArray } from 'lodash-es'

	type Props = WithoutChildren<Select.RootProps> & {
		placeholder?: string
		contentProps?: WithoutChildren<Select.ContentProps>
		children: Snippet
	}

	let { value = $bindable(), contentProps, placeholder, children, ...restProps }: Props = $props()
</script>

<Select.Root bind:value={value as never} {...restProps}>
	<Select.Trigger
		class={cn(
			'flex h-10 min-w-3xs items-center justify-between rounded-md ',
			'px-3 text-left text-sm transition-colors outline-none',
			'cursor-pointer border-2 font-bold text-neutral-500',
			'border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:text-black',
			'dark:border-neutral-900 dark:bg-neutral-900',
			'dark:hover:border-neutral-800 dark:hover:bg-neutral-800',
			'dark:text-neutral-400 dark:hover:text-white'
		)}
	>
		<span>{placeholder}</span>
		<span class="flex items-center gap-2 text-xs">
			{#if isArray(value)}
				<span class="bg-primary/15 text-primary rounded-md p-1.5 font-normal">{value.length}</span>
				<span class="text-neutral-400">{value.length > 1 ? value[1] : value[0]}</span>
			{:else}
				<span class="text-neutral-400">{value}</span>
			{/if}
		</span>
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			{...contentProps}
			align="start"
			sideOffset={4}
			class={cn(
				'w-full rounded-md border-2 p-1 shadow-md',
				'w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)]',
				'border-neutral-200 bg-neutral-50',
				'dark:border-neutral-800 dark:bg-neutral-900'
			)}
		>
			<Select.Viewport class="flex w-full flex-col gap-1">
				{@render children()}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
