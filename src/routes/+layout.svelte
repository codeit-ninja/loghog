<script lang="ts">
	import { Dialog } from '$lib/components/ui/dialog'
	import { app, dialog } from '$lib/state/app.svelte'
	import { Breadcrumbs } from '$lib/components/ui/breadcrumbs'
	import { Switch } from '$lib/components/ui/input'

	import '../app.css'

	let { children, data } = $props()

	app.breadcrumbs = data.breadcrumbs
	app.user = data.user
</script>

<div class="flex max-h-screen min-h-screen flex-col">
	<header class="flex items-center border-b border-neutral-200 dark:border-neutral-900">
		<div class="max-w-80 min-w-80 p-4">
			<a href="/" class="text-2xl font-bold">LogHog</a>
		</div>
		<div class="flex flex-grow-1 px-6">
			<Breadcrumbs />
			<div class="ms-auto">
				<Switch bind:checked={app.darkMode}></Switch>
			</div>
		</div>
	</header>
	{@render children()}
</div>

<Dialog
	description={dialog.description}
	title={dialog.title}
	children={dialog.content}
	bind:open={dialog.show}
	contentProps={{ interactOutsideBehavior: 'close' }}
/>
