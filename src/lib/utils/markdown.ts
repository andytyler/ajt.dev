function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function sanitizeUrl(url: string): string {
	const trimmed = url.trim();
	if (/^(https?:\/\/|mailto:|\/)/i.test(trimmed)) {
		return trimmed;
	}
	return '#';
}

function toIconTarget(url: string): string {
	if (url === '#') {
		return 'https://ajt.dev';
	}
	if (url.startsWith('/')) {
		return `https://ajt.dev${url}`;
	}
	return url;
}

function getIconUrl(url: string): string {
	return `https://geticon.io/img?url=${toIconTarget(url)}&size=256`;
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^),\s]+)(?:,\s*([^)\s]+))?(?:\s+(?:"([^"]*)"|'([^']*)'))?\)/g;
const SINGLE_LINK_PATTERN = /^\[([^\]]+)\]\(([^),\s]+)(?:,\s*([^)\s]+))?(?:\s+(?:"([^"]*)"|'([^']*)'))?\)$/;

function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

function parseLinkTitleMeta(rawTitle?: string): { classes: string[]; cleanTitle?: string } {
	if (!rawTitle) {
		return { classes: [] };
	}

	const tokens = rawTitle.trim().split(/\s+/);
	const classes = new Set<string>();
	const remaining: string[] = [];

	for (const token of tokens) {
		const normalized = token.toLowerCase();
		if (normalized === 'icon-lg' || normalized === 'link-lg' || normalized === 'lg') {
			classes.add('link-size-lg');
			continue;
		}
		if (normalized === 'icon-sm' || normalized === 'link-sm' || normalized === 'sm') {
			classes.add('link-size-sm');
			continue;
		}
		remaining.push(token);
	}

	const cleanTitle = remaining.join(' ').trim();
	return {
		classes: [...classes],
		cleanTitle: cleanTitle.length > 0 ? cleanTitle : undefined
	};
}

function renderMarkdownLink(
	label: string,
	href: string,
	rawTitle?: string,
	iconUrl?: string
): string {
	const url = sanitizeUrl(href);
	const external = /^https?:\/\//i.test(url);
	const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
	const { classes, cleanTitle } = parseLinkTitleMeta(rawTitle);
	const classAttr = ['dev-link', ...classes].join(' ');
	const titleAttr = cleanTitle ? ` title="${escapeHtml(cleanTitle)}"` : '';
	const iconSrc = getIconUrl(iconUrl ? sanitizeUrl(iconUrl) : url);
	const icon = `<img src="${escapeHtml(iconSrc)}" alt="" class="dev-link-icon" loading="lazy" decoding="async" />`;
	return `<a href="${escapeHtml(url)}" class="${classAttr}"${titleAttr}${attrs}>${icon}<span>${escapeHtml(label)}</span></a>`;
}

function parseSingleLinkItem(item: string): { classes: string[] } | null {
	const match = item.trim().match(SINGLE_LINK_PATTERN);
	if (!match) {
		return null;
	}
	const { classes } = parseLinkTitleMeta(match[4] ?? match[5]);
	return { classes };
}

function highlightNumbersInHtml(html: string): string {
	const numberPattern = /\b\d[\d,]*(?:\.\d+)?(?:[kKmMbB])?\+?%?\b/g;
	return html
		.split(/(<[^>]+>)/g)
		.map((part) =>
			part.startsWith('<') ? part : part.replace(numberPattern, '<span class="dev-num">$&</span>')
		)
		.join('');
}

