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
</script>

{#snippet title()}
	<H level={4} class="mb-4 flex items-center gap-6">
		<BadgeLogLevel level={event.level} />
		{format(event.timestamp!, 'yyyy-MM-dd HH:mm:ss')}
	</H>
{/snippet}

{#snippet content()}
	<p class="mb-4 border-b border-b-neutral-800 pb-4">
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
		'grid grid-cols-12 gap-4 rounded-lg px-6 py-3',
		'opacity-100 transition-all',
		event.level === 'error' && 'bg-red-500/10 hover:bg-red-500/25',
		event.level === 'warn' && 'bg-yellow-500/10 hover:bg-yellow-500/25',
		event.level === 'info' && 'hover:bg-blue-500/8',
		event.level === 'debug' && 'bg-indigo-500/10 hover:bg-indigo-500/25'
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
				'text-center font-bold',
				event.level === 'error' && 'border-red-500 text-red-500',
				event.level === 'warn' && 'border-yellow-500 text-yellow-500',
				event.level === 'info' && 'border-blue-600 text-blue-600',
				event.level === 'debug' && 'border-indigo-500 text-indigo-500'
			)}
		>
			{event.level}
		</span>
	</div>
	<div class="col-span-3 xl:col-span-2">
		<span class="text-neutral-500">{format(event.timestamp!, 'yyyy-MM-dd HH:mm:ss')}</span>
	</div>
	<div class="col-span-3 xl:col-span-4">{event.message}</div>
	<div class="col-span-4 overflow-hidden text-nowrap text-ellipsis xl:col-span-5">
		<code>{JSON.stringify(event.meta)}</code>
	</div>
</a>
