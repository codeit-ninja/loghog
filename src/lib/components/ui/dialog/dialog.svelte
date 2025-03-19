<script lang="ts" generics="T extends any = any">
	import type { Snippet } from 'svelte'
	import { Dialog, type WithoutChild } from 'bits-ui'
	import { isFunction } from 'lodash-es'
	import { cn } from '$lib/utils'
	import { H } from '../heading'
	import XIcon from 'phosphor-svelte/lib/X'
	import { dialog } from '$lib/state/app.svelte'

	type Props = Dialog.RootProps & {
		children?: Snippet<[T]>
		title?: Snippet | string | null
		description?: Snippet | string | null
		contentProps?: WithoutChild<Dialog.ContentProps>
		size?: 'full' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
	}

	let {
		open = $bindable(false),
		children,
		contentProps,
		title,
		description,
		size = 'xl',
		...restProps
	}: Props = $props()
</script>

<Dialog.Root bind:open {...restProps}>
	<Dialog.Portal>
		<Dialog.Overlay class={cn('fixed inset-0 z-50 bg-black/5 backdrop-blur-xs')} />
		<Dialog.Content
			{...contentProps}
			class={cn(
				'fixed top-1/2 left-1/2 z-50 -translate-1/2 rounded-xl border-2 border-neutral-800 bg-black',
				'max-h-[calc(100%-2rem)] overflow-clip',
				size === 'full' && 'w-[calc(100%-2rem)]',
				size === 'xl' && 'w-4xl',
				size === 'lg' && 'w-3xl',
				size === 'md' && 'w-2xl',
				size === 'sm' && 'w-xl',
				size === 'xs' && 'w-md'
			)}
		>
			<div class="p-6">
				<Dialog.Title class="relative">
					{#if title}
						{#if isFunction(title)}
							{@render title()}
						{:else}
							<H level={4}>{title}</H>
						{/if}
					{/if}
					<Dialog.Close class="absolute top-0 right-0 cursor-pointer"><XIcon /></Dialog.Close>
				</Dialog.Title>
				{#if description}
					<Dialog.Description class="mt-1 text-neutral-500">
						{#if isFunction(description)}
							{@render description()}
						{:else}
							{description}
						{/if}
					</Dialog.Description>
				{/if}
				<div class="mt-6">
					{@render children?.(dialog.props)}
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
