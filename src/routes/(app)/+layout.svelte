<script lang="ts">
	import { CollapsibleMenu } from '$lib/components/ui/collapsible'
	import { NavLink } from '$lib/components/ui/nav'

	let { children, data } = $props()
</script>

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
