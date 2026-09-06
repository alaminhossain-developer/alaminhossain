import {defineType, defineField} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'tagline', type: 'string'}),
    defineField({name: 'bio', type: 'text'}),
    defineField({name: 'heroPhoto', type: 'image', options: {hotspot: true}}),
    defineField({name: 'aboutPhoto', type: 'image', options: {hotspot: true}}),
    defineField({name: 'techPhoto', type: 'image', options: {hotspot: true}}),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'location', type: 'string'}),
    defineField({name: 'github', type: 'url'}),
    defineField({name: 'linkedin', type: 'url'}),
    defineField({name: 'twitter', type: 'url'}),
    defineField({name: 'facebook', type: 'url'}),
    defineField({name: 'instagram', type: 'url'}),
    defineField({name: 'upwork', type: 'url'}),
    defineField({name: 'fiverr', type: 'url'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tagline'},
  },
})
