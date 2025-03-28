<script lang="ts">
	import type { Snippet } from 'svelte'
	import { Label, type WithoutChildrenOrChild } from 'bits-ui'

	type Props = {
		children: Snippet
	} & WithoutChildrenOrChild<Label.RootProps>

	let { children, ...restProps }: Props = $props()
</script>

<Label.Root {...restProps} class={restProps.class}>
	{@render children()}
</Label.Root>
