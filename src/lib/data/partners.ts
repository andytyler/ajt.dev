export type Partner = {
	name: string;
	logo?: string;
	url: string;
	contribution: string; // "Venue partner", "Developer tools"
};

export const partners: Partner[] = [
	{
		name: 'Founders House',
		logo: '/sponsors/founders-house.svg',
		url: 'https://foundershouse.co',
		contribution: 'Venue partner'
	},
	{
		name: 'Future House',
		logo: '/sponsors/future-house.svg',
		url: '',
		contribution: 'Venue partner'
	},
	{
		name: 'London Founder House',
		logo: '/sponsors/london-founder-house.svg',
		url: '',
		contribution: 'Venue partner'
	}
];
