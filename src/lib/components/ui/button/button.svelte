<script lang="ts">
	import { cn } from '$lib/utils'
	import { Button } from 'bits-ui'
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
		variant?: 'primary' | 'secondary' | 'danger'
	} & Button.RootProps

	let { children, variant = 'primary', ...restProps }: Props = $props()
</script>

<Button.Root
	class={cn(
		'cursor-pointer rounded-lg px-4 py-2 font-semibold transition-all duration-150 hover:opacity-90',
		{
			'bg-white text-black': variant === 'primary',
			'bg-neutral-800 text-white': variant === 'secondary',
			'bg-error text-white': variant === 'danger'
		},
		restProps.class
	)}
>
	{@render children()}
</Button.Root>
