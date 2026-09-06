import {defineType, defineField, defineArrayMember} from 'sanity'
import {BriefcaseIcon} from '@sanity/icons/Briefcase'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: BriefcaseIcon,
  fields: [
    defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'company', type: 'string'}),
    defineField({name: 'period', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'current', type: 'boolean', initialValue: false}),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
  preview: {
    select: {title: 'role', subtitle: 'company'},
  },
})
