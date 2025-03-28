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
	{@render children()}
</Field>
