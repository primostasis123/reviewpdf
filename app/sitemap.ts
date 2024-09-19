import type { MetadataRoute } from 'next'

// This is an example of a sitemap file
// update the url according to your website for crawler to crawl
// For more infomration : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.reviewpdf-ai.com',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://www.reviewpdf-ai.com/pricing',
      lastModified: new Date(),
      priority: 0.9,
    },
  ]
}
