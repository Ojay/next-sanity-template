import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

import structure from './src/structure'

const singletonTypes = ['site']

export default defineConfig({
	name: 'default',
	title: 'Next.js + Sanity Template',

	projectId: 'elyfelq1',
	dataset: 'production',

	plugins: [deskTool({ structure }), visionTool()],

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.includes(schemaType),
			),
	},

	document: {
		actions: (input, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? input.filter(
						({ action }) =>
							action &&
							['publish', 'discardChanges', 'restore'].includes(action),
				  )
				: input,
	},
})
