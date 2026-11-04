# Pasang Bhote - My Engineering Journal

Personal portfolio featuring hardware projects, learning experiments, club involvement, and photography.

## Preview locally

Run from this folder:

```powershell
python -m http.server 8000
```

Open http://127.0.0.1:8000/ in a browser. A web server is needed for interactive CAD model loading.

## GitHub Pages

Publish this repository as `pasangb.github.io`. In **Settings > Pages**, select **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.

The public address will be https://pasangb.github.io/ after deployment succeeds.

The site uses plain HTML, CSS, and JavaScript. No build step is required. The `.nojekyll` file keeps GitHub Pages from processing the site with Jekyll.

## Updating the site

Edit the page content in [index.html](index.html), styles in [css/styles.css](css/styles.css), and interactions in [js/](js/). Commit and push changes to `main` to update the live website.

Images, videos, and CAD models are stored in [assets/](assets/). Keep relative URLs so previews and GitHub Pages both work.

## Contact

The contact form opens a prefilled Gmail draft. Visitors review and send the message in Gmail; the site does not send email automatically.

## Credits

Typography: Cinzel and Plus Jakarta Sans via Google Fonts. Interactive CAD viewing uses Three.js; its license is included with the vendored library.

Portfolio content and personal photography belong to Pasang Bhote and their respective contributors. Team project credits appear on the website.
