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
		'flex cursor-pointer items-center justify-center rounded-full bg-neutral-800 p-3 text-xs font-bold',
		'ring-2 ring-neutral-900 ring-offset-1 ring-offset-black transition-all',
		'focus:outline-none data-[state=open]:ring-neutral-700'
	)}
>
	{initials}
</button>
