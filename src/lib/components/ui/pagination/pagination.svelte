<script lang="ts">
	import { cn } from '$lib/utils'
	import { Pagination, type WithoutChild } from 'bits-ui'
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft'
	import CaretRight from 'phosphor-svelte/lib/CaretRight'

	type Props = {} & WithoutChild<Pagination.RootProps>

	let { ...restProps }: Props = $props()
</script>

<Pagination.Root {...restProps} class={cn('flex items-center justify-end gap-3')}>
	{#snippet children({ pages, range })}
		<span class="text-sm font-bold text-neutral-400 dark:text-neutral-600"
			>Showing {range.start} - {range.end}</span
		>
		<Pagination.PrevButton
			class={cn(
				'me-4 flex size-10 cursor-pointer items-center justify-center',
				'disabled:pointer-events-none disabled:text-neutral-300 disabled:dark:text-neutral-700'
			)}
		>
			<CaretLeft class="size-6" />
		</Pagination.PrevButton>

		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<div>...</div>
			{:else}
				<Pagination.Page
					{page}
					class={cn(
						'flex size-10 cursor-pointer items-center justify-center rounded-md transition-colors',
						'data-[selected]:pointer-events-none data-[selected]:text-black',
						'data-[selected]:bg-neutral-200',
						'hover:bg-neutral-100 hover:dark:bg-neutral-800',
						'dark:data-[selected]:bg-white'
					)}
				>
					{page.value}
				</Pagination.Page>
			{/if}
		{/each}

		<Pagination.NextButton
			class={cn(
				'ms-4 flex size-10 cursor-pointer items-center justify-center',
				'disabled:pointer-events-none disabled:text-neutral-300 disabled:dark:text-neutral-700'
			)}
		>
			<CaretRight class="size-6" />
		</Pagination.NextButton>
	{/snippet}
</Pagination.Root>
