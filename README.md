# NeuroFlutter

The NeuroFlutter website — a neuroscience publication and creative platform.

Next.js, TypeScript and Tailwind CSS. Everything renders to plain static
files, so it loads fast and hosts cheaply.

Articles and contributor profiles are written in **Sanity**, a web editor at
`neuroflutter.com/studio`. No code is involved in publishing.

---

## How publishing works

```
You write in Sanity  →  press Publish  →  Sanity pings Netlify
                     →  Netlify rebuilds the site  →  it is live (1–2 minutes)
```

The site is a set of pre-built HTML files rather than a live database query.
That is why there is a short wait: the pages are rebuilt rather than looked up.
In exchange the site is fast, cheap and very hard to break.

## The two sources of content

| Where | What is in it |
|---|---|
| **Sanity** | Everything written from now on |
| `src/content/` | The two articles carried over from the first version of the site |

Both appear on the site. If an article exists in both places, **Sanity wins** —
matched on the article's web address. So re-creating an old article in Sanity
simply takes over from the code version, with no URL change and no gap.

The "Set up" page inside Sanity has a button that copies the two existing
articles into Sanity for you.

## Running it on your own computer

You need Node.js (nodejs.org, the LTS version). Then, in Terminal:

```bash
cd neuroflutter
npm install     # once
npm run dev     # each time
```

Open http://localhost:3000.

To see Sanity content locally, copy `.env.example` to `.env.local` and fill in
the project id.

## Where things are

```
src/app/              One folder per page
src/components/       Header, footer, article teaser, forms
src/content/          The carried-over articles, in plain text files
src/lib/content.ts    Where the site asks for content (Sanity, then the files)
src/sanity/           Connection, queries, and translation into the site's shapes
src/app/globals.css   Colours, fonts and shared styles
studio/               The Sanity editorial dashboard
public/illustrations  The watercolour artwork
netlify.toml          How Netlify builds and serves everything
```

`public/studio/` is generated during the build. Never edit it by hand.

## Build commands

| Command | What it does |
|---|---|
| `npm run dev` | Local preview of the website |
| `npm run build` | Builds the dashboard **and** the website (what Netlify runs) |
| `npm run build:site` | Website only |
| `npm run build:studio` | Dashboard only |

The dashboard build is skipped automatically when no Sanity project id is set,
so the website always builds.

## Settings

Set on Netlify under *Site configuration → Environment variables*. See
`.env.example` for the full list and which are secret.

| Name | Secret? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Switches the CMS on |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Almost always `production` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | No | Formspree, for contributor submissions |
| `NEXT_PUBLIC_KIT_FORM_ACTION` | No | Overrides the Kit form, rarely needed |
| `SANITY_API_READ_TOKEN` | **Yes** | Preview site only — lets the build read drafts |
| `SANITY_INCLUDE_DRAFTS` | No | `true` on the preview site only |

No secret is ever sent to a visitor's browser. The Sanity project id and the
Kit form id are public identifiers by design and appear in the HTML.

## The mailing list

Kit (kit.com), form `10064287`. `src/components/Newsletter.tsx` posts to Kit
itself rather than using Kit's `ck.5.js` embed script, because that script
intercepted the submit and then rendered its result into markup this form does
not have — a signup could finish with the form silently disappearing.

With JavaScript switched off the form still posts to Kit normally.

Whether a confirmation email is required is a setting inside Kit
(*form → Settings → Confirmation Email*), not something in this code.

## The contributor form

Formspree, set through `NEXT_PUBLIC_FORM_ENDPOINT`. While that is empty the
form is visibly inactive and points people at neuroflutter@outlook.com, rather
than silently losing submissions. Formspree's free tier takes no file uploads,
so contributors send links.

## Rolling back

`_ROLLBACK-2026-10-22/` beside this folder holds the site exactly as it was
before the CMS work, with instructions. Netlify also keeps every past deploy:
*Deploys → pick one → Publish deploy*.

## Still to confirm

- [ ] Publication years on the two carried-over articles
- [ ] The privacy page sections marked `[to confirm]`
- [ ] Higher-resolution illustration files (the current ones were recovered
      from screenshots of the original site)
