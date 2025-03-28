<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import type { Snippet } from "svelte"
	import { H } from "../heading"
	import { cn } from "$lib/utils"

    type Props = {
        type?: 'info' | 'success' | 'warning' | 'error';
        title?: string;
        children: Snippet;
        dismissible?: boolean;
    } & HTMLAttributes<HTMLDivElement>

    let { children, type = 'info', dismissible, title, ...restProps }: Props = $props()
</script>

<div {...restProps} class={cn(
    'flex flex-col items-start justify-start space-y-2 rounded-lg px-4 py-3',
    'bg-neutral-900 shadow-2xl border',
    type === 'info' && 'bg-info text-info-800 dark:bg-info-900 dark:text-info-100 border-info',
    type === 'success' && 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100 border-success',
    type === 'warning' && 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100 border-warning',
    type === 'error' && 'bg-red-100 text-error-800 dark:bg-error-950 dark:text-error-100 border-error',
    restProps.class
)}>
    {#if title}
        <div>
            <H level="3">{title}</H>
        </div>
    {/if}
    <div>{@render children()}</div>
</div>