function renderInline(text: string): string {
	const htmlTokens: string[] = [];
	const toToken = (html: string): string => {
		const token = `__HTML_${htmlTokens.length}__`;
		htmlTokens.push(html);
		return token;
	};

	let value = text.replace(/`([^`]+)`/g, (_match, code: string) =>
		toToken(`<code>${escapeHtml(code)}</code>`)
	);

	value = value.replace(
		LINK_PATTERN,
		(
			_match,
			label: string,
			href: string,
			iconUrl: string | undefined,
			doubleQuotedTitle?: string,
			singleQuotedTitle?: string
		) =>
			toToken(
				renderMarkdownLink(label, href, doubleQuotedTitle ?? singleQuotedTitle, iconUrl)
			)
	);

	value = escapeHtml(value);

	value = value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	value = value.replace(/\*([^*]+)\*/g, '<em>$1</em>');
	value = value.replace(/~~([^~]+)~~/g, '<del>$1</del>');
	value = value.replace(/(?<![~])~([^~]+)~(?!~)/g, '<del>$1</del>');

	for (let index = 0; index < htmlTokens.length; index += 1) {
		value = value.replaceAll(`__HTML_${index}__`, htmlTokens[index]);
	}

	return highlightNumbersInHtml(value);
}

export function markdownToHtml(markdown: string): string {
	const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
	const chunks: string[] = [];
	let paragraphLines: string[] = [];
	let listItems: string[] = [];
	let listType: 'ul' | 'ol' | null = null;

	const flushParagraph = () => {
		if (paragraphLines.length === 0) {
			return;
		}

		chunks.push(`<p>${renderInline(paragraphLines.join(' '))}</p>`);
		paragraphLines = [];
	};

	const flushList = () => {
		if (listItems.length === 0) {
			return;
		}

		const parsedLinkItems = listItems.map(parseSingleLinkItem);
		const isLinkOnlyList = parsedLinkItems.every((item) => item !== null);
		const hasLargeLinks =
			isLinkOnlyList && parsedLinkItems.some((item) => item?.classes.includes('link-size-lg'));

		const items = listItems.map((item) => `<li>${renderInline(item)}</li>`).join('');
		const tag = listType ?? 'ul';
		const classNames = [
			isLinkOnlyList ? 'link-list' : '',
			hasLargeLinks ? 'link-list-lg' : ''
		].filter(Boolean);
		const classAttr = classNames.length > 0 ? ` class="${classNames.join(' ')}"` : '';
		chunks.push(`<${tag}${classAttr}>${items}</${tag}>`);
		listItems = [];
		listType = null;
	};

	const flushBlocks = () => {
		flushParagraph();
		flushList();
	};

	for (const line of lines) {
		const trimmed = line.trim();

		if (trimmed.length === 0) {
			flushBlocks();
			continue;
		}

		const htmlCommentMatch = trimmed.match(/^<!--\s*(.*?)\s*-->$/);
		if (htmlCommentMatch) {
			flushBlocks();
			const commentText = htmlCommentMatch[1];
			chunks.push(`<p class="dev-comment">// ${escapeHtml(commentText)}</p>`);
			continue;
		}

		const slashCommentMatch = trimmed.match(/^\/\/\s*(.*)$/);
		if (slashCommentMatch) {
			flushBlocks();
			const commentText = slashCommentMatch[1];
			chunks.push(`<p class="dev-comment">// ${escapeHtml(commentText)}</p>`);
			continue;
		}

		const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
		if (headingMatch) {
			flushBlocks();
			const level = headingMatch[1].length;
			const headingText = headingMatch[2].trim();
			const headingId = slugify(headingText);
			chunks.push(`<h${level} id="${headingId}">${renderInline(headingText)}</h${level}>`);
			continue;
		}

		if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
			flushBlocks();
			chunks.push('<hr />');
			continue;
		}

		const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
		const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
		if (unorderedMatch || orderedMatch) {
			flushParagraph();
			const nextListType: 'ul' | 'ol' = unorderedMatch ? 'ul' : 'ol';
			const value = unorderedMatch ? unorderedMatch[1] : orderedMatch![1];
			if (listType && listType !== nextListType) {
				flushList();
			}
			listType = nextListType;
			listItems.push(value);
			continue;
		}

		paragraphLines.push(trimmed);
	}

	flushBlocks();
	return chunks.join('\n');
}
