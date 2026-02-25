export type Project = {
	name: string;
	description: string;
	url?: string;
	repo?: string;
	tags: string[];
};

export type Repo = {
	name: string;
	description: string;
	url: string;
};

export type SocialLink = {
	platform: string;
	url: string;
	label: string;
};

export type Interest = {
	name: string;
	icon?: string;
};

export const bio = {
	name: 'Andy Tyler',
	title: 'Software Engineer',
	tagline: 'building at the intersection of AI and product',
	now: [
		'Running AI Demo Nights London — a monthly showcase for AI builders',
		'Building developer tools and AI-powered products',
		'Writing about SvelteKit, TypeScript, and the AI ecosystem'
	]
};

export const projects: Project[] = [
	{
		name: 'AI Demo Nights',
		description: 'Monthly London meetup showcasing AI demos from builders at Anthropic, OpenAI, Google DeepMind, and more',
		url: '/aidemonights',
		tags: ['community', 'AI']
	},
	{
		name: 'ajt.dev',
		description: 'This site — built with SvelteKit, Tailwind, and deployed on Vercel',
		repo: 'https://github.com/andytyler/ajt.dev',
		tags: ['SvelteKit', 'TypeScript']
	}
];

export const repos: Repo[] = [
	{
		name: 'ajt.dev',
		description: 'Personal site and AI Demo Nights hub',
		url: 'https://github.com/andytyler/ajt.dev'
	}
];

export const interests: Interest[] = [
	{ name: 'AI agents & tooling' },
	{ name: 'Developer experience' },
	{ name: 'SvelteKit & frontend craft' },
	{ name: 'Voice AI' },
	{ name: 'Product engineering' }
];

export const socials: SocialLink[] = [
	{ platform: 'github', url: 'https://github.com/andytyler', label: 'GitHub' },
	{ platform: 'x', url: 'https://x.com/ajtdev', label: 'X' },
	{ platform: 'linkedin', url: 'https://linkedin.com/in/ajt.dev', label: 'LinkedIn' }
];
