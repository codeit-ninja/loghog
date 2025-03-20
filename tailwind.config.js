/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			typography: () => ({
				white: {
					css: {
						'--tw-prose-body': 'var(--color-neutral-100)',
						'--tw-prose-headings': 'var(--color-neutral-200)',
						'--tw-prose-lead': 'var(--color-neutral-300)',
						'--tw-prose-links': 'var(--color-primary)',
						'--tw-prose-bold': 'var(--color-neutral-300)',
						'--tw-prose-counters': 'var(--color-neutral-300)',
						'--tw-prose-bullets': 'var(--color-neutral-300)',
						'--tw-prose-hr': 'var(--color-neutral-300)',
						'--tw-prose-quotes': 'var(--color-neutral-300)',
						'--tw-prose-quote-borders': 'var(--color-neutral-300)',
						'--tw-prose-captions': 'var(--color-neutral-300)',
						'--tw-prose-code': 'var(--color-neutral-300)',
						'--tw-prose-pre-code': 'var(--color-neutral-300)',
						'--tw-prose-pre-bg': 'var(--color-neutral-900)',
						'--tw-prose-th-borders': 'var(--color-neutral-300)',
						'--tw-prose-td-borders': 'var(--color-neutral-300)'
					}
				}
			})
		}
	}
}
