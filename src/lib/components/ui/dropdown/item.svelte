<script lang="ts">
	import { cn } from '$lib/utils'
	import { DropdownMenu, type DropdownMenuItemProps } from 'bits-ui'

	type Props = DropdownMenuItemProps

	let { ...restProps }: Props = $props()
</script>

<DropdownMenu.Item
	{...restProps}
	class={cn(
		'cursor-pointer rounded-md px-3 py-1 transition-colors outline-none hover:bg-neutral-700',
		restProps.class
	)}
/>
