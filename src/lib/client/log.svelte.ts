import type { Prisma } from '@prisma/client'
import { goto } from '$app/navigation'
import { page } from '$app/state'
import { debounce } from 'lodash-es'

export type Meta = {
	/** Total count of log events */
	count: number
	/** Number of records to skip (for pagination) */
	skip: number
	/** Number of records to take per page */
	take: number
}

export type Events = Prisma.eventsGetPayload<{ include: { logs: true } }>

export class Log {
	/** Filter by log levels (debug, info, warn, error, etc.) */
	levels = $state(['all'])

	/** Time range filter (e.g., '0' for all time, '1d' for last day) */
	range = $state('0')

	/** Search query string for filtering logs */
	query = $state('')

	/** Current page in pagination */
	currentPage = $state(1)

	/** Number of records per page */
	take = $state(25)

	/** Number of records to skip (based on pagination) */
	skip = $state(0)

	/** Array of log events retrieved from the API */
	events = $state<Events[]>([])

	/** Metadata about the log query results */
	meta = $state<Meta>()

	/** Loading state indicator for UI feedback */
	isLoading = $state(false)

	/** Reference to URL search parameters for persistence */
	searchParams = page.url.searchParams

	/**
	 * Creates a new log instance.
	 *
	 * @param {string} path - The path to the log
	 */
	constructor(public path: string) {
		this.levels = this.searchParams.get('levels')?.split(',') || ['all']
		this.range = this.searchParams.get('range') || '0'
		this.query = this.searchParams.get('query') || ''
		this.take = parseInt(this.searchParams.get('take') || '25', 10)
		this.skip = parseInt(this.searchParams.get('skip') || '0', 10)

		$effect(() => this.update(this.levels, this.range, this.query))
	}

	/**
	 * Updates the search parameters and fetches logs with debouncing
	 * to prevent excessive API calls during rapid filter changes.
	 *
	 * @param {string[]} levels - Log levels to filter by
	 * @param {string} range - Time range to filter logs
	 * @param {string} query - Search query for filtering logs
	 */
	update = debounce(
		(levels: typeof this.levels, range: typeof this.range, query: typeof this.query) => {
			this.searchParams.set('levels', levels.join(','))
			this.searchParams.set('range', range)
			this.searchParams.set('query', query)
			this.searchParams.set('skip', '0')

			this.skip = parseInt(this.searchParams.get('skip') || '0', 10)
			this.take = parseInt(this.searchParams.get('take') || '25', 10)
			this.currentPage = 1

			goto(`?${this.searchParams.toString()}`, { replaceState: true, keepFocus: true })
			setTimeout(() => this.fetch())
		},
		250
	)

	/**
	 * Navigate to a specific page in the paginated logs.
	 * Updates skip value and refreshes the logs.
	 *
	 * @param {number} page - Page number to navigate to
	 */
	goToPage(page: number) {
		if (this.meta) {
			this.currentPage = page
			this.skip = this.take * (this.currentPage - 1)
			this.searchParams.set('skip', this.skip.toString())

			goto(`?${this.searchParams.toString()}`, { replaceState: true, keepFocus: true })
			setTimeout(() => this.fetch())
		}
	}

	/**
	 * Fetches log data from the API based on current filter settings.
	 * Updates the events and meta state with the response data.
	 */
	fetch() {
		this.isLoading = true

		fetch(`/api/logs/${page.params.path}?${page.url.searchParams.toString()}`)
			.then((response) => response.json())
			.then((response) => {
				if (response.code === 'OK') {
					this.events = response.data.events
					this.meta = response.meta
					this.currentPage = Math.floor(this.skip / this.take) + 1

					console.log(this.skip, this.take, this.currentPage)
				}
			})
			.finally(() => {
				setTimeout(() => (this.isLoading = false), 150)
			})
	}
}
