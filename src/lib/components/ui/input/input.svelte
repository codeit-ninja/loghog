<script lang="ts">
	import { cn } from '$lib/utils'
	import type { HTMLInputAttributes } from 'svelte/elements'

	type Props = {} & HTMLInputAttributes

	let { value = $bindable(), ...restProps }: Props = $props()
</script>

<input
	bind:value
	{...restProps}
	class={cn(
		'h-10 rounded-md border-2 border-neutral-900 bg-neutral-900 px-3 outline-none',
		'focus:border-neutral-700',
		restProps.class
	)}
/>
