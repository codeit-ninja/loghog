<script lang="ts">
	import CheckIcon from 'phosphor-svelte/lib/Check'
	import { cn } from '$lib/utils'
	import * as Select from '.'
	import { milliseconds } from 'date-fns'

	type Props = {
		logRange?: string
	}

	let { logRange = $bindable('0') }: Props = $props()

	let ranges = [
		{ label: 'All time', value: '0' },
		{ label: 'Last hour', value: milliseconds({ hours: 1 }).toString() },
		{ label: 'Last 12 hours', value: milliseconds({ hours: 12 }).toString() },
		{ label: 'Last 24 hours', value: milliseconds({ hours: 24 }).toString() },
		{ label: 'Last 7 days', value: milliseconds({ days: 7 }).toString() },
		{ label: 'Last 30 days', value: milliseconds({ days: 30 }).toString() }
	]
</script>

<Select.Root placeholder="Time range" type="single" bind:value={logRange}>
	{#each ranges as { label, value }}
		<Select.Item
			{label}
			{value}
			class={cn(
				'flex items-center gap-3 rounded-md px-2 py-1 transition-colors',
				'hover:cursor-pointer hover:bg-neutral-800'
			)}
		>
			<span
				class={cn(
					'flex size-5 items-center justify-center rounded-md border border-white',
					value === logRange && 'bg-white text-black'
				)}
			>
				{#if value === logRange}
					<CheckIcon size={12} weight="bold" />
				{/if}
			</span>
			<span>{label}</span>
		</Select.Item>
	{/each}
</Select.Root>
