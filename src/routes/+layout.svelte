<script lang="ts">
	import { CollapsibleMenu } from '$lib/components/ui/collapsible'
	import { NavLink } from '$lib/components/ui/nav'
	import { Dialog } from '$lib/components/ui/dialog'
	import { app, dialog } from '$lib/state/app.svelte'
	import { Breadcrumbs } from '$lib/components/ui/breadcrumbs'

	import '../app.css'

	let { children, data } = $props()

	app.breadcrumbs = data.breadcrumbs
</script>

<div class="flex max-h-screen min-h-screen flex-col">
	<header class="flex items-center border-b border-b-neutral-800">
		<div class="max-w-80 min-w-80 p-4">
			<a href="/" class="text-2xl font-bold">LogHog</a>
		</div>
		<div>
			<Breadcrumbs />
		</div>
	</header>
	<div class="flex flex-grow overflow-hidden">
		<aside class="max-w-80 min-w-80 flex-grow border-r border-r-neutral-900 p-4">
			<h3 class="mt-2 mb-2 text-sm font-bold text-neutral-600 uppercase">Logs</h3>
			<div class="flex flex-col gap-3">
				{#each data.groups as group}
					<CollapsibleMenu buttonText={group.name}>
						<nav class="my-2 ms-8.5 flex flex-col gap-1">
							{#each group.logs as log}
								<NavLink href={`/logs/${log.path}`}>
									<span>{log.name}</span>
								</NavLink>
							{/each}
						</nav>
					</CollapsibleMenu>
				{/each}
			</div>
			<!-- <nav class="flex flex-col gap-1">
				{#each data.logs as log}
					<NavLink href={`/logs/${log.path}`}>
						<LogsIcon class="text-neutral-600" size={20} />
						<span>{log.name}</span>
					</NavLink>
				{/each}
			</nav> -->
		</aside>
		<main class="flex flex-grow">
			{@render children()}
		</main>
	</div>
</div>

<Dialog
	description={dialog.description}
	title={dialog.title}
	children={dialog.content}
	bind:open={dialog.show}
	contentProps={{ interactOutsideBehavior: 'close' }}
/>
