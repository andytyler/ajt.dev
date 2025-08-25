import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// Default SEO values for the site - these serve as fallbacks
	// Individual pages can override these values by returning their own seo object
	// in their +page.server.ts load function
};

/**
 * SEO Best Practices Implementation:
 *
 * 1. Layout Load Function (this file):
 *    - Provides default SEO values for the entire site
 *    - Acts as fallback when pages don't specify their own SEO data
 *
 * 2. Page Load Functions (+page.server.ts):
 *    - Override specific SEO properties for individual pages
 *    - Use Partial<SEOData> to only specify what needs to change
 *    - Example: { seo: { title: 'About - AJT.dev', description: 'About page...' } }
 *
 * 3. Layout Component (+layout.svelte):
 *    - Uses $page.data to access page-specific SEO data
 *    - Falls back to layout defaults when page data is not available
 *    - Automatically generates canonical URLs based on current pathname
 *
 * This pattern follows SvelteKit's recommended approach for SEO data management
 * as outlined in the official documentation: https://kit.svelte.dev/docs/seo
 */

// Example from svelte docs for reference:
// import * as db from '$lib/server/database';
// export const load: LayoutServerLoad = async () => {
// 	return {
// 		posts: await db.getPostSummaries()
// 	};
// };
