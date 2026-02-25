export type AffiliationTag = {
	label: string; // "YC W25", "Sequoia-backed"
	icon?: string; // optional path to small icon
};

export type CommunityCompany = {
	name: string;
	logo?: string; // path to logo SVG in /static/community/
	oneLiner: string; // max ~50 chars
	affiliation?: AffiliationTag;
	featured?: boolean; // true = shows on main page preview
	founderName?: string;
};

export const communityCompanies: CommunityCompany[] = [
	{
		name: 'Atla',
		logo: '/sponsors/atla.svg',
		oneLiner: 'AI evaluation platform for LLM systems',
		affiliation: { label: 'YC W25' },
		featured: true,
		founderName: 'Henry Broomfield'
	},
	{
		name: 'ventrue',
		oneLiner: 'Helping engineers replace project managers',
		featured: true,
		founderName: 'Kindred Salway'
	}
];

export const featuredCompanies = communityCompanies.filter((c) => c.featured);
