<script lang="ts">
	import CheckIcon from 'phosphor-svelte/lib/Check'
	import { cn } from '$lib/utils'
	import * as Select from '.'

	type Props = {
		logLevels?: string[]
	}

	let { logLevels = $bindable(['all']) }: Props = $props()

	let levels = [
		{ value: 'all', label: 'All' },
		{ value: 'error', label: 'Error' },
		{ value: 'warn', label: 'Warn' },
		{ value: 'info', label: 'Info' },
		{ value: 'debug', label: 'Debug' }
	]

	$effect(() => {
		if (logLevels.length === 0) {
			logLevels = ['all']
		}
	})
</script>

<Select.Root placeholder="Log level" type="multiple" bind:value={logLevels}>
	{#each levels as { label, value }}
		{@const checked = logLevels.includes(value)}
		<Select.Item
			{label}
			{value}
			class={cn(
				'flex items-center gap-3 rounded-md px-2 py-1 transition-colors',
				'hover:cursor-pointer hover:bg-neutral-800'
			)}
			onclick={() => {
				if (value === 'all') {
					logLevels = ['all']
				} else {
					logLevels = logLevels.filter((level) => level !== 'all')
				}
			}}
		>
			<span
				class={cn(
					'flex size-5 items-center justify-center rounded-md border border-white',
					checked && 'bg-white text-black'
				)}
			>
				{#if checked}
					<CheckIcon size={12} weight="bold" />
				{/if}
			</span>
			<span>{label}</span>
		</Select.Item>
	{/each}
</Select.Root>
