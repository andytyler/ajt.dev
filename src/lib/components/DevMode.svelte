<script lang="ts">
	import { bio, projects, repos, interests, socials } from '$lib/data/profile';
</script>

<div class="mx-auto max-w-2xl px-6 pt-8 pb-16 font-sans">
	<!-- Logo -->
	<div class="mb-10">
		<img src="/favicon.svg" alt="ajt.dev" class="h-8 w-8" />
	</div>

	<!-- Header -->
	<header class="mb-12">
		<h1 class="font-mono text-2xl font-bold">{bio.name}</h1>
		<p class="mt-1 text-muted-foreground">{bio.title} — {bio.tagline}</p>
	</header>

	<!-- Now -->
	<section class="mb-10">
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Now</h2>
		<ul class="space-y-1.5">
			{#each bio.now as item}
				<li class="flex items-start gap-2 text-sm">
					<span class="mt-0.5 text-muted-foreground">→</span>
					<span>{item}</span>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Projects -->
	<section class="mb-10">
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Projects</h2>
		<ul class="space-y-3">
			{#each projects as project}
				<li>
					<div class="flex items-center gap-2">
						{#if project.url}
							<a href={project.url} class="font-mono text-sm font-medium underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground">{project.name}</a>
						{:else}
							<span class="font-mono text-sm font-medium">{project.name}</span>
						{/if}
						{#if project.repo}
							<a href={project.repo} class="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener">
								<span class="iconify text-sm simple-icons--github"></span>
							</a>
						{/if}
						{#each project.tags as tag}
							<span class="text-xs text-muted-foreground">{tag}</span>
						{/each}
					</div>
					<p class="mt-0.5 text-sm text-muted-foreground">{project.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Repos -->
	<section class="mb-10">
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Repos</h2>
		<ul class="space-y-2">
			{#each repos as repo}
				<li class="flex items-center gap-2">
					<span class="iconify text-sm text-muted-foreground simple-icons--github"></span>
					<a href={repo.url} class="font-mono text-sm underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground" target="_blank" rel="noopener">{repo.name}</a>
					<span class="text-xs text-muted-foreground">— {repo.description}</span>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Interests -->
	<section class="mb-10">
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Interests</h2>
		<div class="flex flex-wrap gap-x-4 gap-y-1">
			{#each interests as interest}
				<span class="text-sm">{interest.name}</span>
			{/each}
		</div>
	</section>

	<!-- Links -->
	<section>
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Links</h2>
		<div class="flex flex-wrap gap-4">
			{#each socials as social}
				<a
					href={social.url}
					class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
					target="_blank"
					rel="noopener"
				>
					{#if social.platform === 'github'}
						<span class="iconify simple-icons--github"></span>
					{:else if social.platform === 'x'}
						<span class="iconify simple-icons--x"></span>
					{:else if social.platform === 'linkedin'}
						<span class="iconify simple-icons--linkedin"></span>
					{/if}
					<span>{social.label}</span>
				</a>
			{/each}
		</div>
	</section>
</div>
