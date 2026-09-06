import {defineType, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const skill = defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'category', type: 'string'}),
    defineField({name: 'level', type: 'number', validation: (rule) => rule.min(0).max(100)}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'category'},
  },
})
