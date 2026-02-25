export type SponsorTier = 'headline' | 'partner' | 'community';

export type Sponsor = {
	name: string;
	url: string;
	tier: SponsorTier;
	logo?: string;
	tagline?: string;
};

export const sponsors: Sponsor[] = [
	{
		name: 'Anthropic',
		url: 'https://anthropic.com',
		tier: 'headline',
		logo: '/sponsors/anthropic.svg',
		tagline: 'AI research and safety'
	},
	{
		name: 'Vercel',
		url: 'https://vercel.com',
		tier: 'partner',
		logo: '/sponsors/vercel.svg',
		tagline: 'Frontend cloud platform'
	},
	{
		name: 'Supabase',
		url: 'https://supabase.com',
		tier: 'partner',
		logo: '/sponsors/supabase.svg',
		tagline: 'Open source Firebase alternative'
	},
	{
		name: 'Atla',
		url: 'https://atla-ai.com',
		tier: 'community',
		logo: '/sponsors/atla.svg',
		tagline: 'AI evaluation platform'
	},
	{
		name: 'Founders House',
		url: 'https://foundershouse.co',
		tier: 'community',
		logo: '/sponsors/founders-house.svg',
		tagline: 'London co-working'
	}
];

export const pastSponsors: Sponsor[] = [
	{
		name: 'Future House',
		url: '',
		tier: 'partner',
		logo: '/sponsors/future-house.svg',
		tagline: 'Venue partner'
	},
	{
		name: 'London Founder House',
		url: '',
		tier: 'partner',
		logo: '/sponsors/london-founder-house.svg',
		tagline: 'Venue partner'
	}
];

export const sponsorLinkedIn = 'https://linkedin.com/in/ajt.dev';
