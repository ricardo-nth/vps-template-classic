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

export interface SharedContactConfig {
  phoneLabel: string;
  phoneHref: string;
  emailLabel: string;
  emailHref: string;
  address: string;
}

export type CareProfile = 'supported-living' | 'dom-care';

export interface CareProfileConfig {
  /**
   * When true, render the dual-profile preview UI on canonical URLs.
   * Set PUBLIC_CARE_PROFILE_PREVIEW=false for single-profile production handoff.
   */
  previewEnabled: boolean;
  /**
   * Profile to use as default in preview mode and as the only profile in production mode.
   */
  defaultProfile: CareProfile;
  /** Local storage key used to persist preview selection across pages. */
  storageKey: string;
}

export const siteConfig: SiteConfig = {
  name: 'Harbor Care Services',
  description:
    'Person-centred adult social care across supported living and domiciliary care pathways.',
};

export const sharedContactConfig: SharedContactConfig = {
  phoneLabel: '0208 555 0199',
  phoneHref: 'tel:+442085550199',
  emailLabel: 'hello@harborcare.co.uk',
  emailHref: 'mailto:hello@harborcare.co.uk',
  address: 'Unit 12, Healthcare Business Park, London, SE1 7PB',
};

const envDefaultProfile =
  import.meta.env.PUBLIC_DEFAULT_CARE_PROFILE === 'dom-care' ? 'dom-care' : 'supported-living';

export const careProfileConfig: CareProfileConfig = {
  previewEnabled: import.meta.env.PUBLIC_CARE_PROFILE_PREVIEW !== 'false',
  defaultProfile: envDefaultProfile,
  storageKey: 'vps-care-profile',
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
