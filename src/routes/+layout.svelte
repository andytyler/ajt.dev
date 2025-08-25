<script lang="ts">
	import SEO from '$lib/utils/seo/SEO.svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';

	let { data, children }: { data: LayoutServerData; children: any } = $props();
</script>

<SEO />

<main>
	{@render children()}
</main>

<!-- From svelte docs
 
import * as db from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		posts: await db.getPostSummaries()
	};
};

-->
