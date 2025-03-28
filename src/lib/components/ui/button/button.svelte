<script lang="ts">
	import type { Snippet } from 'svelte'
	import { cn } from '$lib/utils'
	import { Button } from 'bits-ui'
	import CircleNotchIcon from 'phosphor-svelte/lib/CircleNotch'

	type Props = {
		children: Snippet
		variant?: 'primary' | 'secondary' | 'danger'
		spinner?: boolean
	} & Button.RootProps

	let { children, variant = 'primary', spinner = false, ...restProps }: Props = $props()
</script>

<Button.Root
	class={cn(
		'flex items-center justify-center gap-2',
		'cursor-pointer rounded-lg px-4 py-2 font-semibold transition-all duration-150 hover:opacity-90',
		{
			'bg-white text-black': variant === 'primary',
			'bg-neutral-800 text-white': variant === 'secondary',
			'bg-error text-white': variant === 'danger'
		},
		restProps.class
	)}
>
	{#if spinner}
		<CircleNotchIcon class="animate-spin" />
	{/if}
	{@render children()}
</Button.Root>
