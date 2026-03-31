# createMPLS Site

Static multi-page site for createMPLS, a Minneapolis STEM nonprofit focused on students underserved by the tech-education system.

## Purpose

This version is intentionally framework-free. The goal is to make the site feel custom and maintainable before any Git tracking, deployment workflow, or static-site tooling is added.

## Structure

- `index.html`, `about.html`, `programs.html`, `get-involved.html`, `contact.html`: public pages
- `assets/css/site.css`: shared visual system and responsive layout rules
- `assets/js/site.js`: shared navigation, reveal, counter, and form behavior
- `assets/img/`: placeholder art and future image assets
- `docs/site-architecture.md`: page purpose, hierarchy, and shared conventions
- `docs/content-guide.md`: voice, terminology, and fact-verification notes

## Local Viewing

Open the HTML files directly for quick checks, or run a simple local server so relative links and form behavior are easier to inspect:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Maintenance Workflow

1. Update shared presentation in `assets/css/site.css` instead of editing page-level styles.
2. Update shared behavior in `assets/js/site.js` instead of adding inline scripts.
3. Keep page copy inside the existing `data-content-block` sections so edits stay predictable.
4. Treat current metrics and historical claims as provisional until they are verified against source material.
5. Before publishing, verify:
   - internal page links
   - Givebutter donation links
   - `mailto:` links
   - the FormSubmit endpoint on the contact form

## Current Assumptions

- The five-page information architecture remains the v1 site map.
- The current Givebutter and FormSubmit integrations stay in place for now.
- Placeholder illustrations are acceptable until real photos or brand assets are available.
- Some public facts inherited from the previous site still need confirmation before a wider launch.
