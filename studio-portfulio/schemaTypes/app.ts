import {defineType, defineField, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'

export const app = defineType({
  name: 'app',
  title: 'Apps',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'name'}}),
    defineField({name: 'tagline', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Live', value: 'live'},
          {title: 'Development', value: 'development'},
          {title: 'Planned', value: 'planned'},
        ],
        layout: 'radio',
      },
    }),
    defineField({name: 'url', type: 'url'}),
    defineField({name: 'icon', type: 'string'}),
    defineField({name: 'color', type: 'string'}),
    defineField({
      name: 'features',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'status'},
  },
})
