<script lang="ts">
	import { cn } from '$lib/utils'
	import { FieldErrors, type FieldErrorsProps } from 'formsnap'

	type Props = {} & FieldErrorsProps

	let { ...restProps }: Props = $props()
</script>

<FieldErrors {...restProps} class={cn('flex flex-col', restProps.class)}>
	{#snippet children({ errors, errorProps })}
		{#each errors as error}
			<span class="text-error mb-2 text-xs font-bold">{error}</span>
		{/each}
	{/snippet}
</FieldErrors>
