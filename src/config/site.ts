/**
 * Global site configuration for the Astro starter template
 *
 * Update values here to customize the template for a new project.
 * This config is used for base Schema.org structured data only.
 * SEO meta tags are configured per-page in frontmatter.
 */

export interface SiteConfig {
  /** Human-friendly site name used in base Schema.org */
  name: string;
  /** Site-wide description */
  description: string;
}

export const siteConfig: SiteConfig = {
  name: '[Business Name]',
  description:
    '[Your business description - what you do and who you serve]',
};

/**
 * Build base site-wide Schema.org objects that should appear on every page.
 *
 * Returns two nodes:
 *  - Organization
 *  - WebSite (minimal: no potentialAction to avoid clashing with page-level schema)
 */
export function getBaseSchemas(site: URL) {
  const siteUrl = site.toString().replace(/\/$/, '');
  const orgId = `${siteUrl}#organization`;
  const websiteId = `${siteUrl}#website`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': orgId,
      name: siteConfig.name,
      url: siteUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteConfig.name,
      url: siteUrl,
    },
  ];
}

