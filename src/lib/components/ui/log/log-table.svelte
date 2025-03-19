<script lang="ts">
	import LoaderIcon from 'phosphor-svelte/lib/CircleNotch'
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
		isLoading?: boolean
	}

	let { children, isLoading = $bindable(false) }: Props = $props()
</script>

<div class="flex h-[0px] flex-grow flex-col">
	<div class="grid grid-cols-12 gap-4 px-12 py-4 text-sm font-bold uppercase">
		<div class="col-span-2 xl:col-span-1">
			<span class="text-neutral-500">Level</span>
		</div>
		<div class="col-span-3 xl:col-span-2">
			<span class="text-neutral-500">Timestamp</span>
		</div>
		<div class="col-span-3 xl:col-span-4">
			<span class="text-neutral-500">Message</span>
		</div>
		<div class="col-span-4 overflow-hidden text-nowrap text-ellipsis xl:col-span-5">
			<span class="text-neutral-500">Meta</span>
		</div>
	</div>
	<div class="flex flex-grow flex-col gap-1 overflow-auto px-6">
		{#if isLoading}
			<div class="flex flex-grow items-center justify-center">
				<LoaderIcon class="animate-spin" size={64} weight="thin" />
			</div>
		{:else}
			{@render children?.()}
		{/if}
	</div>
</div>
