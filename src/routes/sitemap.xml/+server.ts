export const GET = async () => (
	new Response(
		`
			<?xml version="1.0" encoding="UTF-8" ?>
			<urlset
				xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
				xmlns:xhtml="https://www.w3.org/1999/xhtml"
				xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
				xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
				xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
				xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
			>
				<url>
					<loc>https://blockhead.info</loc>
				</url>
				<url>
					<loc>https://blockhead.info/portfolio</loc>
					<changefreq>always</changefreq>
				</url>
				<url>
					<loc>https://blockhead.info/explorer</loc>
					<changefreq>daily</changefreq>
				</url>
				<url>
					<loc>https://blockhead.info/apps</loc>
					<changefreq>daily</changefreq>
				</url>
			</urlset>
		`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	)
)
