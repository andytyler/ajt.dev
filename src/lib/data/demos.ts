export type Demo = {
	name: string;
	title: string;
	description: string;
	projectUrl: string;
	date: string; // ISO 8601
};

export type DemoNightEvent = {
	number: number;
	date: string;
	venue?: string;
	lumaUrl?: string;
	demos: Demo[];
};

export const nextEvent = {
	number: 9,
	date: '2026-02-17',
	lumaUrl: 'https://luma.com/ejtr9u92'
};

// Format: 4-min live demo + 4-min Q&A. NO SLIDES — live demos only!
export const events: DemoNightEvent[] = [
	{
		number: 6,
		date: '2025-09-01',
		venue: 'London',
		lumaUrl: 'https://lu.ma/7is6tfp1',
		demos: [
			// TODO: demoer details not tracked in Notion for Sep 2025
		]
	},
	{
		number: 5,
		date: '2025-08-01',
		venue: 'London',
		demos: [
			{
				name: 'Henry Broomfield',
				title: 'Atla',
				description: 'Agentic evals and dynamic failure patterns.',
				projectUrl: 'https://app.atla-ai.com',
				date: '2025-08-01'
			}
		]
	},
	{
		number: 4,
		date: '2025-07-01',
		venue: 'London',
		demos: [
			{
				name: 'Kindred Salway',
				title: 'ventrue',
				description: 'Helping engineers replace project managers.',
				projectUrl: '',
				date: '2025-07-01'
			},
			{
				name: 'Antoine Descamps',
				title: 'Error Context Collector',
				description: 'AI Debugger — an IDE extension for intelligent error context.',
				projectUrl: 'https://open-vsx.org/extension/dant2021/error-context-collector',
				date: '2025-07-01'
			}
		]
	},
	{
		number: 3,
		date: '2025-01-01',
		venue: 'London Founder House',
		lumaUrl: 'https://lu.ma/2yalskw2',
		demos: [
			// TODO: demoer details not tracked in Notion for Jan 2025
		]
	},
	{
		number: 2,
		date: '2024-09-01',
		venue: 'Future House',
		lumaUrl: 'https://lu.ma/7is6tfp1',
		demos: [
			// TODO: demoer details not tracked in Notion for Sep 2024
		]
	},
	{
		number: 1,
		date: '2024-08-01',
		venue: 'Future House',
		lumaUrl: 'https://lu.ma/fh-demo-night-1',
		demos: [
			// TODO: demoer details not tracked in Notion for Aug 2024
		]
	}
];

export const allDemos: Demo[] = events
	.flatMap((event) => event.demos)
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
