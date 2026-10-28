# Certificate Guide India: build playbook

Written 24 October 2026 (IST). What we took from each skill repo, the checklist every nightly page must pass, and the site-level fixes ranked by impact. The site is static, text-first, a YMYL (consumer/legal money) guide for India, read mostly on phones, with no ads yet. Rules below are filtered for that. Anything that needs a paid API, an account, or a JS framework is skipped.

Checker: `python3 tools/check_pages.py` (stdlib only, read-only; `--live` checks the deployed site, `--external` also checks every outbound source link). It is not wired into build.py. Hook it in after the current build.py work lands.

---

## 1. Per-skill rules

### impeccable (pbakaus)
1. Guides are "Read" mode: one column, 65-75ch measure, body 16px+, line-height 1.5+, contrast 4.5:1 minimum for text. The calculator is "Operate" mode: labels above inputs, result in a fixed spot, no layout jump.
2. Craft floor: no eyebrow/kicker labels above headings, no emoji as icons, no coloured left-border callouts thicker than 1px, no decorative gradients. Themed `:focus-visible` ring and `::selection`.
3. One accent colour, used only for links and the primary action. Hierarchy comes from size and weight, not boxes.
4. Run the 5-dimension critique (out of 20) on DESIGN.md changes before shipping.
Skipped: the `impeccable` CLI/launcher (downloads a binary) and the live-browser "polish" loop. We used the reference docs only.

### web-quality-skills (addyosmani)
1. Budgets per page: total under 1.5 MB, JS under 300 KB, CSS under 100 KB. We are at 15-22 KiB, so the rule is "do not regress": no web fonts, no images over 100 KB, no new third-party script.
2. Core Web Vitals: LCP under 2.5 s, INP under 200 ms, CLS under 0.1, measured on Lighthouse mobile.
3. Accessibility: `lang`, skip link, one `<main>`, one H1, no skipped heading levels, touch targets 24px minimum (44px preferred), descriptive anchor text, visible focus.
4. Best practices: zero console errors (today the only one is the favicon 404), HTTPS-only links, valid HTML.
Skipped: analyze.sh (needs jq; check_pages.py covers the same checks). Header and caching advice (CSP, HSTS, long cache TTL) because GitHub Pages cannot set headers.

### claude-seo: seo-cluster, seo-google, seo-bing (AgriciDaniel)
1. Hub and spoke: every guide links up to its hub (maharashtra, income-certificate, domicile-certificate) and the hub links down to every guide. Each guide links to 2-3 sibling guides. Every page is 2 clicks or fewer from home and has 3+ inbound internal links.
2. Before writing a new page, check overlap with existing ones. If the top-10 Google results for the two target queries share 7-10 URLs, merge them. If they share 4-6, it is the same cluster (link them). If they share 2-3, link once.
3. Google: use the free Search Console UI (sitemap submit, URL Inspection "Request indexing" for each new page) and free PageSpeed Insights. Bing: Bing Webmaster Tools sitemap, plus IndexNow (key file at the site root, ping on every new or changed URL). Bing's index also feeds Copilot citations.
4. YMYL means the highest E-E-A-T bar: named responsibility, sources on every claim, visible dates.
Skipped: the seo-google API scripts (need a GCP project and service account) and DataForSEO features (paid).

### seo-audit-skill (SEOmator CLI)
1. Run `seomator audit` on the homepage monthly. Treat geo, social and eeat as the categories to watch (53, 20 and 74 today).
2. Fix what is real on a static host: favicon, og:image + twitter:card, a byline, contact and privacy pages. Ignore security-header findings (not settable on GitHub Pages).
3. Its crawler drops the `/certificate-guide-india/` base path and crawls the user-site root, so inner-page results are 404 noise. Only trust homepage findings, or audit inner pages one URL at a time.
Skipped: the cloud/report-upload features (account needed).

### geo-seo-claude (zubair-trabzada)
1. Each guide opens with a 40-60 word answer that stands alone if quoted: the certificate, the fee, the time limit and the officer. Then each question H2 starts with a 1-2 sentence direct answer that includes the officer and the number (days, rupees).
2. Use facts with units and named sources in the same sentence ("the Revenue Department's Right to Services list gives the Nayab Tahsildar 15 days"). Citable passages are 130-170 words, self-contained, with no "as mentioned above".
3. Keep AI crawlers allowed and llms.txt current, but treat llms.txt as low priority (Google says it does not use it).
4. Citability scores today (regex heuristic, directional only): home 30.8, guides 40-42, calculator 47.9. Nearly every block grades D or F. Target 55+ per guide.
Skipped: the paid brand-mention and Ahrefs/Semrush modules.

