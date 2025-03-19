<script lang="ts">
	import '@alenaksu/json-viewer'
	import type { JsonViewer } from '@alenaksu/json-viewer/JsonViewer.js'
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
	}

	let { children }: Props = $props()
	let jsonViewer = $state<JsonViewer>()

	$effect(() => {
		if (jsonViewer) {
			jsonViewer.expandAll()
		}
	})
</script>

<json-viewer bind:this={jsonViewer} class="max-h-[calc(100vh-400px)] overflow-y-auto">
	{@render children()}
</json-viewer>
