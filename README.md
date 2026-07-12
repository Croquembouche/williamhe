# Yuankai (William) He Personal Website

Static academic website for Yuankai (William) He with an editorial homepage and
tabbed sections for news, funding, projects, publications, talks, teaching,
service, and contact.

## Files

- `index.html` - content and page structure
- `styles.css` - responsive visual design
- `site.js` - progressive section navigation and hash handling
- `assets/Yuankai-William-He-CV-2026-06.pdf` - downloadable CV linked from the site
- `assets/Yuankai-William-He-CV.pdf` - stable CV copy kept for backwards compatibility
- `assets/` research visuals used by the site
- `assets/old-site/` - locally captured legacy Google Sites news photos

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Updating News or Visitor Photos

Place approved visitor or event photos in `assets/old-site/` or another
subfolder under `assets/`, then add a `figure` entry to the News tab in
`index.html`.
