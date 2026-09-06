import {defineType, defineField} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const wordpressFeature = defineType({
  name: 'wordpressFeature',
  title: 'WordPress Features',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'icon', type: 'string'}),
    defineField({name: 'color', type: 'string'}),
    defineField({name: 'order', type: 'number', initialValue: 99}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title'},
  },
})
