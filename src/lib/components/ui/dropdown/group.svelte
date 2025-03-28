<script lang="ts">
	import { DropdownMenu, type DropdownMenuGroupProps } from 'bits-ui'

	type Props = DropdownMenuGroupProps

	let { ...restProps }: Props = $props()
</script>

<DropdownMenu.Group {...restProps} />
