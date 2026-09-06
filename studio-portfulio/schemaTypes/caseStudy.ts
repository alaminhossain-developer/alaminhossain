import {defineType, defineField, defineArrayMember} from 'sanity'
import {StarIcon} from '@sanity/icons/Star'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'client', type: 'string'}),
    defineField({name: 'category', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({
      name: 'results',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'bannerImage', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'order', type: 'number', initialValue: 99}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'client', media: 'bannerImage'},
  },
})
