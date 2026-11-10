# Planetarium photographs

Only these three existing files are displayed in the clickable gallery:

- `planetarium-01.jpg`
- `planetarium-02.jpg`
- `planetarium-03.jpg`

The detail-page banner uses `hero.jpg` in this folder. It is excluded from the gallery. Other files are preserved but are not shown. Missing photographs are never replaced with sample images.

The homepage overview continues to use `public/images/planetarium-current.jpg`.

After adding images, reload the page; restart an already running production server so Next.js can index the new public files. Hosted deployments require a new deployment containing the assets.