### kostja94 programmatic-seo (marketing-skills)
1. Every URL needs its own evidence block: the regulator's rule, the deadline, the official link and the date checked. No pages whose only difference is a swapped company name.
2. Keep facts in the data layer (page data files), not prose, so a rule change edits one value. Volatile facts (phone numbers, emails, limits) carry their own "checked on" date.
3. Conditional sections: if a company has no GRO email or no app path, the section is left out rather than rendered empty or with filler.
4. Prune plan: a page with no impressions after 90 days in GSC gets improved, merged, or set to noindex.
Skipped: template-at-scale generation (one checked page per night is the model, by design).

### humanizer (blader)
1. No em dashes or en dashes in copy (36 found today, mostly in the sources lists). Use commas, colons, or full stops.
2. Banned words: additionally, align with, crucial, delve, enhance, garner, intricate, key (as adjective), landscape, meticulous, pivotal, robust, seamless, showcase, tapestry, testament, underscore, valuable, vibrant.
3. No "not X but Y", no forced lists of three, no bold for decoration, no chatbot leftovers ("I hope this helps"), no heading repeated in the first sentence, straight quotes only.
4. Plain register for a stressed reader: short sentences, "you", concrete verbs. Reading level is "difficult" today (Flesch 49); aim for 60+.
Skipped: nothing material. "When not to act" applies: legal names and official titles stay as written even if they sound stiff.

### claude-blog (AgriciDaniel): blog-factcheck, blog-seo-check, blog-cannibalization, blog-decay
1. Factcheck: list every load-bearing claim (deadline, amount, contact, rule number) and check it against the cited page. Score 1.0 only when the exact figure is on the cited page in context. Sources must be tier 1 (regulator, gazette, official portal). Reject tier 4-5 (blogs, aggregators). Echoed reports count as one source.
2. A claim citing a homepage when the figure is on a subpage scores 0.3, so link the exact document, not the portal root.
3. Cannibalisation: before a new page, compare its primary query against existing titles and H1s (exact, stem, subset match). Merge or retarget on overlap.
4. Decay: once GSC has 2 periods, compare clicks. 20-39% drop is a warning, 40-59% high, 60%+ critical; refresh the facts and the "Last checked" date first.
Skipped: blog-image, audio, notebooklm and translate (not text-first, or need paid APIs). The DataForSEO mode (paid).

### affiliate-skills: github-pages-deployer (Affitor)
1. Keep `.nojekyll` and a custom `404.html` in docs/ (both already there). Repo must stay public (free Pages).
2. If we add a custom domain later: a CNAME file with the bare domain, DNS pointed at `rudracodeshere.github.io`, Cloudflare proxy off, then "Enforce HTTPS".
3. Check each deploy: the new URL returns 200 within about 10 minutes, and sitemap.xml shows the new URL.
Skipped: the Actions workflow generator (we deploy from docs/ on main, which works) and the affiliate/landing-page parts (no ads or affiliates yet).

