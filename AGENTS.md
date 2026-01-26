# AGENTS.md - Developer & AI Agent Guide

> **Purpose**: This document provides exact commands, architecture overview, and conventions for developers and AI agents working on this project.

---

## 📦 Build & Test

### Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Run Astro CLI commands
pnpm astro [command]
```

### Build Output Verification

After running `pnpm build`, verify:

```bash
# Check build artifacts
ls -la dist/

# Expected output structure:
# dist/
# ├── _astro/           # Compiled CSS, JS, optimized images
# ├── ~partytown/       # Third-party script optimization
# ├── index.html        # Homepage
# ├── about/index.html  # About page
# ├── robots.txt        # SEO robots file
# ├── sitemap-index.xml # Sitemap index
# └── sitemap-0.xml     # Sitemap entries
```

### Testing Checklist

**Manual Testing** (no automated tests currently):

1. **Build Success**: `pnpm build` completes without errors
2. **SEO Verification**: Check `dist/index.html` contains:
   - `<title>` tag
   - `<meta name="description">`
   - `<link rel="canonical">`
   - `<script type="application/ld+json">` (Schema.org)
3. **Sitemap**: Verify `dist/sitemap-index.xml` exists
4. **Robots.txt**: Verify `dist/robots.txt` exists
5. **Images**: Check `dist/_astro/` contains optimized images
6. **CSS**: Verify Tailwind CSS compiled in `dist/_astro/*.css`

### Performance Testing

```bash
# Build and preview
pnpm build && pnpm preview

# Test with Lighthouse (Chrome DevTools)
# Target scores:
# - Performance: 90+
# - Accessibility: 90+
# - Best Practices: 90+
# - SEO: 100
```

---

## 🏗️ Architecture Overview

### Project Structure

```
dev-foundry-static/
├── src/
│   ├── assets/          # Static assets (images, SVGs)
│   ├── components/      # Reusable UI components
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── config/          # Site configuration
│   │   └── site.ts      # Global site config & base schemas
│   ├── layouts/         # Layout components (two-tier system)
│   │   ├── TechnicalLayout.astro  # SEO, meta, schema (base)
│   │   └── SiteLayout.astro       # UI, header, footer (presentation)
│   ├── pages/           # File-based routing
│   │   ├── index.astro  # Homepage (/)
│   │   └── about.astro  # About page (/about)
│   └── styles/          # Global styles
│       └── global.css   # Tailwind CSS imports
├── public/              # Static files (copied as-is to dist/)
│   └── favicon.svg
├── dist/                # Build output (generated, gitignored)
├── astro.config.mjs     # Astro configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables (gitignored)
```

### Two-Tier Layout System

**Architecture Flow**:
```
Page (index.astro)
    ↓ uses
SiteLayout.astro (Presentation Layer)
    ↓ wraps
TechnicalLayout.astro (Technical Layer)
    ↓ outputs
HTML with SEO, Meta Tags, Schema.org
```

**TechnicalLayout.astro** (Base/Inner):
- Handles: SEO meta tags, Schema.org, fonts, global CSS
- Slots: `seo`, `schema`, default (content)
- **Never modify for styling** - only for infrastructure changes

**SiteLayout.astro** (Presentation/Outer):
- Handles: Header, Footer, page structure, UI components
- Props: `metadata` (title, description, schema), layout options
- **Modify for style branches** - this is where UI changes happen

### Key Modules

**1. SEO System** (`src/layouts/TechnicalLayout.astro`)
- Base Schema.org (Organization, WebSite) via `src/config/site.ts`
- Named slots for page-specific SEO and schema
- Font optimization with Astro experimental fonts

**2. Metadata API** (`src/layouts/SiteLayout.astro`)
- Simple prop interface: `metadata: { title, description, schema }`
- Automatic canonical URL generation
- Robots meta tag control

**3. Image Optimization** (Astro built-in)
- Uses `astro:assets` Image component
- Automatic responsive images (srcset)
- Sharp for image processing

**4. Schema Configuration** (`src/config/site.ts`)
- `siteConfig`: Global site name and description
- `getBaseSchemas()`: Returns Organization + WebSite schemas
- Minimal base schemas to avoid page-level conflicts

---

## 🔒 Security

### Environment Variables

**Sensitive Data**:
- `.env` file is gitignored (never commit)
- `.env.example` provides template

**Current Variables**:
```bash
SITE_URL=https://yourdomain.com  # Used for sitemap, canonical URLs, schema
```

**Adding New Variables**:
1. Add to `.env.example` with placeholder value
2. Add to `.env` with actual value
3. Access in code: `import.meta.env.VARIABLE_NAME`
4. Document in this section

### API Keys & Secrets

**Current State**: No API keys or secrets required

**If Adding APIs**:
- Store keys in `.env` (never hardcode)
- Use `import.meta.env.PUBLIC_*` for client-side keys
- Use `import.meta.env.*` (no PUBLIC prefix) for server-side only
- Never commit `.env` to git

### Authentication Flows

**Current State**: No authentication implemented (static site)

**If Adding Auth**:
- Consider Astro middleware for protected routes
- Use environment variables for auth secrets
- Document auth flow in this section

### Content Security

**Static Site Security**:
- No server-side code execution
- No database connections
- No user input processing
- All content is pre-rendered at build time

**Third-Party Scripts**:
- Partytown integration isolates third-party scripts
- Review all external scripts before adding

---

## 🌿 Git Workflows

### Branching Strategy

**Main Branch**: `main`
- Production-ready code
- Technical infrastructure only
- No style-specific code

**Style Branches**: `feature/shadcn-ui`, `feature/preline-ui`
- UI library implementations
- Modify `SiteLayout.astro`, components, styles
- Keep `TechnicalLayout.astro` unchanged
- Merge infrastructure changes from `main` regularly

**Feature Branches**: `feature/[feature-name]`
- New features or enhancements
- Branch from `main` or style branch as appropriate
- Delete after merge

**Hotfix Branches**: `hotfix/[issue-name]`
- Critical bug fixes
- Branch from `main`
- Merge to `main` and all style branches

### Branch Naming Conventions

```bash
feature/[feature-name]   # New features (e.g., feature/contact-form)
bugfix/[bug-name]        # Bug fixes (e.g., bugfix/mobile-nav)
hotfix/[issue-name]      # Critical fixes (e.g., hotfix/seo-meta)
chore/[task-name]        # Maintenance (e.g., chore/update-deps)
docs/[doc-name]          # Documentation (e.g., docs/api-guide)
```

### Commit Conventions

**Format**: `type(scope): message`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```bash
feat(seo): add LocalBusiness schema to homepage
fix(header): correct mobile menu toggle behavior
docs(readme): update installation instructions
style(footer): improve responsive layout
refactor(layouts): simplify metadata prop interface
perf(images): optimize hero image loading
chore(deps): update Astro to v5.14.7
```

### Pull Request Requirements

**Before Creating PR**:
1. Run `pnpm build` - must succeed
2. Test locally with `pnpm preview`
3. Verify no console errors
4. Check SEO meta tags in built HTML
5. Update documentation if needed

**PR Template**:
```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Build succeeds (`pnpm build`)
- [ ] Preview tested (`pnpm preview`)
- [ ] SEO meta tags verified
- [ ] Images optimized
- [ ] No console errors

## Screenshots (if applicable)
[Add screenshots]
```

**Review Checklist**:
- Code follows conventions (see below)
- No breaking changes to `TechnicalLayout.astro` (unless infrastructure update)
- Documentation updated
- Build succeeds
- No new dependencies without justification

---

## 📐 Conventions & Patterns

### Naming Conventions

**Files & Folders**:
- Components: `PascalCase.astro` (e.g., `Header.astro`, `SiteLayout.astro`)
- Pages: `lowercase.astro` (e.g., `index.astro`, `about.astro`)
- Config files: `lowercase.ts` (e.g., `site.ts`)
- Folders: `lowercase` (e.g., `components/`, `layouts/`)

**Variables & Functions**:
- Variables: `camelCase` (e.g., `siteConfig`, `currentYear`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `SITE_URL`)
- Functions: `camelCase` (e.g., `getBaseSchemas()`)
- Types/Interfaces: `PascalCase` (e.g., `SiteConfig`, `Props`)

### Folder Layout

**Component Organization**:
```
src/components/
├── Header.astro       # Global header
├── Footer.astro       # Global footer
└── [feature]/         # Feature-specific components (future)
    └── ServiceCard.astro
```

**Page Organization**:
```
src/pages/
├── index.astro        # Homepage (/)
├── about.astro        # About (/about)
└── services/          # Services section (/services/*)
    ├── index.astro    # Services listing (/services)
    └── [slug].astro   # Dynamic service pages (/services/plumbing)
```

### Code Style

**Astro Components**:
```astro
---
/**
 * ComponentName.astro - Brief description
 * 
 * Detailed description of component purpose and usage.
 */

