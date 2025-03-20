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
		'flex items-center gap-3 rounded-lg transition-all',
		'hover:text-primary-300',
		isActive && 'text-primary font-bold',
		restProps.class
	)}
>
	{@render children?.()}
</a>