### seo-data (anthonylee991)
1. GSC is "what people searched", GA4 is "what they did". We have GoatCounter (shared with site #1, filter on `/certificate-guide-india/`), not GA4. Do not mix the two numbers in reports.
2. Weekly once data exists: top queries and pages from GSC, the same for Bing, and pages with impressions but CTR under 1% get a title/description rewrite.
Skipped: running it. It needs a Google Cloud OAuth client, which means a sign-up. Bing is done through the Bing Webmaster API key in the environment (AddSite, SubmitFeed, SubmitUrlBatch).

---

## 2. Nightly page checklist (one new page)

**A. Research and verification**
- [ ] Pick a query from the backlog. Check cannibalisation against existing titles/H1s. If the SERP overlap with an existing page is 7+ URLs, update that page instead.
- [ ] Every load-bearing fact (deadline, amount, phone, email, address, rule) comes from a tier-1 source: regulator site, gazette, official portal, the company's own GRO page.
- [ ] Link the exact document or subpage, not the portal home. Record the date checked next to each source.
- [ ] Open each source today and confirm the exact figure is on it. Anything unconfirmed is cut, not hedged.
- [ ] Data goes in the page data file; no fact appears only in prose.
- [ ] Hindi state PDFs in legacy fonts: render them with `pdftoppm` and read the images, because pdftotext output is garbage. Portal document links are relative, so resolve them against the page that links them (Bihar: `/resources/homePage/10/Document/`).
- [ ] If a ministry's own PDF is gone (404) or its host fails TLS, look for the same circular forwarded in full by another government office (other ministries, CSIR, PSUs on .gov.in or .res.in). Cite that copy and say on the page why. Check later memoranda that modify it (DoPT EWS: the 2024 OM moved the issuing authority choice to States).
- [ ] A consolidated web list can have copying errors. When it links the gazette notification, read the gazette row and follow the gazette (UP Janhit list: domicile first appeal officer differs). News figures that differ from the gazette usually mix up two services; explain the difference on the page.
- [ ] Some state hosts work only with `curl -k` (incomplete certificate chain, e.g. upcmo.up.nic.in, dcmsme.gov.in). That is still the official source; fetch with -k and cite the https URL.
- [ ] If every official source for a state fails from the box and from the web fetcher, skip the page and record why in QUEUE.md. Never use a third-party or ambiguous listing instead.

**B. Writing**
- [ ] First paragraph: 40-60 word answer (who, by when, cost). Plain English, "you", short sentences.
- [ ] No em/en dashes, no banned words, no "not X but Y", no forced triads, no decorative bold, straight quotes.
- [ ] Every section has content specific to this page. Drop empty sections; no filler.
- [ ] Not-legal-advice disclaimer present. The wording matches where the sources sit on the page.
- [ ] 600+ words for a guide, unless the topic is genuinely narrower.

**C. On-page SEO**
- [ ] Title is unique and 50-60 characters (65 max), with the query near the front.
- [ ] Meta description is unique and 120-160 characters, saying what the reader gets.
- [ ] One H1. H2s phrased as the questions people ask. No skipped levels.
- [ ] Canonical = the final trailing-slash URL. og:title, og:description, og:url, og:image.
- [ ] JSON-LD parses: Article (headline up to 110 characters, datePublished, dateModified, author, publisher) + BreadcrumbList; FAQPage only if the Q&A is visible on the page. No HowTo.

**D. Clusters and internal links**
- [ ] Link up to the hub, and add the page to the hub's list.
- [ ] New state sector: add its line to `HUB_DESC` in build.py and its h1/title/blurb in site.json first, or the build fails with a KeyError. Keep site.json at indent=2 when editing it with a script. tools/check_pages.py reads hub slugs from site.json, so no edit is needed there.
- [ ] Link to 2-3 sibling guides, and add a link back from at least 2 of them, so the page has 3+ inbound links.
- [ ] Descriptive anchors (never "click here"). Within 2 clicks of home.

**E. GEO / AI citation**
- [ ] Each question H2 opens with a direct answer sentence that names the regulator and the number.
- [ ] At least one self-contained 130-170 word passage with a fact, a unit and a named source.
- [ ] Visible "Last checked" date. The page is listed in llms.txt and sitemap.xml with a real lastmod.

**F. Web quality, performance, accessibility**
- [ ] No new JS or third-party requests. Page under 50 KB. No images without width, height and alt.
- [ ] Lighthouse mobile: Performance 95+, Accessibility 100, Best Practices 100 (after the favicon fix), SEO 100.
- [ ] `python3 tools/check_pages.py` shows 0 FAIL. `CHROME=/usr/bin/google-chrome python3 tools/test_site.py` passes (Playwright browser is not installed; use system Chrome).

**G. Deploy and submit**
- [ ] Commit and push. Confirm the live URL returns 200 and appears in the live sitemap.xml.
- [ ] `python3 tools/check_pages.py --live` shows 0 FAIL. Run `--external` weekly. Indian gov sites often answer 5xx to foreign IPs, so recheck those in a browser before treating them as dead.
- [ ] Google Search Console: URL Inspection, then Request indexing (new URL plus the hub that now links to it).
- [ ] Bing: IndexNow ping (once the key file exists), or Bing Webmaster Tools URL submission.

---

## 3. Site-level history

Sections 3 and 4 of site #1's playbook (its audit and fix list) stay in `../where-to-complain/BUILD-PLAYBOOK.md`. This site started on 26 October 2026 with those fixes already applied: no analytics script at launch (GoatCounter added 27 October 2026, with the privacy page updated first), `@graph` JSON-LD, a local favicon, and no Google verification file.

