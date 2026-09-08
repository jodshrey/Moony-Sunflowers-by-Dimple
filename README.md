# Moony Sunflowers — Static Website

A responsive vanilla HTML/CSS/JS author website for Dimple / Moony Sunflowers.

## Files
- `index.html` — semantic page structure + SEO metadata/schema
- `styles.css` — responsive visual system
- `script.js` — navigation, filtering, reader modal, tilt cards, UPI copy, quote generator
- `assets/` — add the provided logo and QR assets here

## Replace before launch
1. `https://YOUR-DOMAIN.example/` in `index.html`
2. `assets/moony_sunflowers_logo.png`
3. `assets/upi_scanner_qr.png`
4. `YOUR_SNAIL_MAIL_GOOGLE_FORM_URL`
5. `YOUR_COMMUNITY_GOOGLE_FORM_URL`
6. `YOUR_HEYZINE_OR_PDF_URL`
7. `YOUR_GOODREADS_URL`
8. `YOUR_AMAZON_AUTHOR_URL`
9. `your-upi-id@okbank` (also update the UPI deep link)
10. Replace the sample book titles/descriptions/covers with real content.

## Google Forms
For the actual form embeds, replace each `.iframe-placeholder` with:
`<iframe src="YOUR_FORM_URL" title="..." loading="lazy"></iframe>`

## SEO launch checklist
- Set the real canonical URL.
- Create `sitemap.xml` and `robots.txt` using your real domain.
- Use unique, descriptive alt text for real images.
- Keep one clear H1 per page/route.
- Add real Book/Article structured data where appropriate.
- Compress images to WebP/AVIF while retaining the requested PNG paths if needed.
- Verify Open Graph/Twitter previews.
- Submit sitemap to Google Search Console and Bing Webmaster Tools.
- Add privacy/terms/contact pages if collecting personal data through forms.
- Do not publish a payment QR/UPI ID until it has been verified.

## Hosting
Works as a static site on GitHub Pages, Netlify, Cloudflare Pages, or any ordinary static host.


## Integrated real details
- Snail Mail Club form: connected to the supplied Google Form.
- UPI: `lokhandedimpal4@oksbi`; supplied QR installed.
- Author portrait and Moony Sunflowers logo installed in `assets/`.
- Amazon, Goodreads, Instagram, LinkedIn, Chill Subs, Medium, YouTube, Substack and Chai Magazine links connected.
- Community submission Google Form is the only major link still awaiting its URL.
