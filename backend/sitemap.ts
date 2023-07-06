import fs from 'fs'
import path from 'path'

interface UrlEntry {
  url: string
  changefreq: string
  priority: number
}

const generateSitemap = (): void => {
  const urls: UrlEntry[] = [
    { url: '/', changefreq: 'daily', priority: 1 },
    { url: '/login', changefreq: 'daily', priority: 0.8 },
    { url: '/register', changefreq: 'daily', priority: 0.8 },
    { url: '/meal-plan', changefreq: 'daily', priority: 1 },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
          .map(
            ({ url, changefreq, priority }) => `
            <url>
                <loc>http://localhost:3000${url}</loc>
                <changefreq>${changefreq}</changefreq>
                <priority>${priority}</priority>
            </url>
        `
          )
          .join('')}
    </urlset>`

  const filepath = path.join(__dirname, 'public', 'sitemap.xml')
  fs.writeFileSync(filepath, sitemap)
}

export default generateSitemap
