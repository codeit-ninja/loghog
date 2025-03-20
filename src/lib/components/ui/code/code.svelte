<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import { highlightElement, type ShjLanguage } from '@speed-highlight/core'

	type Props = {
		children: Snippet
		language?: ShjLanguage
		ref?: HTMLDivElement
	} & HTMLAttributes<HTMLDivElement>

	let { children, ref, language }: Props = $props()

	$effect(() => {
		if (!ref) {
			return
		}

		highlightElement(ref, language || 'js', undefined, { hideLineNumbers: true })
	})
</script>

<div bind:this={ref}>
	{@render children()}
</div>
