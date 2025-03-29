<script lang="ts">
	import type { Snippet } from 'svelte'
	import { DropdownMenu, type WithoutChild } from 'bits-ui'
	import { cn } from '$lib/utils'

	type Props = DropdownMenu.RootProps & {
		trigger: Snippet
		content: Snippet
		contentProps?: WithoutChild<DropdownMenu.ContentProps>
	}

	let {
		open = $bindable(false),
		children,
		trigger,
		content,
		contentProps,
		...restProps
	}: Props = $props()
	let ref = $state<DropdownMenu.Root | null>(null)
</script>

<DropdownMenu.Root bind:open {...restProps} bind:this={ref}>
	{#if ref}
		{@render trigger()}
	{/if}
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{...contentProps}
			class={cn(
				'min-w-[150px] rounded-lg border p-1 outline-none',
                'bg-white border-neutral-200',
                'dark:border-neutral-800 dark:bg-neutral-900'
			)}
		>
			{#if ref}
				{@render content()}
			{/if}
			<!-- <DropdownMenu.Arrow class="fill-neutral-800" /> -->
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
