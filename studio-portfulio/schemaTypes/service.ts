import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'number', type: 'string'}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'icon', type: 'string'}),
    defineField({
      name: 'features',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'number'},
  },
})
