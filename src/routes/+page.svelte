<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<pre>{JSON.stringify(page.data, null, 2)}</pre>
