<script lang="ts">
	import { CollapsibleMenu } from '$lib/components/ui/collapsible'
	import { NavLink } from '$lib/components/ui/nav'
	import { Breadcrumbs } from '$lib/components/ui/breadcrumbs'
	import { Switch } from '$lib/components/ui/input'
	import { app } from '$lib/state/app.svelte'
	import { Avatar } from '$lib/components/ui/avatar'
	import * as Dropdown from '$lib/components/ui/dropdown'
	import { goto } from '$app/navigation'

	let { children, data } = $props()
	let ref = $state<HTMLElement | null>(null)

	app.breadcrumbs = data.breadcrumbs
	app.user = data.user
</script>

<header class="flex items-center border-b border-neutral-200 dark:border-neutral-900">
	<div class="max-w-80 min-w-80 p-4">
		<a href="/" class="text-2xl font-bold">LogHog</a>
	</div>
	<div class="flex flex-grow-1 px-6">
		<Breadcrumbs />
		<div class="ms-auto flex gap-6">
			<Switch bind:checked={app.darkMode}></Switch>
			<Dropdown.Menu contentProps={{ align: 'end', sideOffset: 6 }}>
				{#snippet trigger()}
					<Dropdown.Trigger {ref}>
						{#snippet child({ props })}
							<Avatar {...app.user!} {...props} />
						{/snippet}
					</Dropdown.Trigger>
				{/snippet}
				{#snippet content()}
					<Dropdown.Group>
						<Dropdown.Item onSelect={() => goto('/auth/logout')}>Logout</Dropdown.Item>
					</Dropdown.Group>
				{/snippet}
			</Dropdown.Menu>
		</div>
	</div>
</header>
<div class="flex flex-grow overflow-hidden">
	<aside
		class="max-w-80 min-w-80 flex-grow border-r border-neutral-200 p-4 dark:border-neutral-900"
	>
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
	</aside>
	<main class="flex flex-grow">
		{@render children()}
	</main>
</div>
