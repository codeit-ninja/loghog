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
		'h-10 rounded-md border-2 border-neutral-200 bg-neutral-50 px-3 transition-colors outline-none',
		'dark:border-neutral-900 dark:bg-neutral-900 dark:text-white',
		'focus:border-neutral-300 dark:focus:border-neutral-700',
		restProps.class
	)}
/>
