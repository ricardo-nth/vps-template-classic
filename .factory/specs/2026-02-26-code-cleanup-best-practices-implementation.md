## Code Cleanup & Best Practices Implementation Plan

### Branch Setup
1. Create new branch `refactor/code-cleanup` from `main`

### Phase 1: Dead Code Removal

**Delete unused component files:**
- `src/components/Header.astro` (replaced by NavbarHealthcare → will be renamed)
- `src/components/Footer.astro` (replaced by FooterHealthcare → will be renamed)
- `src/components/Hero.astro` (never imported)
- `src/components/TeamSection.astro` (never imported)

**Remove dead code within files:**
- Remove commented-out imports in `SiteLayout.astro` (lines 32-35)
- Remove unused `socialLinks` variable in original Footer (being deleted anyway)

### Phase 2: Component Renaming

- Rename `NavbarHealthcare.astro` → `Header.astro`
- Rename `FooterHealthcare.astro` → `Footer.astro`
- Rename `SecondaryNav.astro` → `TopNav.astro` (more descriptive)
- Update all imports in `SiteLayout.astro` to use new names

### Phase 3: Image Optimization

**Download placeholder images to `src/assets/images/`:**
- Create folder structure for organized assets
- Download 8-10 placeholder images from Unsplash (free license, healthcare/care context)
- Replace all external Unsplash URLs with local imports using Astro's `<Image />` component
- Add proper `alt` text, `loading="lazy"`, and responsive `widths`/`sizes` attributes

### Phase 4: TypeScript Fixes

- Replace `any` type in `TechnicalLayout.astro` with proper type
- Replace `any` type in `SiteLayout.astro` schema prop with `unknown` or proper schema type
- Ensure strict type safety throughout

### Phase 5: astro-icon Integration

- Replace inline SVGs with `<Icon name="tabler:icon-name" />` component
- Update components: Header, Footer, SecondaryNav, ContactSection, ServicesOverview, WhyChooseUs, etc.
- Keep decorative SVGs that don't have Tabler equivalents as inline

### Phase 6: Accessibility Fixes

- Add `aria-label` to placeholder links (`href="#"`) in Footer
- Add `role="link"` and `aria-disabled="true"` where appropriate for non-functional links
- Ensure all icon-only buttons have accessible labels

### Phase 7: Form Improvements

- Add `required` attribute to contact form fields (name, email, message)
- Add basic `autocomplete` attributes for better UX

### Phase 8: Configuration Fixes

- Align path aliases between `tsconfig.json` and `astro.config.mjs`
- Verify `@assets` alias works correctly for image imports

### Verification

- Run `pnpm build` to ensure no errors
- Test all pages load correctly
- Verify images are optimized in build output