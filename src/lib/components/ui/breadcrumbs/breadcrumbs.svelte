<script lang="ts">
	import { app } from '$lib/state/app.svelte'
	import { cn } from '$lib/utils'
	import HouseIcon from 'phosphor-svelte/lib/House'
</script>

<nav aria-label="breadcrumb" class="flex items-center gap-2">
	<ol class="flex items-center gap-2" role="list">
		<li role="listitem" class="flex items-center gap-2">
			<a
				href="/"
				class="text-neutral-400 transition-colors hover:text-black dark:text-neutral-500 dark:hover:text-white"
			>
				<HouseIcon size={22} />
			</a>

			<span>/</span>
		</li>
		{#each app.breadcrumbs as breadcrumb, i}
			{@const isLast = i === app.breadcrumbs.length - 1}

			<li role="listitem" class="flex items-center gap-2">
				{#if isLast === true}
					<span aria-current="page">{breadcrumb.title}</span>
				{:else}
					<a
						href={breadcrumb.path}
						class={cn(
							'text-neutral-400 transition-colors hover:text-black dark:text-neutral-500 dark:hover:text-white',
							isLast && 'text-white'
						)}
					>
						{breadcrumb.title}
					</a>
				{/if}
			</li>

			{#if isLast === false}
				<li role="listitem" class="flex items-center gap-2">
					<span>/</span>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
