<script lang="ts">
	import { cn } from '$lib/utils'

	type Props = {
		variant: 'primary' | 'info' | 'warning' | 'error' | 'success' | 'debug'
		label: string
	}

	let { label, variant } = $props()
</script>

<span
	class={cn(
		'block rounded-full px-4 py-0.5 text-xs',
		variant === 'primary' && 'bg-primary/15 text-primary',
		variant === 'info' && 'bg-info/15 text-info',
		variant === 'warning' && 'bg-warning/15 text-warning',
		variant === 'error' && 'bg-error/15 text-error',
		variant === 'success' && 'bg-success/15',
		variant === 'debug' && 'bg-debug/15 text-debug'
	)}>{label}</span
>
