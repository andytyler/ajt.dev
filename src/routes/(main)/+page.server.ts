import type { SEOData } from '$lib/utils/seo/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const seo: Partial<SEOData> = {
		title: 'Full Stack AI Product Engineer & Technical Founder',
		description: 'Software Engineer & AI Tinkerer, prev-Product Manager.',
		url: 'https://ajt.dev'
	};

	return {
		seo
	};
};
