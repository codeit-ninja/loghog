<script lang="ts">
	import { Dialog } from '$lib/components/ui/dialog'
	import { dialog } from '$lib/state/app.svelte'

	import '../app.css'

	let { children } = $props()
</script>

<div class="flex max-h-screen min-h-screen flex-col">
	{@render children()}
</div>

<Dialog
	description={dialog.description}
	title={dialog.title}
	children={dialog.content}
	bind:open={dialog.show}
	contentProps={{ interactOutsideBehavior: 'close' }}
/>