// Imports
import Layout from '../layouts/SiteLayout.astro';

// Props interface
interface Props {
  title: string;
  description?: string;
}

// Destructure props with defaults
const { title, description = 'Default description' } = Astro.props;

// Logic and data fetching
const currentYear = new Date().getFullYear();
---

<!-- HTML template -->
<div class="container">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>

<style>
  /* Component-scoped styles (if needed) */
  /* Prefer Tailwind utility classes */
</style>
```

**TypeScript**:
- Use strict mode (configured in `tsconfig.json`)
- Define interfaces for all props
- Use type inference where possible
- Avoid `any` type

**CSS/Tailwind**:
- Prefer Tailwind utility classes over custom CSS
- Use `global.css` only for Tailwind imports and global resets
- Component-scoped styles only when necessary
- Follow mobile-first responsive design

### Import Patterns

**Path Aliases** (configured in `astro.config.mjs` and `tsconfig.json`):
```typescript
// Use aliases for cleaner imports
import Header from '@components/Header.astro';
import { siteConfig } from '@/config/site';
import logo from '@assets/logo.svg';

// Instead of:
import Header from '../../../components/Header.astro';
```

**Import Order**:
1. Astro/framework imports
2. Third-party libraries
3. Local components
4. Local utilities/config
5. Assets (images, styles)

### SEO & Schema Patterns

**Page Metadata**:
```astro
---
import SiteLayout from '@layouts/SiteLayout.astro';

