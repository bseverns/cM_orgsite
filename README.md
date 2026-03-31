# createMPLS Site

Static multi-page site for createMPLS, a Minneapolis nonprofit focused on no-cost, hands-on STEM programs for students through school and community partnerships.

## Purpose

This version is intentionally framework-free. The current content direction is meant to keep the public site calm, local, and maintainable while reflecting the organization's operating reality more accurately: youth-facing programs first, partner-first navigation, and less campaign-style language.

## Structure

- `index.html`, `about.html`, `programs.html`, `get-involved.html`, `contact.html`: public pages
- `assets/css/site.css`: shared visual system and responsive layout rules
- `assets/js/site.js`: shared navigation, reveal, counter, and form behavior
- `assets/img/`: placeholder art and future image assets
- `docs/site-architecture.md`: page purpose, hierarchy, CTA priority, and editorial boundaries
- `docs/content-guide.md`: voice, terminology, and fact-discipline notes

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
4. Treat metrics, awards, and specific community lists as provisional until they are verified against source material.
5. Before publishing, verify:
   - internal page links
   - Givebutter donation links
   - `mailto:` links
   - the FormSubmit endpoint on the contact form

## Editorial Notes

- The public site now centers youth-facing STEM programming rather than educator-training or conference-style messaging.
- School and community partnerships are the primary CTA path across the site.
- "Tech Together" style campaign framing has been removed from the public-facing copy.
- Provisional trust markers were softened or removed so the site does not depend on unverified numbers or accolades.

## Current Assumptions

- The five-page information architecture remains the v1 site map.
- The current Givebutter and FormSubmit integrations stay in place for now.
- Placeholder illustrations are acceptable until real photos or brand assets are available.
- Some public facts inherited from earlier materials still need confirmation before a wider launch.
