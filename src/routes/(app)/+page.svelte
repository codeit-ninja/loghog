<script lang="ts">
	import GettingStarted from './getting-started.svelte'

	let { data } = $props()
</script>

{#if data.groups.length === 0}
	<GettingStarted />
{/if}
