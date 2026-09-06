import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio Dashboard',

  projectId: '44ra77i5',
  dataset: 'production',

  plugins: [structureTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
