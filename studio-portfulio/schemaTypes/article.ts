import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const article = defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'excerpt', type: 'text'}),
    defineField({name: 'content', type: 'text'}),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Shopify', value: 'shopify'},
          {title: 'WordPress', value: 'wordpress'},
          {title: 'App', value: 'app'},
          {title: 'Web', value: 'web'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'publishedAt', type: 'date'}),
    defineField({name: 'readTime', type: 'string'}),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({name: 'coverImage', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'coverImage'},
  },
})
