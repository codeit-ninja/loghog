<script lang="ts">
	import type { Prisma } from '@prisma/client'
	import FunnelIcon from 'phosphor-svelte/lib/Funnel'
	import { PUBLIC_SOCKET_URL } from '$env/static/public'
	import { page } from '$app/state'
	import { LogTable, LogLine } from '$lib/components/ui/log'
	import { Input } from '$lib/components/ui/input'
	import { SelectLevel, SelectRange } from '$lib/components/ui/select'
	import { H } from '$lib/components/ui/heading'
	import { isAfter, subMilliseconds } from 'date-fns'
	import { debounce } from 'lodash-es'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { Socket } from '$lib/client/socket.js'

	let { data } = $props()
	let events: Prisma.eventsGetPayload<{ include: { logs: true } }>[] = $state([])
	let logLevels: string[] = $state(['all'])
	let logRange: string = $state('0')
	let searchQuery = $state<string>()
	let isLoading = $state(false)
	let searchParams = $state(new URLSearchParams())

	onMount(async () => {
		const socket = new Socket(`/logs/${page.params.slug}`)

		for await (const msg of socket.message()) {
			const event = JSON.parse(msg)
			const isInRange = (timestamp: string) =>
				isAfter(
					new Date(timestamp),
					subMilliseconds(new Date(), parseInt(logRange) > 0 ? parseInt(logRange) : 1000000)
				)

			if (
				logLevels.includes('all') &&
				isInRange(event.timestamp) &&
				(searchQuery === undefined ||
					event.message.toLowerCase().includes(searchQuery.toLowerCase()))
			) {
				events.unshift(event)
				continue
			}

			if (
				logLevels.includes(event.level) &&
				isInRange(event.timestamp) &&
				searchQuery !== undefined
			) {
				if (searchQuery) {
					const query = searchQuery.toLowerCase()
					if (event.message.toLowerCase().includes(query)) {
						events.unshift(event)
						continue
					}
				} else {
					events.unshift(event)
					continue
				}
			}
		}
	})

	const update = debounce(() => {
		isLoading = true

		searchParams.set('level', logLevels.join(','))
		searchParams.set('range', logRange)

		if (searchQuery) {
			searchParams.set('query', searchQuery)
		}

		fetch(`/api/logs/${page.params.path}?${searchParams.toString()}`)
			.then((response) => response.json())
			.then((response) => {
				if (response.code === 'OK') {
					events = response.data.events
				}
			})
			.finally(() => {
				setTimeout(() => {
					isLoading = false
				}, 500)
			})
	}, 250)

	beforeNavigate(() => {
		update()
	})

	$effect(() => {
		searchQuery
		logLevels
		logRange

		update()
	})
</script>

<div class="flex flex-grow flex-col gap-4">
	<header class=" flex flex-col border-b border-b-neutral-800 px-6 py-6">
		<H level={1} class="mb-4">{data.log.name}</H>
		<div class="flex items-center gap-2">
			<span class="me-6 flex items-center gap-2 text-neutral-500">
				<FunnelIcon size={22} />
				Filter:
			</span>
			<SelectLevel bind:logLevels />
			<SelectRange bind:logRange />
			<Input placeholder="Search" bind:value={searchQuery} />
		</div>
	</header>

	<div class="flex h-[0px] flex-grow flex-col">
		<LogTable {isLoading}>
			{#each events as event, index (event.timestamp)}
				<LogLine {event} />
			{/each}
		</LogTable>
	</div>
</div>
