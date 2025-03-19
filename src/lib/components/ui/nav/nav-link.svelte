<script lang="ts">
	import { page } from '$app/state'
	import { cn } from '$lib/utils'
	import type { HTMLAnchorAttributes } from 'svelte/elements'

	type Props = {
		isActive?: boolean
	} & HTMLAnchorAttributes

	let { isActive = $bindable(), children, ...restProps }: Props = $props()
	isActive = page.url.pathname === restProps.href

	$effect(() => {
		isActive = page.url.pathname === restProps.href
	})
</script>

<a
	{...restProps}
	class={cn(
		'flex items-center gap-3 rounded-lg px-4 py-2 transition-all',
		'hover:bg-neutral-900',
		isActive && 'text-primary bg-neutral-900',
		restProps.class
	)}
>
	{@render children?.()}
</a>
