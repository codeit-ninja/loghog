<script lang="ts">
	import { cn } from '$lib/utils'
	import { Collapsible, type WithoutChild } from 'bits-ui'
	import ArrowRightIcon from 'phosphor-svelte/lib/Play'

	type Props = WithoutChild<Collapsible.RootProps> & {
		buttonText: string
	}

	let {
		open = $bindable(false),
		ref = $bindable(null),
		buttonText,
		children,
		...restProps
	}: Props = $props()
</script>

<Collapsible.Root bind:open bind:ref {...restProps}>
	<Collapsible.Trigger
		class={cn(
			'mb-4 flex items-center gap-3 text-neutral-600 transition-colors hover:cursor-pointer',
			'hover:text-neutral-700 data-[state=open]:text-black data-[state=open]:[&>svg]:rotate-90',
			'dark:hover:text-neutral-400 dark:data-[state=open]:text-white'
		)}
	>
		<ArrowRightIcon weight="fill" />
		{buttonText}
	</Collapsible.Trigger>
	<Collapsible.Content>
		{@render children?.()}
	</Collapsible.Content>
</Collapsible.Root>
