// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import robotsTxt from 'astro-robots-txt';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

const rawBasePath = (process.env.BASE_PATH ?? '').trim();
const base = rawBasePath
  ? (rawBasePath.startsWith('/') ? rawBasePath : `/${rawBasePath}`).replace(/\/+$/, '')
  : '/';

// https://astro.build/config
export default defineConfig({
  // Site URL - Required for sitemap and robots.txt generation
  // Use environment variable for single source of truth; falls back to example.com
  site: process.env.SITE_URL ?? 'https://example.com', // e.g. SITE_URL=https://yourdomain.com

  // Environment-based configuration
  output: 'static',
  trailingSlash: 'never',
  base,

  // Astro integrations
  integrations: [
    sitemap(),
    partytown(),
    robotsTxt(),
    icon({
    include: {
      tabler: ['*'],
      },
    }),
  ],
  // Vite bundle rollup
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@assets': '/src/assets',
      },
    },
  },
  // Experimental plugins
  experimental: {
    fonts: [{
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter"
    },
    {
        provider: fontProviders.google(),
        name: "Playfair Display",
        cssVariable: "--font-playfair"
    }]
  }
});