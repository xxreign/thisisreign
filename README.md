# thisisreign

The personal site of **REIGN — artist / designer**.
Black-and-white, editorial, and built as a plain static site: no framework, no
build step, no dependencies. Push it and it runs.

---

## Pages

| Page | File | What is on it |
| --- | --- | --- |
| Home | `index.html` | The "THIS IS REIGN" statement and the brush |
| About | `about/index.html` | Bio, portrait, profile details |
| Works | `works/index.html` | Filterable project grid — All / 3D / 2D / Branding / Animation / Film-Video |
| Experience | `experience/index.html` | Chronological role / client / years list |
| Contact | `contact/index.html` | Email, social links, contact form |

Every page carries the same **+ button, top right**, which opens the full-screen
navigation overlay (Home, About, Works, Experience, Contact — with the Works
sections listed beside them).

---

## The home page in detail

**THIS IS REIGN** sits on a solid black surface, set in `Impact` (declared once,
as `--font-display` in `assets/styles.css`).

Underneath that black surface is a photograph. It is invisible until you
**click and hold, then drag** — the pointer becomes a brush, and the drag erases
the black to uncover the image. Let go and the painting stops.

- To swap the hidden image, change the `src` of the
  `<img class="hero-reveal-image">` near the top of `index.html` (it is marked
  with a comment).
- To change how the brush feels, edit `BRUSH_DIAMETER` and `EDGE_SOFTNESS` at
  the top of section 2 in `assets/main.js`.
- Works with a mouse and with a finger. With JavaScript switched off the
  visitor simply sees the black surface — nothing breaks.

---

## Files

```
index.html                 home
about/index.html
works/index.html
experience/index.html
contact/index.html
assets/styles.css          the whole design system: variables, type, layout,
                           the navigation overlay, the brush, responsive rules
assets/main.js             the + menu, the brush, the Works filters, scroll reveal
reign-city.jpg             the hidden image on the home page
reign-portrait.webp        the portrait on About
work-3d.webp  work-2d.webp  work-branding.webp  work-animation.webp  work-film.webp
vercel.json                caching + security headers
```

`assets/styles.css` is split into two marked parts: **Part 1** holds the small
handwritten additions at the top (safe to edit), and **Part 2** is the compiled
design system. Change values in Part 2 with care — the layout depends on them.

---

## Images

The seven image files need to sit at the repository root, alongside
`index.html`, exactly as they are named above. The pages request them as
`/reign-city.jpg`, `/work-3d.webp` and so on.

---

## Placeholder content — replace before publishing

Everything marked as a placeholder is marked in the page itself, so you can find
it by looking, or by searching the files for `PLACEHOLDER` and `20XX`:

- project names, dates and images on **Works**
- the bio, city and availability on **About**
- every role, client and date on **Experience** (add only real experience)
- **`hello@yourdomain.com`** on Contact, and in the footer links
- the Instagram and Vimeo URLs (currently pointing at the bare domains)
- the portrait and the five work images

---

## The contact form

The form in `contact/index.html` is front-end only — it does not send anything
yet. Look for the `FORM ENDPOINT` comment inside the form; that is where the
endpoint goes. Two easy routes:

- **Formspree / Basin / Getform** — sign up, then set
  `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` on the form.
- **A Vercel function** — add `api/contact.js` and `fetch()` it on submit.

---

## Run it locally

Any static server works. From this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** this repository.
3. Framework preset: **Other**. Build command: leave empty. Output directory:
   leave empty (the repository root *is* the site).
4. Deploy. Every later push to the main branch redeploys automatically.

`vercel.json` is already set up for long-lived caching of `/assets/*` plus
`nosniff` and a referrer policy.
