import {defineType, defineField} from 'sanity'
import {ShoppingCartIcon} from '@sanity/icons/ShoppingCart'

export const shopifyFeature = defineType({
  name: 'shopifyFeature',
  title: 'Shopify Features',
  type: 'document',
  icon: ShoppingCartIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'icon', type: 'string'}),
    defineField({name: 'color', type: 'string'}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
