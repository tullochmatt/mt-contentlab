# MT ContentLab

**An interactive mini-CMS and product management portfolio prototype.**

MT ContentLab models a small portion of the editorial content lifecycle: creating a structured content record, moving it through review, planning a release, and inspecting a reader-facing preview. It is an **independent, fictional project**, not a reproduction of any employer platform, workflow, data, or code.

## Try it locally

1. Download or clone the repository.
2. Open `index.html` in a current browser. No dependencies, build step, or account required.
3. Create, edit, filter, review, preview, import, or export sample records.

You can also run `python3 -m http.server 8000` inside the folder and open `http://localhost:8000`.

## What works in v1

- **Content library:** Search titles, summaries, owners, sections and tags; filter by type/status; sort by update time or title.
- **Structured authoring:** Edit title, slug, content type, section, summary, body, owner, tags, workflow status, and planned publish date.
- **Workflow:** Track items in `Draft`, `In review`, `Scheduled`, or `Published`, with light validation before moving content beyond draft.
- **Review queue and overview:** Workload counts, status distribution, and items awaiting review.
- **Reader preview:** View content in a simplified reading experience.
- **Portable demo data:** Seeded fictional records, local browser persistence, JSON import/export, and reset.
- **Responsive interface:** Works at desktop and mobile widths; keyboard-navigable native dialogs and labeled controls.

## Important limitations

This is a **front-end prototype, not a hosted CMS service**. Data stays in the current browser's `localStorage`, so changes are not shared across devices or visitors. Publishing and scheduling are *workflow labels only*: there is **no backend, authentication, actual publication, scheduled job, collaboration, AI, or server-side storage**. GitHub Pages serves static files and does not persist changes to the repository. Use **Export data** before clearing browser storage.

## Product thinking

The most important part of the repository is the reasoning behind the prototype:

- [Product brief](docs/PRODUCT_BRIEF.md): user problem, audience, goals, scope, assumptions, and success metrics.
- [Decision log](docs/DECISIONS.md): tradeoffs and why the implementation is deliberately small.
- [Roadmap](docs/ROADMAP.md): next iterations and sample acceptance criteria.

The prototype's goal is to start a conversation about **content models, editorial workflows, findability, operational quality, and prioritization**, not to present itself as an enterprise-grade CMS.

## Project layout

```text
mt-contentlab/
├── index.html             # Interface and accessible dialog forms
├── styles.css             # Responsive design system
├── app.js                 # Demo data, state, rendering, workflow
├── favicon.svg            # Project icon
├── docs/
│   ├── PRODUCT_BRIEF.md
│   ├── DECISIONS.md
│   └── ROADMAP.md
└── README.md
```

## Publish to GitHub Pages

1. Create a **new personal repository** named `mt-contentlab`, ideally public if you want hiring managers to see the source.
2. Add the files in this directory to the repository root. Keep the `docs/` folder as-is.
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, then `main` and `/ (root)`. Save.
5. The public demo URL will typically be `https://YOUR-USERNAME.github.io/mt-contentlab/` after deployment. Replace `YOUR-USERNAME` with your GitHub handle.

GitHub's official instructions: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>.

**Work-account caution:** If you use GitHub through an employer's organization or a managed account, confirm that the project is published from a **personal repository under your control**, not an employer-owned organization. Do not copy workplace content, code, screenshots, tickets, or proprietary requirements into the repository.

## A suggested portfolio description

> **MT ContentLab — Independent product prototype.** A lightweight content workflow application illustrating structured authoring, review states, metadata search, and publishing readiness. Includes a brief product specification, design tradeoffs, and a prioritized roadmap. Built as a static, browser-based demo using fictional content.

## Technology

Plain HTML, CSS, and modern JavaScript, with browser localStorage. No dependency installation, analytics tracking, external APIs, or backend. The interface uses local system-font fallbacks; no external font service is required.