const metadata = {
  title: 'Page Title - Site Name',
  description: 'Page description for SEO',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Page Title',
    description: 'Page description'
  }
};
---

<SiteLayout metadata={metadata}>
  <!-- Page content -->
</SiteLayout>
```

**Schema Best Practices**:
- Keep base schemas minimal (Organization, WebSite only)
- Add page-specific schemas via `metadata.schema`
- Use proper `@type` for content (WebPage, Service, FAQPage, etc.)
- Include all required properties per schema.org spec

### Performance Patterns

**Image Optimization**:
```astro
---
import { Image } from 'astro:assets';
import heroImage from '@assets/hero.jpg';
---

<!-- Above-the-fold images -->
<Image 
  src={heroImage}
  alt="Description"
  loading="eager"
  fetchpriority="high"
  widths={[400, 800, 1200, 1600]}
  sizes="100vw"
/>

<!-- Below-the-fold images -->
<Image 
  src={otherImage}
  alt="Description"
  loading="lazy"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Font Loading**:
- Use Astro experimental fonts (configured in `astro.config.mjs`)
- Fonts are automatically optimized with fallbacks
- No manual font loading required

---

## 🚀 Quick Reference

### Adding a New Page

1. Create file in `src/pages/` (e.g., `services.astro`)
2. Import `SiteLayout` and define metadata
3. Add page content
4. Build and verify sitemap includes new page

### Adding a New Component

1. Create file in `src/components/` (e.g., `ServiceCard.astro`)
2. Define Props interface
3. Add component logic and template
4. Import and use in pages

### Updating Site Configuration

1. Edit `src/config/site.ts` for global settings
2. Edit `.env` for environment-specific values
3. Rebuild to apply changes

### Troubleshooting

**Build Fails**:
- Check `pnpm install` completed successfully
- Verify all imports are correct
- Check for TypeScript errors

**Sitemap Not Generating**:
- Verify `site` is set in `astro.config.mjs` or `.env`
- Check pages are in `src/pages/` directory

**Images Not Optimizing**:
- Ensure Sharp is installed (`pnpm install sharp`)
- Use `Image` component from `astro:assets`
- Check image imports are correct

---

**Last Updated**: 2025-10-20  
**Maintainer**: Dev Foundry Team

