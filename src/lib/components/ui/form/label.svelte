<script lang="ts">
	import type { Snippet } from 'svelte'
	import { Label, type LabelProps } from 'formsnap'

	type Props = {
		children: Snippet
	} & LabelProps

	let { children, ...restProps }: Props = $props()
</script>

<Label {...restProps} class={restProps.class}>
	{@render children()}
</Label>
