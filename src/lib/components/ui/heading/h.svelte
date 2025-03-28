<script lang="ts">
	import { cn } from '$lib/utils'
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	type Props = {
		level: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'
		children: Snippet
	} & HTMLAttributes<HTMLHeadingElement>

	let { level, children, ...restProps }: Props = $props()
</script>

<svelte:element
	this={`h${level}`}
	{...restProps}
	class={cn(
		level === 1 && 'text-3xl font-bold',
		level === 2 && 'text-2xl font-bold',
		level === 3 && 'text-xl font-bold',
		level === 4 && 'text-lg font-bold',
		level === 5 && 'text-base font-bold',
		level === 6 && 'text-sm font-bold',
		restProps.class
	)}
>
	{@render children?.()}
</svelte:element>
