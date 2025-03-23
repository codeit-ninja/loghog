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
				'hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800'
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
					'flex size-5 items-center justify-center rounded-md border',
					'dark:border-white',
					checked && 'border-black bg-black text-white dark:bg-white dark:text-black'
				)}
			>
				{#if checked}
					<CheckIcon size={12} weight="bold" />
				{/if}
			</span>
			<span class="relative mt-[3px]">{label}</span>
		</Select.Item>
	{/each}
</Select.Root>
