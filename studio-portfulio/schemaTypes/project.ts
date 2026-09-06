import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'category', type: 'string'}),
    defineField({name: 'year', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'longDescription', type: 'text'}),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'liveUrl', type: 'url'}),
    defineField({name: 'color', type: 'string'}),
    defineField({
      name: 'screenshots',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
    defineField({name: 'selected', type: 'boolean', initialValue: false}),
    defineField({name: 'order', type: 'number', initialValue: 99}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
