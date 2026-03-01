# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## OG Image

Generate OG variants from the dedicated route (`/og/product?variant=...`) with:

```sh
npm install -D puppeteer-core
npm run og:build
```

This creates:

- `static/og-image-premium.jpg`
- `static/og-image-techy.jpg`
- `static/og-image-playful.jpg`
- `static/og-image-engineer.jpg`
- `static/og-image.jpg` (default alias; premium unless overridden)

Variant preview URLs in dev:

- `http://127.0.0.1:5173/og/product?variant=premium`
- `http://127.0.0.1:5173/og/product?variant=techy`
- `http://127.0.0.1:5173/og/product?variant=playful`
- `http://127.0.0.1:5173/og/product?variant=engineer`

To choose the default alias:

```sh
OG_DEFAULT_VARIANT=techy npm run og:build
```

To generate a subset:

```sh
OG_VARIANTS=playful,techy,engineer npm run og:build
```

If Chrome/Chromium is not auto-detected, set `PUPPETEER_EXECUTABLE_PATH`:

```sh
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run og:build
```
