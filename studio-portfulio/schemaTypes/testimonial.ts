import {defineType, defineField} from 'sanity'
import {HeartIcon} from '@sanity/icons/Heart'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({name: 'quote', type: 'text', validation: (rule) => rule.required()}),
    defineField({name: 'author', type: 'string'}),
    defineField({name: 'role', type: 'string'}),
    defineField({name: 'company', type: 'string'}),
    defineField({name: 'projectType', type: 'string'}),
  ],
  preview: {
    select: {title: 'author', subtitle: 'company'},
  },
})
