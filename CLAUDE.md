# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static single-page portfolio website** for a Data Engineer. There is no build system, package manager, or framework — everything is plain HTML, CSS, and vanilla JavaScript. All dependencies are loaded via CDN.

## Running the Project

There are no npm scripts or build steps. To preview locally, use any static file server:

```powershell
# Python (built-in)
python -m http.server 8080

# Or open index.html directly in a browser
```

## Architecture

The entire site lives in a single `index.html` (1100+ lines). The supporting files are minimal:

| File | Purpose |
|------|---------|
| `index.html` | Full page content — all sections, markup, and CDN script/link tags |
| `css/main.css` | Custom styles only; Materialize CSS loads from CDN |
| `js/main.js` | Custom interactivity only; Materialize JS loads from CDN |
| `assets/images/` | Project screenshots, logos, and background images |
| `assets/favicons/` | Favicon and PWA manifest files |

## UI Framework

**Materialize CSS** (Material Design) is the UI framework. Components like sidenav, modals, tabs, and carousel are initialized in `js/main.js` inside a `DOMContentLoaded` listener. When adding new Materialize components, their JavaScript initialization must be added there.

## Page Sections

Sections in order inside `index.html`:
1. Navbar + mobile sidenav
2. Hero — animated typing text (6 rotating phrases defined in `main.js`)
3. About Me
4. Technical Skills — card layout with progress bars
5. Experience — 4 roles at Costrategix
6. Projects — 5 featured projects with images
7. Certifications & Education
8. Footer + Go-to-Top button

## Custom JavaScript (`js/main.js`)

- Initializes Materialize components (sidenav, modal, tabs, carousel)
- Typing animation — edit the `phrases` array to change rotating hero text
- Carousel auto-rotates every 3 seconds, pauses on hover
- Go-to-Top button appears after 300px scroll

## Deployment

Static hosting only — no server required. The site is deployed via GitHub Pages or similar.
1. Remote: `https://github.com/shaikmalikbasha/portfolio.git`
2. GitHub Page: `https://shaikmalikbasha.github.io/portfolio/index.html`
