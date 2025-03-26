import type { Unsafe } from 'sveltekit-sse'

export const clients = new Map<string, (eventName: string, data: string) => Unsafe<void, Error>>()
