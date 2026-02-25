export type AttendeeCompany = {
	name: string;
	wordmark?: string; // path to SVG in /static/wordmarks/, optional — falls back to text
};

export const attendeeCompanies: AttendeeCompany[] = [
	{ name: 'Anthropic' },
	{ name: 'OpenAI' },
	{ name: 'Google DeepMind' },
	{ name: 'xAI' },
	{ name: 'Meta' },
	{ name: 'Amazon' },
	{ name: 'Microsoft' }
];
