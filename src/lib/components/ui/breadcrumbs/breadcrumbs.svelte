<script lang="ts">
	import { app } from '$lib/state/app.svelte'
	import { cn } from '$lib/utils'
	import HouseIcon from 'phosphor-svelte/lib/House'
</script>

<nav aria-label="breadcrumb" class="flex items-center gap-2 px-6">
	<a href="/">
		<HouseIcon size={22} />
	</a>
	<span>/</span>
	{#each app.breadcrumbs as breadcrumb, i}
		{@const isLast = i === app.breadcrumbs.length - 1}
		<a
			href={breadcrumb.path}
			class={cn('text-neutral-300 transition-colors hover:text-white', isLast && 'text-white')}
		>
			{breadcrumb.title}
		</a>
		{#if isLast === false}
			<span>/</span>
		{/if}
	{/each}
</nav>
