<script lang="ts">
	import { Description, type DescriptionProps } from 'formsnap'

	type Props = {} & DescriptionProps

	let { ...restProps }: Props = $props()
</script>

<Description {...restProps} />
