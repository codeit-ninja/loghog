<script lang="ts">
	import { cn } from '$lib/utils'
	import { Collapsible, type WithoutChild } from 'bits-ui'
	import ArrowRightIcon from 'phosphor-svelte/lib/CaretRight'

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
			'flex items-center gap-3 text-neutral-500 transition-colors dark:text-neutral-400',
			'hover:cursor-pointer hover:text-black',
			'data-[state=open]:text-black dark:hover:text-neutral-400 dark:data-[state=open]:text-white data-[state=open]:[&>svg]:rotate-90'
		)}
	>
		<ArrowRightIcon size={22} />
		{buttonText}
	</Collapsible.Trigger>
	<Collapsible.Content>
		{@render children?.()}
	</Collapsible.Content>
</Collapsible.Root>
