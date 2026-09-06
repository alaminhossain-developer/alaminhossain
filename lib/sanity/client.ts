import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '44ra77i5',
  dataset: 'production',
  apiVersion: '2026-09-06',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
  return builder.image(source as any)
}

// Helper to get image URL as string
export function getImageUrl(source: unknown, width?: number): string {
  let img = builder.image(source as any)
  if (width) img = img.width(width)
  return img.url()
}
