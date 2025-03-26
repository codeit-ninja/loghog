<script lang="ts">
	import { dialog } from '$lib/state/app.svelte'
	import { cn } from '$lib/utils'
	import { Prisma } from '@prisma/client'
	import { format } from 'date-fns'
	import { BadgeLogLevel } from '../badge'
	import { H } from '../heading'
	import { Collapsible } from '../collapsible'
	import JsonViewer from '../json/json-viewer.svelte'

	type Props = {
		event: Prisma.eventsGetPayload<{ include: { logs: true } }>
	}

	let { event }: Props = $props()

	// const levels = {
	// 	   error: 0,
	// 	   warn: 1,
	// 	   info: 2,
	// 	   http: 3,
	// 	   success: 4,
	// 	   verbose: 5,
	// 	   debug: 6,
	// 	   silly: 7
	// }
</script>

{#snippet title()}
	<H level={4} class="mb-4 flex items-center gap-6">
		<BadgeLogLevel level={event.level} />
		{format(event.timestamp!, 'yyyy-MM-dd HH:mm:ss')}
	</H>
{/snippet}

{#snippet content()}
	<p class="mb-4 border-b border-neutral-200 pb-4 dark:border-b-neutral-800">
		{event.message}
	</p>
	<Collapsible buttonText="Inspect metadata">
		<JsonViewer>
			{JSON.stringify(event.meta)}
		</JsonViewer>
	</Collapsible>
{/snippet}

<a
	class={cn(
		'grid grid-cols-12 gap-4 rounded-lg px-6 py-1',
		'opacity-100 transition-all',
		event.level === 'success' && 'hover:bg-success/15',
		event.level === 'error' && 'hover:bg-error/15',
		event.level === 'warn' && 'hover:bg-warning/15',
		event.level === 'info' && 'hover:bg-info/15',
		event.level === 'debug' && 'hover:bg-debug/15'
	)}
	href={`javascript:void(0);`}
	onclick={() => {
		dialog.open({
			title,
			props: { ...event },
			content
		})
	}}
>
	<div class="col-span-2 xl:col-span-1">
		<span
			class={cn(
				'flex gap-2 text-center'
				// event.level === 'success' && 'text-success border-success',
				// event.level === 'error' && 'text-error border-error',
				// event.level === 'warn' && 'text-warning border-warning',
				// event.level === 'info' && 'text-info border-info',
				// event.level === 'debug' && 'text-debug border-debug'
			)}
		>
			<span
				class={cn(
					'w-2 rounded-full',
					event.level === 'success' && 'bg-success/50',
					event.level === 'error' && 'bg-error/50',
					event.level === 'warn' && 'bg-warning/50',
					event.level === 'info' && 'bg-info/50',
					event.level === 'debug' && 'bg-debug/50'
				)}
			></span>
			<span
				class={cn(
					'flex-grow rounded-full py-1 text-center text-xs font-semibold uppercase',
					event.level === 'success' && 'bg-success/20 text-success',
					event.level === 'error' && 'bg-error/20 text-error',
					event.level === 'warn' && 'bg-warning/20 text-warning',
					event.level === 'info' && 'bg-info/20 text-info',
					event.level === 'debug' && 'bg-debug/20 text-debug'
				)}>{event.level}</span
			>
		</span>
	</div>
	<div class="col-span-3 xl:col-span-2">
		<span class="text-neutral-500">{format(event.timestamp!, 'yyyy-MM-dd HH:mm:ss')}</span>
	</div>
	<div class="col-span-3 xl:col-span-4">{event.message}</div>
	<div class="col-span-4 overflow-hidden text-nowrap text-ellipsis text-neutral-400 xl:col-span-5">
		<code>{JSON.stringify(event.meta)}</code>
	</div>
</a>
