<script lang="ts">
	import { cn } from '$lib/utils'
	import { DropdownMenu, type DropdownMenuTriggerProps } from 'bits-ui'

	type Props = DropdownMenuTriggerProps

	let { ...restProps }: Props = $props()
</script>

<DropdownMenu.Trigger {...restProps} class={cn('outline-none', restProps.class)} />
