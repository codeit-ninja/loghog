<script lang="ts">
	import { cn } from '$lib/utils'
	import type { users } from '@prisma/client'

	type Props = {} & Omit<users, 'password' | 'createdAt' | 'updatedAt'>

	let { name, ...restProps }: Props = $props()
	let initials = $derived(
		name
			.split(' ')
			.map((n) => n[0])
			.join('')
	)

	$inspect(initials)
</script>

<button
	{...restProps}
	class={cn(
		'flex cursor-pointer items-center justify-center rounded-full p-3 text-xs font-bold',
		'size-10 ring-2 ring-offset-1 transition-all',
		'focus:outline-none',
        'bg-primary-100 ring-offset-white ring-neutral-100 data-[state=open]:ring-neutral-200',
        'dark:bg-neutral-800 dark:ring-offset-black dark:ring-neutral-900 dark:data-[state=open]:ring-neutral-700'
	)}
>
	{initials}
</button>
