import type { Snippet } from 'svelte'

export type DialogState<T extends any[] = any> = {
	show: boolean
	title?: Snippet<T> | string | null
	description?: Snippet | string | null
	content?: Snippet<T>
	props?: T
}

export type AppState = {
	breadcrumbs: App.Locals['breadcrumbs']
}

/**
 * Initializes a dialog state and provides methods to control its visibility and content.
 *
 * @returns {Object} An object containing:
 *  - `open(newState.State: Omit<DialogState, 'open'>)`: A method to open the dialog with a newState. state, setting the title, description, content, and props.
 *  - `close()`: A method to close the dialog, resetting its
 *  - The current state of the dialog, including `show`, `title`, `description`, `content`, and `props`.
 */
export function createDialog() {
	let show = $state.raw<DialogState['show']>(false)
	let title = $state.raw<DialogState['title']>(null)
	let description = $state.raw<DialogState['description']>(null)
	let content = $state.raw<DialogState['content']>(undefined)
	let props = $state.raw<DialogState['props']>(undefined)

	const open = (newState: Omit<DialogState, 'show'>) => {
		show = true
		title = newState.title
		description = newState.description
		content = newState.content
		props = newState.props
	}

	const close = () => {
		show = false
	}

	$effect.root(() => {
		$effect(() => {
			if (show === false) {
				title = null
				description = null
				content = undefined
				props = undefined
			}
		})
	})

	return {
		open,
		close,
		get show() {
			return show
		},
		set show(value) {
			show = value
		},
		get title() {
			return title
		},
		set title(value) {
			title = value
		},
		get description() {
			return description
		},
		set description(value) {
			description = value
		},
		get content() {
			return content
		},
		set content(value) {
			content = value
		},
		get props() {
			return props
		},
		set props(value) {
			props = value
		}
	}
}

export const dialog = createDialog()
export const app = $state<AppState>({
	breadcrumbs: []
})
