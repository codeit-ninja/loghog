<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>, M = any">
	import type { FormPath } from 'sveltekit-superforms'
	import type { Snippet } from 'svelte'
	import { Field, type FieldProps } from 'formsnap'

	type Props = {
		children: Snippet
	} & FieldProps<T, U, M>

	let { children, ...restProps }: Props = $props()
</script>

<Field {...restProps}>
	<div class="has-[[data-fs-error]]:[&_input]:border-error flex flex-col space-y-2">
		{@render children()}
	</div>
</Field>
