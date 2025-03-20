<script lang="ts">
	import { cn } from '$lib/utils'

	type Props = {
		level: 'error' | 'warn' | 'success' | 'info' | 'debug' | string
		tiny?: boolean
	}

	let { level, tiny = false }: Props = $props()
</script>

{#if tiny}
	<span
		class={cn(
			'h-7 w-2 rounded-full',
			level === 'error' && 'bg-red-500',
			level === 'warn' && 'bg-yellow-500',
			level === 'success' && 'bg-green-400',
			level === 'info' && 'bg-indigo-500',
			level === 'debug' && 'bg-cyan-500'
		)}
	></span>
{:else}
	<span
		class={cn(
			'rounded-full border px-6 py-2 text-xs font-bold',
			level === 'error' && 'border-red-900 bg-red-500/20 text-red-400',
			level === 'warn' && 'border-yellow-900 bg-yellow-500/20 text-yellow-400',
			level === 'success' && 'border-green-900 bg-green-400/20 text-green-400',
			level === 'info' && 'border-indigo-900 bg-indigo-500/20 text-indigo-400',
			level === 'debug' && 'border-cyan-900 bg-cyan-500/20 text-cyan-400'
		)}
	>
		{level}
	</span>
{/if}
