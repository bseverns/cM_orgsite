# Site Architecture

## Core Intent

The site should feel credible, local, and direct. It is not a generic nonprofit brochure. It should make it easy for schools and community organizations to understand what createMPLS does, who it serves, and how to start a partnership.

Primary audience:

- schools
- community organizations

Secondary audience:

- volunteers
- donors and sponsors

## Page Roles

### Home

- Lead with mission clarity and the local STEM access problem.
- Establish schools and community partners as the first CTA path.
- Introduce the two program tracks.
- Provide light proof and clear next actions for partner, volunteer, and donor audiences.

### About

- Explain why createMPLS exists.
- Frame the problem as structural, not individual.
- Show the operating model, values, and Minneapolis roots.
- Keep trust markers visible without turning the page into an annual report.

### Programs

- Clarify the two core offerings.
- Show what students actually experience.
- Explain what a partner school or community site can expect.
- Reiterate the no-cost model and access design.

### Get Involved

- Separate the pathways for partners, volunteers, and donors.
- Reduce ambiguity about time, fit, and next steps.
- Keep friction low by routing every path to the contact page or Givebutter.

### Contact

- Route inquiries by role.
- Preserve direct email and social links.
- Keep the existing FormSubmit flow, with client-side guidance only.

## Shared Layout Rules

- Every page uses the same external stylesheet and script.
- Navigation and footer stay structurally consistent across all pages.
- Major sections use `data-content-block` attributes so content owners can find blocks quickly.
- Reusable elements should be styled by shared classes instead of inline styles.

## Content Conventions In Markup

Each major section includes a `data-content-block` attribute. Use these names when discussing edits or leaving notes, for example:

- `home-hero`
- `about-model`
- `programs-overview`
- `contact-form`

This is the lightweight equivalent of structured content regions in a CMS.

## CTA Priority

Default CTA order across the site:

1. school or community partnership
2. program exploration
3. volunteer pathway
4. donation

Exceptions:

- `Get Involved` can surface all three support paths evenly.
- `Contact` should optimize for inquiry completion.

## Shared Interaction Rules

- Mobile nav is toggled by `data-nav-toggle` and `data-nav-menu`.
- Reveal animations use the `.reveal` class.
- Animated figures use `data-count`.
- Contact-form behavior is centralized in `assets/js/site.js`.
