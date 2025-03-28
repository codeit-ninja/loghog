<script lang="ts">
	import type { Snippet } from 'svelte'
	import { Label, type LabelProps } from 'formsnap'
	import { cn } from '$lib/utils'

	type Props = {
		children: Snippet
	} & LabelProps

	let { children, ...restProps }: Props = $props()
</script>

<Label
	{...restProps}
	class={cn('text-sm font-medium text-gray-900 dark:text-neutral-400', restProps.class)}
>
	{@render children()}
</Label>
