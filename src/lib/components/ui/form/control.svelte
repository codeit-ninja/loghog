<script lang="ts">
	import { Control, type ControlProps, type ControlAttrs } from 'formsnap'
	import type { Snippet } from 'svelte'

	type Props = {
		child?: Snippet<
			[
				{
					props: Expand<ControlAttrs>
				}
			]
		>
	} & ControlProps

	let { child, ...restProps }: Props = $props()
</script>

<div class="flex flex-col space-y-1">
	<Control {...restProps} />
</div>
