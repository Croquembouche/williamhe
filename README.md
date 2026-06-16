# Yuankai (William) He Personal Website

Static professional website for Yuankai (William) He with tabbed sections for
profile, news, projects, publications, talks, teaching, service, and contact.

## Files

- `index.html` - content and page structure
- `styles.css` - responsive visual design
- `site.js` - progressive section navigation and hash handling
- `hero-three.js` - optional Three.js research-network canvas for the hero
- `assets/Yuankai-William-He-CV.pdf` - downloadable CV
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
