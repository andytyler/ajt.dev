<script lang="ts">
	import { page } from '$app/state';

	const defaultSEO = {
		title: 'AJT.dev - Full Stack Developer',
		description:
			'Personal website of AJT - Full Stack Developer specializing in modern web technologies, SvelteKit, and innovative digital solutions.',
		image: '/og-image.jpg',
		url: 'https://ajt.dev',
		siteName: 'AJT.dev',
		type: 'website',
		twitterCard: 'summary_large_image',
		twitterSite: '@ajt_dev'
	};

	const seodata = { ...defaultSEO, ...page.data.seo };

	const {
		title,
		description,
		image,
		url,
		siteName,
		type,
		twitterCard,
		twitterSite,
		author,
		robots,
		themeColor
	} = seodata;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="author" content={author} />
	<meta name="robots" content={robots} />
	{#if url}
		<link rel="canonical" href={url} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	{#if url}
		<meta property="og:url" content={url} />
	{/if}
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta property="twitter:card" content={twitterCard} />
	{#if url}
		<meta property="twitter:url" content={url} />
	{/if}
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	{#if image}
		<meta property="twitter:image" content={image} />
	{/if}
	{#if twitterSite}
		<meta property="twitter:site" content={twitterSite} />
	{/if}

	<!-- Additional SEO -->
	<meta name="theme-color" content={themeColor} />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</svelte:head>


